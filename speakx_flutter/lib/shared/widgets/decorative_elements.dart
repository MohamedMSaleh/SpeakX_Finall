import 'package:flutter/material.dart';
import 'dart:math' as math;
import '../../core/theme/app_colors.dart';

/// Floating Shapes - Decorative background elements
class FloatingShapes extends StatefulWidget {
  final int count;
  final List<Color> colors;

  const FloatingShapes({
    super.key,
    this.count = 8,
    this.colors = const [
      AppColors.primaryBlueLight,
      AppColors.secondarySuccessLight,
      AppColors.secondaryWarningLight,
      AppColors.secondaryEnergyLight,
      AppColors.secondaryPinkLight,
    ],
  });

  @override
  State<FloatingShapes> createState() => _FloatingShapesState();
}

class _FloatingShapesState extends State<FloatingShapes>
    with TickerProviderStateMixin {
  late List<FloatingShape> shapes;
  late List<AnimationController> controllers;

  @override
  void initState() {
    super.initState();
    _initializeShapes();
  }

  void _initializeShapes() {
    final random = math.Random();
    shapes = List.generate(widget.count, (index) {
      return FloatingShape(
        left: random.nextDouble(),
        top: random.nextDouble(),
        size: 40 + random.nextDouble() * 80,
        color: widget.colors[random.nextInt(widget.colors.length)],
        opacity: 0.05 + random.nextDouble() * 0.1,
        duration: Duration(seconds: 15 + random.nextInt(10)),
      );
    });

    controllers = List.generate(widget.count, (index) {
      final controller = AnimationController(
        vsync: this,
        duration: shapes[index].duration,
      )..repeat(reverse: true);
      return controller;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: IgnorePointer(
        child: Stack(
          children: List.generate(widget.count, (index) {
            return AnimatedBuilder(
              animation: controllers[index],
              builder: (context, child) {
                final shape = shapes[index];
                final offset = math.sin(controllers[index].value * math.pi * 2) * 20;
                
                return Positioned(
                  left: MediaQuery.of(context).size.width * shape.left + offset,
                  top: MediaQuery.of(context).size.height * shape.top + offset,
                  child: Container(
                    width: shape.size,
                    height: shape.size,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: shape.color.withOpacity(shape.opacity),
                    ),
                  ),
                );
              },
            );
          }),
        ),
      ),
    );
  }

  @override
  void dispose() {
    for (var controller in controllers) {
      controller.dispose();
    }
    super.dispose();
  }
}

class FloatingShape {
  final double left;
  final double top;
  final double size;
  final Color color;
  final double opacity;
  final Duration duration;

  FloatingShape({
    required this.left,
    required this.top,
    required this.size,
    required this.color,
    required this.opacity,
    required this.duration,
  });
}

/// Gradient Background with floating shapes
class GradientBackground extends StatelessWidget {
  final Widget child;
  final List<Color> gradientColors;
  final AlignmentGeometry begin;
  final AlignmentGeometry end;
  final bool showFloatingShapes;

  const GradientBackground({
    super.key,
    required this.child,
    this.gradientColors = const [
      Color(0xFFEEF2FF),
      Color(0xFFE0E7FF),
      Color(0xFFDBEAFE),
    ],
    this.begin = Alignment.topLeft,
    this.end = Alignment.bottomRight,
    this.showFloatingShapes = true,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: gradientColors,
          begin: begin,
          end: end,
        ),
      ),
      child: Stack(
        children: [
          if (showFloatingShapes) const FloatingShapes(),
          child,
        ],
      ),
    );
  }
}

/// Blob Shape - Organic shapes for visual interest
class BlobShape extends StatelessWidget {
  final Color color;
  final double size;
  final double opacity;

  const BlobShape({
    super.key,
    this.color = AppColors.primaryBlueLight,
    this.size = 200,
    this.opacity = 0.1,
  });

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size(size, size),
      painter: BlobPainter(
        color: color.withOpacity(opacity),
      ),
    );
  }
}

class BlobPainter extends CustomPainter {
  final Color color;

  BlobPainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    final path = Path();
    
    // Organic blob path (simplified)
    path.moveTo(size.width * 0.5, 0);
    path.cubicTo(
      size.width * 0.8, size.height * 0.2,
      size.width, size.height * 0.5,
      size.width * 0.8, size.height * 0.8,
    );
    path.cubicTo(
      size.width * 0.6, size.height,
      size.width * 0.4, size.height,
      size.width * 0.2, size.height * 0.8,
    );
    path.cubicTo(
      0, size.height * 0.5,
      size.width * 0.2, size.height * 0.2,
      size.width * 0.5, 0,
    );

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(BlobPainter oldDelegate) => false;
}

/// Glowing Orb decoration
class GlowingOrb extends StatefulWidget {
  final double size;
  final Color color;
  final Duration duration;

  const GlowingOrb({
    super.key,
    this.size = 100,
    this.color = AppColors.primaryBlueLight,
    this.duration = const Duration(seconds: 2),
  });

  @override
  State<GlowingOrb> createState() => _GlowingOrbState();
}

class _GlowingOrbState extends State<GlowingOrb>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    )..repeat(reverse: true);

    _animation = Tween<double>(begin: 0.4, end: 0.8).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          width: widget.size,
          height: widget.size,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: RadialGradient(
              colors: [
                widget.color.withOpacity(_animation.value),
                widget.color.withOpacity(_animation.value * 0.5),
                widget.color.withOpacity(0),
              ],
              stops: const [0.0, 0.5, 1.0],
            ),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

/// Wave Decoration for section dividers
class WaveDecoration extends StatelessWidget {
  final Color color;
  final double height;
  final bool flip;

  const WaveDecoration({
    super.key,
    this.color = Colors.white,
    this.height = 100,
    this.flip = false,
  });

  @override
  Widget build(BuildContext context) {
    return Transform(
      alignment: Alignment.center,
      transform: Matrix4.identity()..rotateX(flip ? math.pi : 0),
      child: CustomPaint(
        size: Size(MediaQuery.of(context).size.width, height),
        painter: WavePainter(color: color),
      ),
    );
  }
}

class WavePainter extends CustomPainter {
  final Color color;

  WavePainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    final path = Path();
    path.lineTo(0, size.height * 0.5);
    
    // Create wave pattern
    path.quadraticBezierTo(
      size.width * 0.25, size.height * 0.3,
      size.width * 0.5, size.height * 0.5,
    );
    path.quadraticBezierTo(
      size.width * 0.75, size.height * 0.7,
      size.width, size.height * 0.5,
    );
    
    path.lineTo(size.width, 0);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(WavePainter oldDelegate) => false;
}
