
import React, { useState, useEffect } from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, AnimatedProgressBar } from '../components/AnimatedComponents';

type Phase = 'learning' | 'quiz' | 'result';

const VocabPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [phase, setPhase] = useState<Phase>('learning');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false); // For learning phase (flip/reveal)
  
  // Quiz State
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const words = [
    { 
      id: 1, 
      word: 'Serendipity', 
      phonetic: '/ˌser.ənˈdɪp.ə.t̬i/',
      type: 'Noun', 
      definition: 'The occurrence of events by chance in a happy or beneficial way.', 
      image: 'https://images.unsplash.com/photo-1548437937-25d2be653139?auto=format&fit=crop&q=80&w=400',
      example: 'It was pure serendipity that we met at the coffee shop right before it started raining.'
    },
    { 
      id: 2, 
      word: 'Ephemeral', 
      phonetic: '/əˈfem.ər.əl/',
      type: 'Adjective', 
      definition: 'Lasting for a very short time.', 
      image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=400',
      example: 'The beauty of the sunset was ephemeral, fading within minutes.'
    },
    { 
      id: 3, 
      word: 'Resilient', 
      phonetic: '/rɪˈzɪl.jənt/',
      type: 'Adjective', 
      definition: 'Able to withstand or recover quickly from difficult conditions.', 
      image: 'https://images.unsplash.com/photo-1500829243541-760d5046ec03?auto=format&fit=crop&q=80&w=400',
      example: 'The small tree was resilient, surviving the harsh winter storm.'
    },
    { 
      id: 4, 
      word: 'Eloquent', 
      phonetic: '/ˈel.ə.kwənt/',
      type: 'Adjective', 
      definition: 'Fluent or persuasive in speaking or writing.', 
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400',
      example: 'He gave an eloquent speech that moved the entire audience to tears.'
    },
    { 
      id: 5, 
      word: 'Ubiquitous', 
      phonetic: '/juːˈbɪk.wə.t̬əs/',
      type: 'Adjective', 
      definition: 'Present, appearing, or found everywhere.', 
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400',
      example: 'Smartphones have become ubiquitous in modern society.'
    },
  ];

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  // --- Learning Phase Handlers ---
  const handleNextWord = () => {
    if (currentIndex < words.length - 1) {
      setIsRevealed(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      // Transition to Quiz
      setPhase('quiz');
      setCurrentIndex(0);
    }
  };

  // --- Quiz Phase Handlers ---
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === words[currentIndex].id;
    setIsCorrect(correct);
    setIsAnswerChecked(true);
    
    if (correct) {
      setQuizScore(prev => prev + 1);
      // Play success sound logic here
    } else {
      // Play error sound logic here
    }
  };

  const handleNextQuestion = () => {
    setIsAnswerChecked(false);
    setSelectedOption(null);
    setIsCorrect(false);

    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setPhase('result');
    }
  };

  // --- Result Phase Handlers ---
  const handleReattempt = () => {
    setPhase('learning');
    setCurrentIndex(0);
    setQuizScore(0);
    setIsRevealed(false);
    setIsAnswerChecked(false);
    setSelectedOption(null);
  };

  // 1. Learning View
  const renderLearning = () => {
    const word = words[currentIndex];
    const progress = ((currentIndex + 1) / words.length) * 100;

    return (
      <div className="h-full flex flex-col bg-gray-50 pb-safe">
        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm z-10 sticky top-0 shrink-0">
           <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full"><Icons.X className="text-gray-400" size={24} /></button>
           <h2 className="font-bold text-gray-900 text-sm">Learning Mode</h2>
           <div className="w-8"></div>
        </div>
        
        <div className="h-1.5 bg-gray-200 w-full">
          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex-1 p-6 flex flex-col items-center overflow-y-auto custom-scrollbar">
           
           <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-6">Word {currentIndex + 1} of 5</h3>

           {/* Word Card */}
           <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
              
              {/* Image Area */}
              <div className="h-48 w-full bg-gray-100 relative">
                  <img src={word.image} alt={word.word} className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-black/70 transition-colors" onClick={() => handleSpeak(word.word)}>
                      <Icons.Volume2 size={20} className="text-white" />
                  </div>
              </div>

              <div className="p-6 text-center flex-1 flex flex-col justify-center">
                  <h1 className="text-3xl font-black text-gray-900 mb-1">{word.word}</h1>
                  <p className="text-blue-500 font-serif italic text-lg mb-4">{word.phonetic}</p>
                  
                  {!isRevealed ? (
                      <div className="py-8">
                          <button 
                            onClick={() => setIsRevealed(true)}
                            className="bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-colors flex items-center gap-2 mx-auto"
                          >
                              <Icons.Eye size={18} /> Reveal Meaning
                          </button>
                      </div>
                  ) : (
                      <div className="animate-in fade-in zoom-in duration-300 space-y-4">
                          <div className="bg-gray-50 p-4 rounded-xl">
                              <span className="text-xs font-bold text-gray-400 uppercase block mb-1">{word.type}</span>
                              <p className="text-gray-800 font-medium leading-relaxed">{word.definition}</p>
                          </div>
                          <div className="text-sm text-gray-500 italic">
                              "{word.example}"
                          </div>
                      </div>
                  )}
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100">
            <button 
              onClick={handleNextWord}
              disabled={!isRevealed}
              className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isRevealed 
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
               {currentIndex < 4 ? 'Next Word' : 'Start Quiz'} <Icons.ArrowRight size={20} />
            </button>
        </div>
      </div>
    );
  };

  // 2. Quiz View
  const renderQuiz = () => {
    const question = words[currentIndex]; // In quiz phase, currentIndex 0-4 maps to the same words
    const progress = ((currentIndex) / words.length) * 100;

    return (
      <div className="h-full flex flex-col bg-gray-50 pb-safe relative">
         {/* Header */}
         <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm z-10 sticky top-0 shrink-0">
           <button onClick={() => setPhase('learning')} className="p-1 hover:bg-gray-100 rounded-full"><Icons.X className="text-gray-400" size={24} /></button>
           <h2 className="font-bold text-gray-900 text-sm">Quiz Mode</h2>
           <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
               Score: {quizScore}
           </div>
        </div>

        <div className="h-1.5 bg-gray-200 w-full">
          <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar pb-32">
            <h3 className="font-bold text-gray-900 text-xl mb-6 leading-tight">
                Select the word that means:
            </h3>
            
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm mb-8">
                <p className="text-lg text-blue-900 font-medium leading-relaxed">
                    "{question.definition}"
                </p>
            </div>

            <div className="space-y-3">
                {words.map((option) => {
                    let buttonStyle = 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300';
                    
                    if (isAnswerChecked) {
                        if (option.id === question.id) {
                            buttonStyle = 'bg-green-100 border-2 border-green-500 text-green-700'; // Correct answer
                        } else if (selectedOption === option.id && selectedOption !== question.id) {
                            buttonStyle = 'bg-red-100 border-2 border-red-500 text-red-700'; // Wrong selection
                        } else {
                            buttonStyle = 'bg-gray-50 border-2 border-gray-100 text-gray-400 opacity-50'; // Others
                        }
                    } else if (selectedOption === option.id) {
                        buttonStyle = 'bg-blue-100 border-2 border-blue-500 text-blue-700'; // Selected state
                    }

                    return (
                        <button
                            key={option.id}
                            disabled={isAnswerChecked}
                            onClick={() => setSelectedOption(option.id)}
                            className={`w-full p-4 rounded-2xl font-bold text-left transition-all shadow-sm active:scale-98 flex items-center justify-between ${buttonStyle}`}
                        >
                            <span>{option.word}</span>
                            {isAnswerChecked && option.id === question.id && <Icons.CheckCircle size={20} className="text-green-600" />}
                            {isAnswerChecked && selectedOption === option.id && selectedOption !== question.id && <Icons.X size={20} className="text-red-600" />}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Feedback Bottom Sheet */}
        <div className={`fixed bottom-0 left-0 right-0 p-4 border-t z-30 transition-transform duration-300 ${isAnswerChecked ? 'translate-y-0' : 'translate-y-full'} ${isCorrect ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'}`}>
             <div className="max-w-md mx-auto">
                 <div className="flex items-center gap-3 mb-4">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                         {isCorrect ? <Icons.Check size={20} className="text-white" /> : <Icons.X size={20} className="text-white" />}
                     </div>
                     <h3 className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                         {isCorrect ? 'Excellent!' : 'Not quite right.'}
                     </h3>
                 </div>
                 
                 {!isCorrect && (
                     <p className="text-sm text-red-700 font-medium mb-4 pl-11">
                         The correct answer is <span className="font-bold">"{question.word}"</span>.
                     </p>
                 )}

                 <button 
                    onClick={handleNextQuestion}
                    className={`w-full font-bold py-3.5 rounded-xl shadow-sm transition-colors ${
                        isCorrect ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                 >
                     Continue
                 </button>
             </div>
        </div>

        {/* Initial Check Button (Hidden when bottom sheet is up) */}
        {!isAnswerChecked && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20">
                <div className="max-w-md mx-auto">
                    <button 
                        onClick={handleCheckAnswer}
                        disabled={selectedOption === null}
                        className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all ${
                            selectedOption !== null 
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Check Answer
                    </button>
                </div>
            </div>
        )}
      </div>
    );
  };

  // 3. Result View
  const renderResult = () => {
    const passed = quizScore >= 4; // 80% pass rate
    const percentage = (quizScore / 5) * 100;

    return (
      <div className="h-full flex flex-col bg-white p-6 justify-center items-center text-center pb-safe">
          <div className="mb-8 relative">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl animate-bounce ${passed ? 'bg-yellow-100' : 'bg-red-100'}`}>
                  {passed ? (
                      <Icons.Trophy size={64} className="text-yellow-500 fill-current" />
                  ) : (
                      <Icons.Meh size={64} className="text-red-500" />
                  )}
              </div>
              {passed && (
                  <div className="absolute top-0 right-0 -mr-4 -mt-2">
                      <Icons.Star size={40} className="text-yellow-400 fill-current animate-ping" />
                  </div>
              )}
          </div>

          <h2 className="text-3xl font-black text-gray-900 mb-2">
              {passed ? 'Quiz Passed!' : 'Review Needed'}
          </h2>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">
              {passed 
                ? "You've mastered these new words. Great job!" 
                : "Don't worry, mistakes help you learn. Try again!"
              }
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-10">
              <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-100">
                  <div className="text-xs text-blue-600 font-extrabold uppercase tracking-wide">Score</div>
                  <div className="text-2xl font-black text-gray-900">{percentage}%</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-100">
                  <div className="text-xs text-purple-600 font-extrabold uppercase tracking-wide">Correct</div>
                  <div className="text-2xl font-black text-gray-900">{quizScore}/5</div>
              </div>
          </div>

          <div className="w-full max-w-sm space-y-3">
              <button 
                onClick={onBack}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-colors"
              >
                  Return to Dashboard
              </button>
              
              {!passed && (
                  <button 
                    onClick={handleReattempt}
                    className="w-full bg-white text-gray-700 font-bold py-4 rounded-2xl border-2 border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                      <Icons.RotateCcw size={20} /> Reattempt Quiz
                  </button>
              )}
          </div>
      </div>
    );
  };

  return (
    <>
      {phase === 'learning' && renderLearning()}
      {phase === 'quiz' && renderQuiz()}
      {phase === 'result' && renderResult()}
    </>
  );
};

export default VocabPractice;
