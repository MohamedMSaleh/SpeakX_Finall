import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, GlowingOrb } from '../components/DecorativeElements';
import { PopIn } from '../components/MicroInteractions';
import { colors } from '../styles/designSystem';
import { useIsMobile } from '../utils/responsive';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'grammar' | 'vocabulary' | 'pronunciation' | 'fluency';
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'She ___ to school every day.',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 1,
    explanation: 'For third person singular (he, she, it), we add "s" to the verb in present simple tense.',
    category: 'grammar'
  },
  {
    id: 2,
    question: 'Which word is a synonym for "happy"?',
    options: ['Sad', 'Joyful', 'Angry', 'Tired'],
    correctAnswer: 1,
    explanation: '"Joyful" means feeling great happiness and is a perfect synonym for "happy".',
    category: 'vocabulary'
  },
  {
    id: 3,
    question: 'I ___ watching a movie right now.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 0,
    explanation: 'For "I" in present continuous tense, we use "am" followed by verb+ing.',
    category: 'grammar'
  },
  {
    id: 4,
    question: 'Choose the opposite of "difficult".',
    options: ['Hard', 'Easy', 'Complex', 'Tough'],
    correctAnswer: 1,
    explanation: '"Easy" is the antonym (opposite) of "difficult".',
    category: 'vocabulary'
  },
  {
    id: 5,
    question: 'They ___ finished their homework yesterday.',
    options: ['has', 'have', 'had', 'having'],
    correctAnswer: 1,
    explanation: 'For plural subjects (they) in present perfect, we use "have" + past participle.',
    category: 'grammar'
  }
];

const QuickQuiz: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const isMobile = useIsMobile();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'grammar': return { bg: 'from-blue-500 to-indigo-600', text: 'text-blue-600', light: 'bg-blue-50' };
      case 'vocabulary': return { bg: 'from-purple-500 to-pink-600', text: 'text-purple-600', light: 'bg-purple-50' };
      case 'pronunciation': return { bg: 'from-green-500 to-emerald-600', text: 'text-green-600', light: 'bg-green-50' };
      case 'fluency': return { bg: 'from-orange-500 to-amber-600', text: 'text-orange-600', light: 'bg-orange-50' };
      default: return { bg: 'from-gray-500 to-gray-600', text: 'text-gray-600', light: 'bg-gray-50' };
    }
  };

  const categoryStyle = getCategoryColor(question?.category || 'grammar');

  if (isComplete) {
    const percentage = (score / quizQuestions.length) * 100;
    const isPerfect = percentage === 100;
    const isGreat = percentage >= 80;
    const isGood = percentage >= 60;

    return (
      <div className="h-full overflow-y-auto relative">
        <GradientBackground variant="success" className="min-h-full">
          <div className="relative z-10 p-6 md:p-8 pb-24 md:pb-8">
            
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setView(View.DASHBOARD)}
                className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <Icons.ArrowLeft size={isMobile ? 20 : 24} className="text-gray-700" />
              </button>
              <h1 className="text-xl md:text-2xl font-black text-gray-900">Quiz Complete! 🎉</h1>
              <div className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            <PopIn delay={0}>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-emerald-100 relative overflow-hidden">
                  <GlowingOrb color={colors.secondary.success} size={200} className="-right-20 -top-20" />
                  
                  <div className="relative z-10 text-center">
                    <div className="mb-8">
                      <div className="text-6xl md:text-8xl font-black mb-4">
                        {isPerfect && '🏆'}
                        {isGreat && !isPerfect && '🌟'}
                        {isGood && !isGreat && '👏'}
                        {!isGood && '💪'}
                      </div>
                      <div className="text-5xl md:text-7xl font-black gradient-text mb-2">
                        {score}/{quizQuestions.length}
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-gray-600">
                        {percentage}% Correct
                      </div>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                        {isPerfect && 'Perfect Score! Outstanding! 🎊'}
                        {isGreat && !isPerfect && 'Excellent Work! 🌟'}
                        {isGood && !isGreat && 'Great Job! Keep It Up! 👏'}
                        {!isGood && 'Keep Practicing! You Can Do This! 💪'}
                      </h2>
                      <p className="text-base md:text-lg text-gray-600 font-medium">
                        {isPerfect && 'You mastered this quiz! Absolutely brilliant!'}
                        {isGreat && !isPerfect && "You're doing fantastic! Just a bit more to perfect!"}
                        {isGood && !isGreat && "Good progress! Review the explanations to improve."}
                        {!isGood && "Don't worry! Every mistake is a step toward mastery."}
                      </p>
                    </div>

                    <div className="mb-8">
                      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${
                            isPerfect ? 'from-emerald-400 to-emerald-600' :
                            isGreat ? 'from-blue-400 to-blue-600' :
                            isGood ? 'from-amber-400 to-amber-600' :
                            'from-gray-400 to-gray-600'
                          } transition-all duration-1000`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={handleRestart}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-black text-base md:text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 min-h-[56px]"
                      >
                        <Icons.RefreshCw size={20} className="inline mr-2" />
                        Try Again
                      </button>
                      <button
                        onClick={() => setView(View.DASHBOARD)}
                        className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-black text-base md:text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 min-h-[56px]"
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </PopIn>
          </div>
        </GradientBackground>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto relative">
      <GradientBackground variant="primary" className="min-h-full">
        <div className="relative z-10 p-6 md:p-8 pb-24 md:pb-8">
          
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => setView(View.DASHBOARD)}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <Icons.ArrowLeft size={isMobile ? 20 : 24} className="text-gray-700" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2 rounded-xl shadow-lg">
                <span className="text-sm md:text-base font-black text-gray-700">
                  {currentQuestion + 1}/{quizQuestions.length}
                </span>
              </div>
              <div className="bg-white px-4 py-2 rounded-xl shadow-lg">
                <span className="text-sm md:text-base font-black text-emerald-600">
                  🏆 {score}
                </span>
              </div>
            </div>
          </div>

          <PopIn delay={0}>
            <div className="mb-8">
              <div className="h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </PopIn>

          <PopIn delay={100}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-blue-100 mb-6 relative overflow-hidden">
                <GlowingOrb color={colors.primary.blue} size={150} className="-right-16 -top-16" />
                
                <div className="relative z-10 mb-6">
                  <span className={`inline-block px-4 py-2 rounded-full text-xs md:text-sm font-black uppercase tracking-wider ${categoryStyle.light} ${categoryStyle.text}`}>
                    {question.category}
                  </span>
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 leading-tight">
                    {question.question}
                  </h2>

                  <div className="space-y-3 md:space-y-4">
                    {question.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === question.correctAnswer;
                      const showCorrect = showExplanation && isCorrect;
                      const showWrong = showExplanation && isSelected && !isCorrect;

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showExplanation}
                          className={`w-full p-4 md:p-5 rounded-2xl font-bold text-left text-base md:text-lg transition-all duration-300 border-2 min-h-[64px] ${
                            showCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg'
                              : showWrong
                              ? 'bg-red-50 border-red-500 text-red-700 shadow-lg'
                              : isSelected
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-md scale-[1.02]'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50/50 active:scale-95'
                          } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showCorrect && <Icons.CheckCircle size={24} className="text-emerald-600" />}
                            {showWrong && <Icons.X size={24} className="text-red-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {showExplanation && (
                <PopIn delay={0}>
                  <div className={`rounded-2xl p-6 mb-6 border-2 ${
                    selectedAnswer === question.correctAnswer
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        selectedAnswer === question.correctAnswer
                          ? 'bg-emerald-500'
                          : 'bg-amber-500'
                      }`}>
                        {selectedAnswer === question.correctAnswer ? (
                          <Icons.CheckCircle size={20} className="text-white" />
                        ) : (
                          <Icons.Lightbulb size={20} className="text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 mb-2 text-lg">
                          {selectedAnswer === question.correctAnswer ? 'Correct! 🎉' : 'Not quite! 💡'}
                        </h3>
                        <p className="text-gray-700 font-medium leading-relaxed">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </PopIn>
              )}

              {!showExplanation ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className={`w-full py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl transition-all shadow-xl min-h-[64px] ${
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-95'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 min-h-[64px]"
                >
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>Next Question <Icons.ArrowRight size={24} className="inline ml-2" /></>
                  ) : (
                    <>See Results 🎊</>
                  )}
                </button>
              )}
            </div>
          </PopIn>

        </div>
      </GradientBackground>
    </div>
  );
};

export default QuickQuiz;
