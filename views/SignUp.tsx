
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, MotivationalMessage } from '../components/AnimatedComponents';

const SignUp: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }
    setError(null);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setView(View.DASHBOARD); 
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    // Simulate Google Auth Provider delay
    setTimeout(() => {
      setIsLoading(false);
      setView(View.DASHBOARD);
    }, 1500);
  };

  return (
    <GradientBackground variant="multicolor" className="h-full relative overflow-y-auto custom-scrollbar">
      <FloatingShapes />
      
      <div className="relative z-10 min-h-full flex flex-col justify-center p-6 md:p-8 max-w-md mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => setView(View.SIGN_IN)} 
          className="absolute top-6 left-6 text-gray-500 hover:text-gray-900 hover-scale active-press transition-colors"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <Icons.ArrowLeft size={20} />
          </div>
        </button>

        {/* Logo & Header */}
        <div className="text-center mb-8 animate-slideDown">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-5xl font-black text-gray-900 tracking-tight">Speak</span>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-4xl font-black px-4 py-2 rounded-2xl shadow-xl shadow-blue-200 animate-float">
                X
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            🚀 Create Account
          </h1>
          <p className="text-gray-600 font-medium">
            Begin your journey to confident English
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 animate-slideUp">
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                Full Name
              </label>
              <div className="relative group">
                <Icons.User className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  required
                  className="w-full bg-gradient-to-br from-gray-50 to-pink-50/30 border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all hover:border-gray-300"
                  placeholder="Amira Mahmoud"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Email Address
              </label>
              <div className="relative group">
                <Icons.Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  className="w-full bg-gradient-to-br from-gray-50 to-blue-50/30 border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all hover:border-gray-300"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Password
              </label>
              <div className="relative group">
                <Icons.Lock className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full bg-gradient-to-br from-gray-50 to-purple-50/30 border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all hover:border-gray-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-[44px] h-[44px] flex items-center justify-center shrink-0"
                  style={{ transition: 'color 0.2s', transform: 'translateY(-50%)' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%)'}
                >
                  {showPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Confirm Password
              </label>
              <div className="relative group">
                <Icons.Lock className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className={`w-full bg-gradient-to-br from-gray-50 to-green-50/30 border-2 rounded-2xl py-3.5 pl-12 pr-12 text-sm font-medium focus:outline-none focus:ring-2 transition-all hover:border-gray-300 ${
                    error 
                      ? 'border-red-300 focus:ring-red-400 focus:border-red-400' 
                      : 'border-gray-200 focus:ring-blue-400 focus:border-blue-400'
                  }`}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-[44px] h-[44px] flex items-center justify-center shrink-0"
                  style={{ transition: 'color 0.2s', transform: 'translateY(-50%)' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%)'}
                >
                  {showConfirmPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
                </button>
              </div>
              {error && (
                <div className="flex items-center gap-2 mt-2 animate-shake">
                  <span className="text-xs text-red-500 font-bold">⚠️ {error}</span>
                </div>
              )}
            </div>

            {/* Sign Up Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl shadow-blue-200 hover:from-blue-600 hover:to-blue-800 transition-all flex items-center justify-center gap-2 hover-lift active-press disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <Icons.ArrowRight size={20} className="animate-float" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1"></div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Or join with</span>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1"></div>
          </div>

          {/* Google Sign Up */}
          <button 
            type="button" 
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-gray-200 rounded-2xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover-lift active-press"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.04-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-bold text-gray-700">Continue with Google</span>
          </button>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm font-medium">
              Already have an account?{' '}
              <button 
                onClick={() => setView(View.SIGN_IN)} 
                className="text-blue-600 font-bold hover:text-blue-700 transition-colors hover-scale inline-block"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6">
          <MotivationalMessage 
            message="Join thousands mastering English every day!" 
            variant="celebrating"
          />
        </div>
      </div>
    </GradientBackground>
  );
};

export default SignUp;