
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
            setStep(prev => prev + 1);
            setSelectedWords([]);
        } else {
            setCompleted(true);
        }
    } else {
        setIsWrong(true);
    }
  };

  if (completed) {
    return (
        <div className="h-full bg-green-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce">
            <Icons.Star size={48} className="text-yellow-400 fill-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Grammar Mastered!</h2>
          <p className="text-gray-500 mb-8">You successfully built complex sentences.</p>
          <button 
            onClick={onBack}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-green-700 transition-colors"
          >
            Continue Learning
          </button>
        </div>
    );
  }

  // Determine available words (scrambled minus selected)
  // Simple logic: Count occurrences to handle duplicates correctly if any
  const availableWords = [...currentQ.scrambled];
  selectedWords.forEach(word => {
      const idx = availableWords.indexOf(word);
      if (idx > -1) availableWords.splice(idx, 1);
  });

  return (
    <div className="h-full bg-gray-50 flex flex-col pb-safe">
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm z-10 sticky top-0 shrink-0">
         <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
         <h2 className="font-bold text-gray-900 text-sm">Grammar Challenge</h2>
         <div className="w-8"></div>
      </div>

      <div className="p-2">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
          </div>
      </div>

      <div className="flex-1 flex flex-col p-6">
          <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{currentQ.prompt}</h3>
              <p className="text-sm text-gray-500 italic">Hint: {currentQ.meaning}</p>
          </div>

          {/* Answer Area */}
          <div className={`min-h-[120px] bg-white rounded-2xl border-2 p-4 mb-8 flex flex-wrap gap-2 content-start transition-colors ${isWrong ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
              {selectedWords.length === 0 && <span className="text-gray-300 text-sm">Tap words below to build sentence...</span>}
              {selectedWords.map((word, idx) => (
                  <button 
                    key={`${word}-${idx}`} 
                    onClick={() => handleRemoveWord(word, idx)}
                    className="bg-blue-100 text-blue-700 px-3 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-blue-200 animate-in zoom-in duration-200"
                  >
                      {word}
                  </button>
              ))}
          </div>

          {/* Word Bank */}
          <div className="flex flex-wrap gap-3 justify-center">
              {availableWords.map((word, idx) => (
                  <button 
                    key={`${word}-${idx}`}
                    onClick={() => handleWordClick(word)}
                    className="bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all active:scale-95"
                  >
                      {word}
                  </button>
              ))}
          </div>
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${isWrong ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}>
          {isWrong && (
              <div className="flex items-center gap-2 text-red-600 font-bold mb-3 px-2">
                  <Icons.AlertCircle size={20} />
                  <span>Incorrect order. Try again.</span>
              </div>
          )}
          <button 
            onClick={checkAnswer}
            disabled={selectedWords.length === 0}
            className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all ${
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
