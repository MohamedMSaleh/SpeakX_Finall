
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

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
    <div className="h-full bg-white p-6 flex flex-col justify-center relative overflow-y-auto custom-scrollbar">
      <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
         <div className="w-64 h-64 bg-blue-500 rounded-full blur-3xl -mr-32 -mt-32"></div>
      </div>
      
      <div className="text-center mt-10 mb-8">
         <div className="flex items-center justify-center gap-1 mb-6">
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">Speak</span>
            <div className="bg-blue-600 text-white text-3xl font-extrabold px-3 py-1 rounded-xl shadow-lg shadow-blue-200">
                X
            </div>
         </div>
         <h1 className="text-3xl font-bold text-gray-900 mb-2">
             {mode === 'signin' ? 'Welcome Back' : 'Reset Password'}
         </h1>
         <p className="text-gray-500">
             {mode === 'signin' ? 'Sign in to continue your journey' : 'Enter your email to receive instructions'}
         </p>
      </div>

      {mode === 'signin' ? (
          <>
            <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                    <Icons.Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                    type="email" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="hello@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                </div>

                <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <div className="relative">
                    <Icons.Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                    {showPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
                    </button>
                </div>
                <div className="flex justify-end mt-2">
                    <button type="button" onClick={() => setMode('forgot')} className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot Password?</button>
                </div>
                </div>

                <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <>Sign In <Icons.ArrowRight size={20} /></>
                )}
                </button>
            </form>

            <div className="my-8 flex items-center gap-4">
                <div className="h-px bg-gray-100 flex-1"></div>
                <span className="text-xs text-gray-400 font-bold uppercase">Or continue with</span>
                <div className="h-px bg-gray-100 flex-1"></div>
            </div>

            <div className="pb-6">
                <button 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.04-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span className="text-sm font-bold text-gray-700">Google</span>
                </button>
            </div>

            <div className="mt-auto text-center pt-8">
                <p className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <button onClick={() => setView(View.SIGN_UP)} className="text-blue-600 font-bold hover:underline">
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
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Icons.Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                            <input 
                            type="email" 
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="hello@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>
            ) : (
                <div className="text-center bg-green-50 p-6 rounded-3xl border border-green-100">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                        <Icons.Check size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Check your mail</h3>
                    <p className="text-sm text-gray-600">We have sent password recovery instructions to your email.</p>
                </div>
            )}

            <button onClick={() => { setMode('signin'); setResetSent(false); }} className="mt-8 text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center justify-center gap-2">
                <Icons.ArrowLeft size={16} /> Back to Sign In
            </button>
          </>
      )}
    </div>
  );
};

export default SignIn;
