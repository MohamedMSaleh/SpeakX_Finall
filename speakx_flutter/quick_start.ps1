# Quick Start Commands for SpeakX Flutter

# Change to project directory
cd "c:\Users\Mohamed Saleh\Desktop\SpeakX\SpeakX_Finall\speakx_flutter"

# Install dependencies
Write-Host "Installing Flutter dependencies..." -ForegroundColor Cyan
flutter pub get

# Check setup
Write-Host "`nChecking Flutter setup..." -ForegroundColor Cyan
flutter doctor

# List available devices
Write-Host "`nAvailable devices:" -ForegroundColor Cyan
flutter devices

# Run instructions
Write-Host "`n==================================================" -ForegroundColor Green
Write-Host "Setup Complete! Choose how to run:" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. Run on any available device:" -ForegroundColor Yellow
Write-Host "   flutter run" -ForegroundColor White
Write-Host ""
Write-Host "2. Run on Chrome (Web):" -ForegroundColor Yellow
Write-Host "   flutter run -d chrome" -ForegroundColor White
Write-Host ""
Write-Host "3. Run on Windows:" -ForegroundColor Yellow
Write-Host "   flutter run -d windows" -ForegroundColor White
Write-Host ""
Write-Host "4. Build release APK (Android):" -ForegroundColor Yellow
Write-Host "   flutter build apk --release" -ForegroundColor White
Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host "Press any key to run on default device..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Run app
flutter run
