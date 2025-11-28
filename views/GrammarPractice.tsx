
import React, { useState } from 'react';
import * as Icons from '../components/Icons';

const GrammarPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const questions = [
    {
      id: 1,
      prompt: "Construct a sentence in the Past Continuous tense.",
      meaning: "Action happening at a specific time in the past.",
      correct: ["I", "was", "reading", "a", "book", "yesterday"],
      scrambled: ["reading", "yesterday", "I", "book", "was", "a"]
    },
    {
        id: 2,
        prompt: "Form a question in the Present Perfect.",
        meaning: "Ask about life experience.",
        correct: ["Have", "you", "ever", "been", "to", "Paris"],
        scrambled: ["been", "Paris", "Have", "to", "ever", "you"]
    }
  ];

  const currentQ = questions[step];

  const handleWordClick = (word: string) => {
    setSelectedWords([...selectedWords, word]);
    setIsWrong(false);
  };

  const handleRemoveWord = (word: string, index: number) => {
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setIsWrong(false);
  };

  const checkAnswer = () => {
    const currentString = selectedWords.join(' ');
    const correctString = currentQ.correct.join(' ');

    if (currentString === correctString) {
        if (step < questions.length - 1) {
            // Success animation delay
            setTimeout(() => {
                setStep(prev => prev + 1);
                setSelectedWords([]);
            }, 500);
        } else {
            setCompleted(true);
        }
    } else {
        setIsWrong(true);
    }
  };

  // Determine available words (scrambled minus selected)
  const availableWords = [...currentQ.scrambled];
  selectedWords.forEach(word => {
      const idx = availableWords.indexOf(word);
      if (idx > -1) availableWords.splice(idx, 1);
  });

  const progress = ((step) / questions.length) * 100;

  if (completed) {
    return (
        <div className="h-full bg-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-50 to-transparent pointer-events-none"></div>
          
          <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-8 shadow-xl animate-bounce border-4 border-green-50">
            <Icons.Trophy size={56} className="text-green-600 fill-green-600" />
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 mb-3">Grammar Mastered!</h2>
          <p className="text-gray-500 mb-10 max-w-xs leading-relaxed">You've successfully built complex sentences and improved your structure skills.</p>
          
          <div className="w-full max-w-xs space-y-3">
              <button 
                onClick={onBack}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 hover:bg-green-700 transition-colors"
              >
                Continue Learning
              </button>
              <button onClick={onBack} className="text-gray-400 font-bold text-sm">Review Answers</button>
          </div>
        </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col pb-safe">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm z-10 sticky top-0 shrink-0">
         <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full"><Icons.X className="text-gray-400" size={24} /></button>
         <h2 className="font-bold text-gray-900 text-sm tracking-wide uppercase text-blue-600">Grammar Drill</h2>
         <div className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
             {step + 1} / {questions.length}
         </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-gray-200 w-full">
          <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flex-1 flex flex-col p-5 overflow-y-auto custom-scrollbar">
          
          {/* Prompt Card */}
          <div className="mb-8">
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 relative">
                  <div className="absolute -left-1 top-6 w-2 h-8 bg-blue-500 rounded-r-full"></div>
                  <h3 className="text-lg font-black text-gray-900 mb-2 pl-3">{currentQ.prompt}</h3>
                  <div className="flex items-center gap-2 pl-3">
                      <Icons.Lightbulb size={16} className="text-yellow-500" />
                      <p className="text-sm text-gray-500 font-medium">{currentQ.meaning}</p>
                  </div>
              </div>
          </div>

          {/* Sentence Construction Area */}
          <div className="flex-1">
              <label className="text-xs font-bold text-gray-400 uppercase mb-3 block px-1">Your Answer</label>
              
              <div 
                className={`
                    min-h-[140px] bg-white rounded-3xl border-2 p-4 mb-8 flex flex-wrap gap-2 content-start transition-all
                    ${isWrong ? 'border-red-300 bg-red-50' : 'border-blue-100 focus-within:border-blue-300 shadow-inner'}
                `}
              >
                  {selectedWords.length === 0 && (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm font-medium italic pointer-events-none">
                          Tap words to build the sentence
                      </div>
                  )}
                  
                  {selectedWords.map((word, idx) => (
                      <button 
                        key={`${word}-${idx}`} 
                        onClick={() => handleRemoveWord(word, idx)}
                        className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md animate-in zoom-in duration-200 hover:bg-blue-700 transition-colors"
                      >
                          {word}
                      </button>
                  ))}
              </div>

              {/* Word Bank */}
              <div className="mt-auto">
                  <label className="text-xs font-bold text-gray-400 uppercase mb-3 block px-1">Word Bank</label>
                  <div className="flex flex-wrap gap-3 justify-center">
                      {availableWords.map((word, idx) => (
                          <button 
                            key={`${word}-${idx}`}
                            onClick={() => handleWordClick(word)}
                            className="bg-white text-gray-700 border-b-4 border-gray-200 px-5 py-3 rounded-2xl font-bold text-sm hover:border-b-2 hover:translate-y-[2px] hover:bg-gray-50 active:border-b-0 active:translate-y-[4px] transition-all"
                          >
                              {word}
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${isWrong ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}>
          {isWrong && (
              <div className="flex items-center justify-center gap-2 text-red-600 font-bold mb-3 animate-pulse">
                  <Icons.AlertCircle size={18} />
                  <span className="text-sm">Incorrect order. Try again!</span>
              </div>
          )}
          <button 
            onClick={checkAnswer}
            disabled={selectedWords.length === 0}
            className={`w-full font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${
                selectedWords.length > 0 
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
      </div>
    </div>
  );
};

export default GrammarPractice;
