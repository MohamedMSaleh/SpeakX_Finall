
import React, { useState, useEffect } from 'react';
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

  // Create floating particles
  useEffect(() => {
    const particles = document.querySelectorAll('.auth-particle');
    particles.forEach((particle, index) => {
      const element = particle as HTMLElement;
      element.style.left = Math.random() * 100 + '%';
      element.style.animationDelay = Math.random() * 8 + 's';
      element.style.animationDuration = 8 + Math.random() * 4 + 's';
    });
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 flex flex-col justify-center relative overflow-y-auto custom-scrollbar">
       {/* Animated Background Blobs */}
      <div className="floating-shapes">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="auth-particle particle" style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            position: 'absolute',
            background: 'rgba(139, 92, 246, 0.4)'
          }}></div>
        ))}
      </div>

       {/* Back Button */}
       <button onClick={() => setView(View.SIGN_IN)} className="absolute top-6 left-6 text-gray-400 hover:text-gray-700 z-10 transition-colors p-2 rounded-full hover:bg-white/50">
           <Icons.ArrowLeft size={24} />
       </button>

      <div className="relative z-10 max-w-md mx-auto w-full">
        {/* Logo with Animation */}
        <div className="text-center mb-8 scale-in">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-5xl font-black text-gray-900 tracking-tight">Speak</span>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-4xl font-black px-4 py-2 rounded-2xl shadow-lg shadow-purple-300 relative overflow-hidden">
              <span className="relative z-10">X</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">🚀 Join SpeakX</h1>
          <p className="text-gray-600 font-medium">Your amazing English learning journey starts here</p>
        </div>

      <form onSubmit={handleSignUp} className="space-y-4 slide-up">
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Icons.User size={16} className="text-purple-600" />
            Full Name
          </label>
          <div className="relative">
            <input 
              type="text" 
              required
              className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all hover:border-gray-300"
              placeholder="Amira Mahmoud"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Icons.Mail size={16} className="text-purple-600" />
            Email Address
          </label>
          <div className="relative">
            <input 
              type="email" 
              required
              className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all hover:border-gray-300"
              placeholder="hello@speakx.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Icons.Lock size={16} className="text-purple-600" />
            Password
          </label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              required
              className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 pr-12 text-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all hover:border-gray-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors p-1 rounded-lg hover:bg-purple-50"
            >
              {showPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Icons.Lock size={16} className="text-purple-600" />
            Confirm Password
          </label>
          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"}
              required
              className={`w-full bg-white border-2 rounded-2xl py-4 px-6 pr-12 text-sm focus:outline-none focus:ring-4 transition-all ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-100 shake' : 'border-gray-200 hover:border-gray-300 focus:border-purple-500 focus:ring-purple-100'}`}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
            />
             <button 
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors p-1 rounded-lg hover:bg-purple-50"
            >
              {showConfirmPassword ? <Icons.EyeOff size={20} /> : <Icons.Eye size={20} />}
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-1 mt-2 text-xs text-red-500 font-bold ml-1 bounce-in">
              <Icons.AlertCircle size={14} />
              {error}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-300 hover:shadow-xl hover:shadow-purple-400 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 mt-6 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700"></span>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </div>
          ) : (
            <>
              <span>Create Account</span>
              <Icons.ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Or join with</span>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
      </div>

      <div className="pb-2">
          <button 
            type="button" 
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md group"
          >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.04-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">Continue with Google</span>
          </button>
      </div>

      <div className="mt-auto text-center pt-8 pb-6">
        <p className="text-gray-600 text-sm font-medium">
          Already have an account?{' '}
          <button onClick={() => setView(View.SIGN_IN)} className="text-purple-600 font-bold hover:underline hover:text-purple-700 transition-colors">
            Sign In
          </button>
        </p>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
