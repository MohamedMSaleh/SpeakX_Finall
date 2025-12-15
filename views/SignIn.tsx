
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { AnimatedButton, GradientBackground, FloatingShapes, MotivationalMessage } from '../components/AnimatedComponents';

const SignIn: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [mode, setMode] = useState<'signin' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setView(View.DASHBOARD);
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Simulate Google Auth Provider delay
    setTimeout(() => {
      setIsLoading(false);
      setView(View.DASHBOARD);
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          setResetSent(true);
      }, 1500);
  }

  return (
    <GradientBackground variant="multicolor" className="h-full relative overflow-y-auto custom-scrollbar">
      <FloatingShapes />
      
      <div className="relative z-10 min-h-full flex flex-col justify-center p-6 md:p-8 max-w-md mx-auto">
        {/* Logo & Header */}
        <div className="text-center mb-8 animate-slideDown">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-5xl font-black text-gray-900 tracking-tight">Speak</span>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-4xl font-black px-4 py-2 rounded-2xl shadow-xl shadow-blue-200 animate-float">
                X
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {mode === 'signin' ? '✨ Welcome Back!' : '🔐 Reset Password'}
          </h1>
          <p className="text-gray-600 font-medium">
              {mode === 'signin' ? 'Continue your amazing journey' : 'We\'ll help you get back in'}
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 animate-slideUp">
          {mode === 'signin' ? (
            <>
              <form onSubmit={handleSignIn} className="space-y-5">
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
                  <div className="flex justify-end mt-2">
                    <button 
                      type="button" 
                      onClick={() => setMode('forgot')} 
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors hover-scale inline-block"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl shadow-blue-200 hover:from-blue-600 hover:to-blue-800 transition-all flex items-center justify-center gap-2 hover-lift active-press disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <Icons.ArrowRight size={20} className="animate-float" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1"></div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Or continue with</span>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-1"></div>
              </div>

              {/* Google Sign In */}
              <button 
                onClick={handleGoogleSignIn}
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

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm font-medium">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setView(View.SIGN_UP)} 
                    className="text-blue-600 font-bold hover:text-blue-700 transition-colors hover-scale inline-block"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </>
          ) : (
            /* Forgot Password Mode */
            <>
              {!resetSent ? (
                <form onSubmit={handleResetPassword} className="space-y-5">
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

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl shadow-blue-200 hover:from-blue-600 hover:to-blue-800 transition-all flex items-center justify-center gap-2 hover-lift active-press disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border-2 border-green-200 animate-bounceIn">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg animate-float">
                    <Icons.Check size={32} strokeWidth={3} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Check your email! 📧</h3>
                  <p className="text-sm text-gray-600 font-medium">We've sent password recovery instructions to your inbox.</p>
                </div>
              )}

              <button 
                onClick={() => { setMode('signin'); setResetSent(false); }} 
                className="mt-6 w-full text-sm font-bold text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 transition-colors hover-scale py-2"
              >
                <Icons.ArrowLeft size={16} /> Back to Sign In
              </button>
            </>
          )}
        </div>

        {/* Motivational Message */}
        {mode === 'signin' && (
          <div className="mt-6">
            <MotivationalMessage 
              message="Start speaking with confidence today!" 
              variant="encouraging"
            />
          </div>
        )}
      </div>
    </GradientBackground>
  );
};

export default SignIn;