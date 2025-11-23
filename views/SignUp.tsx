
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const SignUp: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to Sign In page instead of Dashboard
      setView(View.SIGN_IN);
    }, 1500);
  };

  return (
    <div className="h-full bg-white p-6 flex flex-col justify-center relative overflow-y-auto custom-scrollbar">
       {/* Back Button */}
       <button onClick={() => setView(View.SIGN_IN)} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 z-10">
           <Icons.ArrowLeft size={24} />
       </button>

      <div className="mb-8 mt-16">
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

        <div className="flex items-start gap-2 mt-2">
            <div className="mt-0.5">
                <input type="checkbox" required className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            </div>
            <p className="text-xs text-gray-500 leading-snug">
                By signing up, you agree to our <button type="button" className="text-blue-600 font-bold">Terms of Service</button> and <button type="button" className="text-blue-600 font-bold">Privacy Policy</button>.
            </p>
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
