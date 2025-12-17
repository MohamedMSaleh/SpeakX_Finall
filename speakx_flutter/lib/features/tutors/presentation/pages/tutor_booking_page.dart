import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class TutorBookingPage extends StatefulWidget {
  final String tutorName;
  final String tutorAvatar;
  final double tutorRating;

  const TutorBookingPage({
    super.key,
    required this.tutorName,
    required this.tutorAvatar,
    required this.tutorRating,
  });

  @override
  State<TutorBookingPage> createState() => _TutorBookingPageState();
}

class _TutorBookingPageState extends State<TutorBookingPage> {
  DateTime? selectedDate;
  String? selectedTime;
  String selectedDuration = '30 min';
  String selectedTopic = 'General Conversation';

  final List<String> durations = ['30 min', '45 min', '60 min'];
  final List<String> topics = [
    'General Conversation',
    'Business English',
    'IELTS Preparation',
    'Pronunciation',
    'Grammar',
  ];

  final List<String> availableTimes = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Book a Session',
              showBackButton: true,
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Tutor Info Card
                      _buildTutorCard(),
                      SizedBox(height: 24.h),
                      
                      // Select Topic
                      _buildSectionTitle('Select Topic'),
                      SizedBox(height: 12.h),
                      _buildTopicSelector(),
                      SizedBox(height: 24.h),
                      
                      // Select Duration
                      _buildSectionTitle('Session Duration'),
                      SizedBox(height: 12.h),
                      _buildDurationSelector(),
                      SizedBox(height: 24.h),
                      
                      // Select Date
                      _buildSectionTitle('Select Date'),
                      SizedBox(height: 12.h),
                      _buildDateSelector(),
                      SizedBox(height: 24.h),
                      
                      // Select Time
                      if (selectedDate != null) ...[
                        _buildSectionTitle('Available Times'),
                        SizedBox(height: 12.h),
                        _buildTimeSelector(),
                        SizedBox(height: 24.h),
                      ],
                      
                      // Booking Summary
                      if (selectedDate != null && selectedTime != null) ...[
                        _buildBookingSummary(),
                        SizedBox(height: 24.h),
                      ],
                      
                      // Confirm Button
                      AnimatedButton(
                        onPressed: _canBook ? _confirmBooking : null,
                        child: Container(
                          width: double.infinity,
                          padding: EdgeInsets.symmetric(vertical: 18.h),
                          decoration: BoxDecoration(
                            gradient: _canBook
                                ? LinearGradient(colors: AppColors.cardBlueGradient)
                                : null,
                            color: _canBook ? null : AppColors.neutralGray300,
                            borderRadius: BorderRadius.circular(20.r),
                            boxShadow: _canBook
                                ? [
                                    BoxShadow(
                                      color: AppColors.primaryBlue.withOpacity(0.3),
                                      blurRadius: 20.r,
                                      offset: Offset(0, 10.h),
                                    ),
                                  ]
                                : null,
                          ),
                          child: Text(
                            'Confirm Booking',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w900,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      SizedBox(height: 40.h),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  bool get _canBook => selectedDate != null && selectedTime != null;

  Widget _buildTutorCard() {
    return PopInAnimation(
      child: Container(
        padding: EdgeInsets.all(20.w),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: AppColors.cardBlueGradient,
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(24.r),
          boxShadow: [
            BoxShadow(
              color: AppColors.primaryBlue.withOpacity(0.3),
              blurRadius: 20.r,
              offset: Offset(0, 10.h),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 64.w,
              height: 64.w,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white, width: 3.w),
                image: DecorationImage(
                  image: NetworkImage(widget.tutorAvatar),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            SizedBox(width: 16.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.tutorName,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18.sp,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  SizedBox(height: 4.h),
                  Row(
                    children: [
                      Icon(LucideIcons.star, color: AppColors.secondaryWarning, size: 16.sp),
                      SizedBox(width: 4.w),
                      Text(
                        widget.tutorRating.toString(),
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.9),
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 16.sp,
        fontWeight: FontWeight.w900,
        color: AppColors.neutralGray900,
      ),
    );
  }

  Widget _buildTopicSelector() {
    return Wrap(
      spacing: 8.w,
      runSpacing: 8.h,
      children: topics.map((topic) {
        final isSelected = selectedTopic == topic;
        return AnimatedButton(
          onPressed: () => setState(() => selectedTopic = topic),
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 10.h),
            decoration: BoxDecoration(
              gradient: isSelected ? LinearGradient(colors: AppColors.cardBlueGradient) : null,
              color: isSelected ? null : Colors.white,
              borderRadius: BorderRadius.circular(16.r),
              border: Border.all(
                color: isSelected ? Colors.transparent : AppColors.neutralGray200,
                width: 2.w,
              ),
            ),
            child: Text(
              topic,
              style: TextStyle(
                color: isSelected ? Colors.white : AppColors.neutralGray700,
                fontSize: 13.sp,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildDurationSelector() {
    return Row(
      children: durations.map((duration) {
        final isSelected = selectedDuration == duration;
        return Expanded(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: AnimatedButton(
              onPressed: () => setState(() => selectedDuration = duration),
              child: Container(
                padding: EdgeInsets.symmetric(vertical: 14.h),
                decoration: BoxDecoration(
                  gradient: isSelected ? LinearGradient(colors: AppColors.cardBlueGradient) : null,
                  color: isSelected ? null : Colors.white,
                  borderRadius: BorderRadius.circular(16.r),
                  border: Border.all(
                    color: isSelected ? Colors.transparent : AppColors.neutralGray200,
                    width: 2.w,
                  ),
                ),
                child: Text(
                  duration,
                  style: TextStyle(
                    color: isSelected ? Colors.white : AppColors.neutralGray700,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w700,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildDateSelector() {
    return Container(
      height: 90.h,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: 14,
        itemBuilder: (context, index) {
          final date = DateTime.now().add(Duration(days: index));
          final isSelected = selectedDate?.day == date.day &&
              selectedDate?.month == date.month &&
              selectedDate?.year == date.year;

          return Padding(
            padding: EdgeInsets.only(right: 12.w),
            child: AnimatedButton(
              onPressed: () => setState(() {
                selectedDate = date;
                selectedTime = null; // Reset time selection
              }),
              child: Container(
                width: 70.w,
                padding: EdgeInsets.all(12.w),
                decoration: BoxDecoration(
                  gradient: isSelected ? LinearGradient(colors: AppColors.cardBlueGradient) : null,
                  color: isSelected ? null : Colors.white,
                  borderRadius: BorderRadius.circular(16.r),
                  border: Border.all(
                    color: isSelected ? Colors.transparent : AppColors.neutralGray200,
                    width: 2.w,
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      _getDayName(date.weekday),
                      style: TextStyle(
                        color: isSelected ? Colors.white.withOpacity(0.8) : AppColors.neutralGray600,
                        fontSize: 11.sp,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      date.day.toString(),
                      style: TextStyle(
                        color: isSelected ? Colors.white : AppColors.neutralGray900,
                        fontSize: 20.sp,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      _getMonthName(date.month),
                      style: TextStyle(
                        color: isSelected ? Colors.white.withOpacity(0.8) : AppColors.neutralGray600,
                        fontSize: 11.sp,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildTimeSelector() {
    return Wrap(
      spacing: 8.w,
      runSpacing: 8.h,
      children: availableTimes.map((time) {
        final isSelected = selectedTime == time;
        return AnimatedButton(
          onPressed: () => setState(() => selectedTime = time),
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 12.h),
            decoration: BoxDecoration(
              gradient: isSelected ? LinearGradient(colors: AppColors.cardBlueGradient) : null,
              color: isSelected ? null : Colors.white,
              borderRadius: BorderRadius.circular(16.r),
              border: Border.all(
                color: isSelected ? Colors.transparent : AppColors.neutralGray200,
                width: 2.w,
              ),
            ),
            child: Text(
              time,
              style: TextStyle(
                color: isSelected ? Colors.white : AppColors.neutralGray700,
                fontSize: 13.sp,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildBookingSummary() {
    return Container(
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.neutralGray50, AppColors.neutralGray100],
        ),
        borderRadius: BorderRadius.circular(24.r),
        border: Border.all(color: AppColors.neutralGray200, width: 2.w),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(LucideIcons.calendar, color: AppColors.primaryBlue, size: 20.sp),
              SizedBox(width: 8.w),
              Text(
                'Booking Summary',
                style: TextStyle(
                  fontSize: 16.sp,
                  fontWeight: FontWeight.w900,
                  color: AppColors.neutralGray900,
                ),
              ),
            ],
          ),
          SizedBox(height: 16.h),
          _buildSummaryRow('Tutor', widget.tutorName),
          _buildSummaryRow('Topic', selectedTopic),
          _buildSummaryRow('Duration', selectedDuration),
          _buildSummaryRow('Date', '${selectedDate!.day} ${_getMonthName(selectedDate!.month)} ${selectedDate!.year}'),
          _buildSummaryRow('Time', selectedTime!),
        ],
      ),
    );
  }

  Widget _buildSummaryRow(String label, String value) {
    return Padding(
      padding: EdgeInsets.only(bottom: 8.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 13.sp,
              color: AppColors.neutralGray600,
              fontWeight: FontWeight.w600,
            ),
          ),
          Text(
            value,
            style: TextStyle(
              fontSize: 13.sp,
              color: AppColors.neutralGray900,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }

  void _confirmBooking() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24.r)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 80.w,
              height: 80.w,
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: AppColors.cardGreenGradient),
                shape: BoxShape.circle,
              ),
              child: Icon(LucideIcons.check, color: Colors.white, size: 40.sp),
            ),
            SizedBox(height: 20.h),
            Text(
              'Booking Confirmed! 🎉',
              style: TextStyle(
                fontSize: 20.sp,
                fontWeight: FontWeight.w900,
                color: AppColors.neutralGray900,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 12.h),
            Text(
              'Your session has been booked successfully. You\'ll receive a confirmation email shortly.',
              style: TextStyle(
                fontSize: 14.sp,
                color: AppColors.neutralGray600,
                height: 1.5,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 24.h),
            AnimatedButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(vertical: 14.h),
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                  borderRadius: BorderRadius.circular(16.r),
                ),
                child: Text(
                  'Got it!',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w900,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _getDayName(int weekday) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[weekday - 1];
  }

  String _getMonthName(int month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  }
}
