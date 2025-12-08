
import React, { useState } from 'react';
import * as Icons from '../components/Icons';

const Subscription: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
        setProcessing(false);
        setSuccess(true);
    }, 2000);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col pb-safe">
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10 shrink-0">
          <button onClick={onBack}><Icons.ChevronRight className="rotate-180 text-gray-600" /></button>
          <h2 className="font-bold text-gray-900">Subscription</h2>
      </div>

      <div className="p-5 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h3>
              <p className="text-gray-500 text-sm mt-2">Unlock unlimited practice and human tutor validation.</p>
          </div>

          {/* Premium Card (Annual) */}
          <div className="bg-blue-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-bl-xl">Best Value</div>
               <h4 className="text-lg font-bold mb-1">Annual Plan</h4>
               <div className="flex items-baseline gap-1 mb-4">
                   <span className="text-3xl font-bold">$15.99</span>
                   <span className="text-blue-200 text-sm">/year</span>
               </div>
               <ul className="space-y-3 text-sm mb-6">
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-green-400" /> Unlimited AI Practice</li>
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-green-400" /> Human Tutor Validation</li>
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-green-400" /> Advanced Analytics</li>
               </ul>
               <button 
                onClick={() => setShowPayment(true)}
                className="w-full bg-white text-blue-900 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors"
               >
                   Upgrade Now
               </button>
          </div>

          {/* Monthly Card - Updated to match Annual Plan styles */}
          <div className="bg-blue-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
               <h4 className="text-lg font-bold mb-1">Monthly Plan</h4>
               <div className="flex items-baseline gap-1 mb-4">
                   <span className="text-3xl font-bold">$2.99</span>
                   <span className="text-blue-200 text-sm">/month</span>
               </div>
               <ul className="space-y-3 text-sm mb-6">
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-green-400" /> Unlimited AI Practice</li>
                   <li className="flex items-center gap-2"><Icons.X size={16} className="text-red-400" /> Human Tutor Validation</li>
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-green-400" /> Basic Analytics</li>
               </ul>
               <button 
                 onClick={() => setShowPayment(true)}
                 className="w-full bg-white text-blue-900 font-bold py-3 rounded-xl hover:bg-blue-50"
               >
                   Select Monthly
               </button>
          </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setShowPayment(false)}
              ></div>
              
              <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative z-10 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
                  {!success ? (
                      <>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-900 text-lg">Payment Method</h3>
                            <button onClick={() => setShowPayment(false)} className="p-1 bg-gray-100 rounded-full text-gray-500">
                                <Icons.X size={20} />
                            </button>
                        </div>

                        {/* Method Selector */}
                        <div className="flex gap-2 mb-6">
                            <button onClick={() => setSelectedMethod('card')} className={`flex-1 py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${selectedMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500'}`}>
                                <Icons.CreditCard size={20} />
                                <span className="text-[10px] font-bold">Card</span>
                            </button>
                            <button onClick={() => setSelectedMethod('apple')} className={`flex-1 py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${selectedMethod === 'apple' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500'}`}>
                                <div className="w-5 h-5 bg-current rounded-full flex items-center justify-center text-white p-0.5">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white bg-transparent"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s1.77-.74 3.29-.74c1.76.05 3.06.66 4.1 1.8-3.41 1.88-2.63 7.21 1.53 8.97-.68 1.48-1.57 2.72-2.52 3.86-.96 1.15-2.05 1.55-3.03 1.55zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.22-1.74 4.09-3.74 4.25z"/></svg>
                                </div>
                                <span className="text-[10px] font-bold">Apple</span>
                            </button>
                            <button onClick={() => setSelectedMethod('paypal')} className={`flex-1 py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${selectedMethod === 'paypal' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500'}`}>
                                <span className="font-bold italic text-lg leading-none">P</span>
                                <span className="text-[10px] font-bold">PayPal</span>
                            </button>
                        </div>

                        {/* Form Data */}
                        <div className="mb-8 min-h-[200px]">
                            {selectedMethod === 'card' && (
                                <div className="space-y-4 animate-in fade-in duration-200">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 block">Card Number</label>
                                        <div className="relative">
                                            <Icons.CreditCard className="absolute left-3 top-3 text-gray-400" size={18} />
                                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-gray-500 mb-1 block">Expiry</label>
                                            <input type="text" placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-gray-500 mb-1 block">CVC</label>
                                            <input type="text" placeholder="123" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 block">Cardholder Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            )}

                            {selectedMethod === 'apple' && (
                                <div className="flex flex-col items-center justify-center h-48 animate-in fade-in duration-200 text-center">
                                    <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s1.77-.74 3.29-.74c1.76.05 3.06.66 4.1 1.8-3.41 1.88-2.63 7.21 1.53 8.97-.68 1.48-1.57 2.72-2.52 3.86-.96 1.15-2.05 1.55-3.03 1.55zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.22-1.74 4.09-3.74 4.25z"/></svg>
                                    </div>
                                    <p className="font-bold text-gray-900">Apple Pay</p>
                                    <p className="text-xs text-gray-500 mt-1">Confirm with Side Button or Face ID</p>
                                </div>
                            )}

                            {selectedMethod === 'paypal' && (
                                <div className="flex flex-col items-center justify-center h-48 animate-in fade-in duration-200 text-center">
                                    <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-4">
                                        <span className="font-bold italic text-3xl">P</span>
                                    </div>
                                    <p className="font-bold text-gray-900">PayPal</p>
                                    <p className="text-xs text-gray-500 mt-1">You will be redirected to PayPal to complete your purchase.</p>
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={handlePayment}
                            disabled={processing}
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>Pay $15.99</>
                            )}
                        </button>
                      </>
                  ) : (
                      <div className="text-center py-6">
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4 animate-bounce">
                              <Icons.Check size={40} strokeWidth={3} />
                          </div>
                          <h3 className="font-black text-gray-900 text-2xl mb-2">Payment Successful!</h3>
                          <p className="text-gray-500 text-sm mb-8">Welcome to SpeakX Premium. Your learning journey just got a turbo boost.</p>
                          <button 
                            onClick={() => { setShowPayment(false); onBack(); }}
                            className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-200 hover:bg-green-700 transition-colors"
                          >
                              Start Learning
                          </button>
                      </div>
                  )}
              </div>
          </div>
      )}
    </div>
  );
};

export default Subscription;
