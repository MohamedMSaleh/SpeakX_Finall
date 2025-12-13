
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

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
      // Navigate to Sign In page instead of Dashboard for standard flow, or Dashboard for instant access
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
    <div className="h-full bg-white p-6 flex flex-col justify-center relative overflow-y-auto custom-scrollbar">
       {/* Back Button */}
       <button onClick={() => setView(View.SIGN_IN)} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 z-10">
           <Icons.ArrowLeft size={24} />
       </button>

      <div className="text-center mt-10 mb-8">
         <div className="flex items-center justify-center gap-1 mb-6">
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">Speak</span>
            <div className="bg-blue-600 text-white text-3xl font-extrabold px-3 py-1 rounded-xl shadow-lg shadow-blue-200">
                X
            </div>
         </div>
         <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
         <p className="text-gray-500">Start learning English with SpeakX today.</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-5">
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <Icons.User className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Amira Mahmoud"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
          <div className="relative">
            <Icons.Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type={showConfirmPassword ? "text" : "password"}
              required
              className={`w-full bg-gray-50 border rounded-2xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-500'}`}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
            />
             <button 
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
            </button>
          </div>
          {error && <p className="text-xs text-red-500 font-bold mt-1 ml-1">{error}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-4"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>Sign Up <Icons.ArrowRight size={20} /></>
          )}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-gray-100 flex-1"></div>
          <span className="text-xs text-gray-400 font-bold uppercase">Or join with</span>
          <div className="h-px bg-gray-100 flex-1"></div>
      </div>

      <div className="pb-2">
          <button 
            type="button" 
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.04-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          <span className="text-sm font-bold text-gray-700">Google</span>
          </button>
      </div>

      <div className="mt-auto text-center pt-8 pb-6">
        <p className="text-gray-500 text-sm">
          Already have an account?{' '}
          <button onClick={() => setView(View.SIGN_IN)} className="text-blue-600 font-bold hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
