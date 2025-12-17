import 'package:flutter/material.dart';
import 'dart:math' as math;
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_animations.dart';

/// Confetti celebration animation - matches React MicroInteractions
class ConfettiAnimation extends StatefulWidget {
  final bool active;
  final Duration duration;
  final VoidCallback? onComplete;
  final int particleCount;

  const ConfettiAnimation({
    super.key,
    required this.active,
    this.duration = const Duration(seconds: 3),
    this.onComplete,
    this.particleCount = 50,
  });

  @override
  State<ConfettiAnimation> createState() => _ConfettiAnimationState();
}

class _ConfettiAnimationState extends State<ConfettiAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final List<ConfettiParticle> _particles = [];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    );

    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        widget.onComplete?.call();
        setState(() => _particles.clear());
      }
    });

    if (widget.active) {
      _generateParticles();
      _controller.forward();
    }
  }

  @override
  void didUpdateWidget(ConfettiAnimation oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.active && !oldWidget.active) {
      _generateParticles();
      _controller.forward(from: 0);
    }
  }

  void _generateParticles() {
    final random = math.Random();
    final colors = [
      AppColors.primaryBlue,
      AppColors.secondarySuccess,
      AppColors.secondaryWarning,
      AppColors.secondaryEnergy,
      AppColors.secondaryPink,
    ];

    _particles.clear();
    for (int i = 0; i < widget.particleCount; i++) {
      _particles.add(ConfettiParticle(
        left: random.nextDouble(),
        color: colors[random.nextInt(colors.length)],
        delay: random.nextDouble() * 0.5,
        size: random.nextDouble() * 8 + 4,
        rotation: random.nextDouble() * 2 * math.pi,
        isCircle: random.nextBool(),
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.active || _particles.isEmpty) {
      return const SizedBox.shrink();
    }

    return Positioned.fill(
      child: IgnorePointer(
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            return CustomPaint(
              painter: ConfettiPainter(
                particles: _particles,
                animation: _controller,
              ),
            );
          },
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

class ConfettiParticle {
  final double left;
  final Color color;
  final double delay;
  final double size;
  final double rotation;
  final bool isCircle;

  ConfettiParticle({
    required this.left,
    required this.color,
    required this.delay,
    required this.size,
    required this.rotation,
    required this.isCircle,
  });
}

class ConfettiPainter extends CustomPainter {
  final List<ConfettiParticle> particles;
  final Animation<double> animation;

  ConfettiPainter({
    required this.particles,
    required this.animation,
  });

  @override
  void paint(Canvas canvas, Size size) {
    for (final particle in particles) {
      final progress = math.max(0.0, animation.value - particle.delay);
      if (progress <= 0) continue;

      final x = size.width * particle.left;
      final y = size.height * progress * 2 - 100; // Start from top
      
      final paint = Paint()
        ..color = particle.color.withOpacity(1 - progress)
        ..style = PaintingStyle.fill;

      canvas.save();
      canvas.translate(x, y);
      canvas.rotate(particle.rotation + progress * math.pi * 4);

      if (particle.isCircle) {
        canvas.drawCircle(Offset.zero, particle.size / 2, paint);
      } else {
        canvas.drawRect(
          Rect.fromCenter(
            center: Offset.zero,
            width: particle.size,
            height: particle.size,
          ),
          paint,
        );
      }

      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(ConfettiPainter oldDelegate) => true;
}

/// Sparkles magical effect - matches React MicroInteractions
class SparklesAnimation extends StatefulWidget {
  final bool active;
  final int count;
  final Color color;

  const SparklesAnimation({
    super.key,
    required this.active,
    this.count = 12,
    this.color = AppColors.secondaryWarningLight,
  });

  @override
  State<SparklesAnimation> createState() => _SparklesAnimationState();
}

class _SparklesAnimationState extends State<SparklesAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final List<SparkleParticle> _sparkles = [];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    );

    if (widget.active) {
      _generateSparkles();
      _controller.forward();
    }
  }

  @override
  void didUpdateWidget(SparklesAnimation oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.active && !oldWidget.active) {
      _generateSparkles();
      _controller.forward(from: 0);
    }
  }

  void _generateSparkles() {
    final random = math.Random();
    _sparkles.clear();
    
    for (int i = 0; i < widget.count; i++) {
      _sparkles.add(SparkleParticle(
        x: random.nextDouble(),
        y: random.nextDouble(),
        delay: random.nextDouble(),
        size: random.nextDouble() * 12 + 8,
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.active || _sparkles.isEmpty) {
      return const SizedBox.shrink();
    }

    return Positioned.fill(
      child: IgnorePointer(
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            return CustomPaint(
              painter: SparklePainter(
                sparkles: _sparkles,
                animation: _controller,
                color: widget.color,
              ),
            );
          },
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

class SparkleParticle {
  final double x;
  final double y;
  final double delay;
  final double size;

  SparkleParticle({
    required this.x,
    required this.y,
    required this.delay,
    required this.size,
  });
}

class SparklePainter extends CustomPainter {
  final List<SparkleParticle> sparkles;
  final Animation<double> animation;
  final Color color;

  SparklePainter({
    required this.sparkles,
    required this.animation,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    for (final sparkle in sparkles) {
      final adjustedProgress = (animation.value - sparkle.delay).clamp(0.0, 1.0);
      
      // Sparkle appears, grows, then disappears
      final opacity = adjustedProgress < 0.5
          ? adjustedProgress * 2
          : (1 - adjustedProgress) * 2;
      
      final scale = adjustedProgress < 0.5
          ? adjustedProgress * 2
          : (1 - adjustedProgress) * 2;

      if (opacity <= 0) continue;

      final x = size.width * sparkle.x;
      final y = size.height * sparkle.y;

      final paint = Paint()
        ..color = color.withOpacity(opacity)
        ..style = PaintingStyle.fill;

      canvas.save();
      canvas.translate(x, y);
      canvas.rotate(adjustedProgress * math.pi);
      canvas.scale(scale);

      // Draw sparkle star shape
      final path = Path();
      for (int i = 0; i < 8; i++) {
        final angle = (i * math.pi / 4);
        final length = i.isEven ? sparkle.size / 2 : sparkle.size / 6;
        final px = length * math.cos(angle);
        final py = length * math.sin(angle);
        
        if (i == 0) {
          path.moveTo(px, py);
        } else {
          path.lineTo(px, py);
        }
      }
      path.close();

      canvas.drawPath(path, paint);
      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(SparklePainter oldDelegate) => true;
}
