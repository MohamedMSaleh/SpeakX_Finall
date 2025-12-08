
import React, { useState } from 'react';
import * as Icons from '../components/Icons';

const Subscription: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'plus' | 'pro'>('pro'); // Track which plan is selected for payment
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states for different methods
  const [paypalEmail, setPaypalEmail] = useState('');
  const [appleId, setAppleId] = useState('user@icloud.com'); // Mock auto-fill

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
        setProcessing(false);
        setSuccess(true);
    }, 2000);
  };

  const openPayment = (plan: 'plus' | 'pro') => {
      setSelectedPlan(plan);
      setShowPayment(true);
  }

  const plans = {
      plus: {
          name: "Plus",
          price: billingCycle === 'monthly' ? 9.99 : 99.99,
          period: billingCycle === 'monthly' ? '/mo' : '/yr',
          features: [
              { text: "Unlimited AI Practice", included: true },
              { text: "Basic Analytics", included: true },
              { text: "No Ads", included: true },
              { text: "Human Tutor Validation", included: false },
          ]
      },
      pro: {
          name: "Pro",
          price: billingCycle === 'monthly' ? 19.99 : 199.99,
          period: billingCycle === 'monthly' ? '/mo' : '/yr',
          features: [
              { text: "Unlimited AI Practice", included: true },
              { text: "Advanced Analytics", included: true },
              { text: "No Ads", included: true },
              { text: "Human Tutor Validation", included: true },
          ]
      }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col pb-safe">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10 shrink-0">
          <button onClick={onBack}><Icons.ChevronRight className="rotate-180 text-gray-600" /></button>
          <h2 className="font-bold text-gray-900">Subscription</h2>
      </div>

      <div className="p-5 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="text-center mb-2">
              <h3 className="text-2xl font-bold text-gray-900">Unlock Full Potential</h3>
              <p className="text-gray-500 text-sm mt-2">Choose the plan that fits your learning journey.</p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-6">
              <div className="bg-gray-200 p-1 rounded-xl flex relative">
                  <button 
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all z-10 ${billingCycle === 'monthly' ? 'text-gray-900 shadow-sm bg-white' : 'text-gray-500'}`}
                  >
                      Monthly
                  </button>
                  <button 
                    onClick={() => setBillingCycle('annual')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all z-10 flex items-center gap-2 ${billingCycle === 'annual' ? 'text-gray-900 shadow-sm bg-white' : 'text-gray-500'}`}
                  >
                      Annual <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">-20%</span>
                  </button>
              </div>
          </div>

          {/* Pro Plan (Best Value) */}
          <div className="bg-blue-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden ring-4 ring-blue-50 border-2 border-blue-800">
               <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-bl-xl">Recommended</div>
               <h4 className="text-lg font-bold mb-1">Pro Plan</h4>
               <div className="flex items-baseline gap-1 mb-4">
                   <span className="text-4xl font-black">${plans.pro.price}</span>
                   <span className="text-blue-200 text-sm font-medium">{plans.pro.period}</span>
               </div>
               <ul className="space-y-3 text-sm mb-6">
                   {plans.pro.features.map((f, i) => (
                       <li key={i} className="flex items-center gap-3">
                           {f.included ? <Icons.CheckCircle size={18} className="text-green-400 shrink-0" /> : <Icons.X size={18} className="text-gray-500 shrink-0" />}
                           <span className={f.included ? 'text-white' : 'text-gray-400'}>{f.text}</span>
                       </li>
                   ))}
               </ul>
               <button 
                onClick={() => openPayment('pro')}
                className="w-full bg-white text-blue-900 font-bold py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
               >
                   Get Pro
               </button>
          </div>

          {/* Plus Plan */}
          <div className="bg-white rounded-3xl p-6 text-gray-900 border border-gray-200 shadow-sm relative overflow-hidden">
               <h4 className="text-lg font-bold mb-1">Plus Plan</h4>
               <div className="flex items-baseline gap-1 mb-4">
                   <span className="text-4xl font-black">${plans.plus.price}</span>
                   <span className="text-gray-500 text-sm font-medium">{plans.plus.period}</span>
               </div>
               <ul className="space-y-3 text-sm mb-6">
                   {plans.plus.features.map((f, i) => (
                       <li key={i} className="flex items-center gap-3">
                           {f.included ? <Icons.CheckCircle size={18} className="text-blue-600 shrink-0" /> : <Icons.X size={18} className="text-gray-300 shrink-0" />}
                           <span className={f.included ? 'text-gray-900' : 'text-gray-400'}>{f.text}</span>
                       </li>
                   ))}
               </ul>
               <button 
                 onClick={() => openPayment('plus')}
                 className="w-full bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
               >
                   Get Plus
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
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Checkout</h3>
                                <p className="text-xs text-gray-500">{plans[selectedPlan].name} Plan • ${plans[selectedPlan].price}{plans[selectedPlan].period}</p>
                            </div>
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
                            <button onClick={() => setSelectedMethod('apple')} className={`flex-1 py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${selectedMethod === 'apple' ? 'border-black bg-gray-900 text-white' : 'border-gray-200 text-gray-500'}`}>
                                {/* Apple Icon SVG */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s1.77-.74 3.29-.74c1.76.05 3.06.66 4.1 1.8-3.41 1.88-2.63 7.21 1.53 8.97-.68 1.48-1.57 2.72-2.52 3.86-.96 1.15-2.05 1.55-3.03 1.55zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.22-1.74 4.09-3.74 4.25z"/></svg>
                                <span className="text-[10px] font-bold">Pay</span>
                            </button>
                            <button onClick={() => setSelectedMethod('paypal')} className={`flex-1 py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${selectedMethod === 'paypal' ? 'border-blue-700 bg-blue-50 text-blue-800' : 'border-gray-200 text-gray-500'}`}>
                                {/* PayPal Icon SVG - Stylized P */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.946 5.05-4.336 6.794-9.02 6.794h-1.83l-2.794 8.01z"/></svg>
                                <span className="text-[10px] font-bold">PayPal</span>
                            </button>
                        </div>

                        {/* Form Data */}
                        <div className="mb-8 min-h-[220px]">
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
                                            <label className="text-xs font-bold text-gray-500 mb-1 block">Expire date</label>
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
                                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s1.77-.74 3.29-.74c1.76.05 3.06.66 4.1 1.8-3.41 1.88-2.63 7.21 1.53 8.97-.68 1.48-1.57 2.72-2.52 3.86-.96 1.15-2.05 1.55-3.03 1.55zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.22-1.74 4.09-3.74 4.25z"/></svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-sm">Apple Pay</div>
                                                <div className="text-xs text-gray-500">Connected to Wallet</div>
                                            </div>
                                        </div>
                                        <Icons.CheckCircle size={20} className="text-green-500" />
                                    </div>
                                    
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 block">Apple ID</label>
                                        <input 
                                            type="text" 
                                            value={appleId}
                                            onChange={(e) => setAppleId(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-gray-600"
                                            readOnly
                                        />
                                    </div>
                                    <p className="text-xs text-center text-gray-400 mt-2">Double-click side button to confirm payment on device.</p>
                                </div>
                            )}

                            {selectedMethod === 'paypal' && (
                                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-700 shadow-sm">
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.946 5.05-4.336 6.794-9.02 6.794h-1.83l-2.794 8.01z"/></svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-sm">PayPal</div>
                                                <div className="text-xs text-gray-500">Secure Checkout</div>
                                            </div>
                                        </div>
                                        <Icons.ExternalLink size={18} className="text-blue-500" />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 block">PayPal Email</label>
                                        <input 
                                            type="email" 
                                            placeholder="you@example.com"
                                            value={paypalEmail}
                                            onChange={(e) => setPaypalEmail(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <p className="text-xs text-center text-gray-400 mt-2">You will be redirected to PayPal to complete your purchase securely.</p>
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={handlePayment}
                            disabled={processing}
                            className={`w-full text-white font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${
                                selectedMethod === 'paypal' ? 'bg-[#0070BA] shadow-blue-200 hover:bg-[#005ea6]' :
                                selectedMethod === 'apple' ? 'bg-black shadow-gray-400 hover:bg-gray-900' :
                                'bg-blue-600 shadow-blue-200 hover:bg-blue-700'
                            }`}
                        >
                            {processing ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>Pay ${plans[selectedPlan].price}</>
                            )}
                        </button>
                      </>
                  ) : (
                      <div className="text-center py-6">
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4 animate-bounce">
                              <Icons.Check size={40} strokeWidth={3} />
                          </div>
                          <h3 className="font-black text-gray-900 text-2xl mb-2">Payment Successful!</h3>
                          <p className="text-gray-500 text-sm mb-8">You are now on the {plans[selectedPlan].name} plan. Happy learning!</p>
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
