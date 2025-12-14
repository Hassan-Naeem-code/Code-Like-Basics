'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Trophy, Heart, Lightbulb, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Language } from '@/utils/techModules'
import { useXP, XP_REWARDS } from '@/hooks/useXP'
import confetti from 'canvas-confetti'

interface GameQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface UniversalGameProps {
  language: Language
  moduleId: string
  languageId: string
}

export default function UniversalGame({ language, moduleId, languageId }: UniversalGameProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [hints, setHints] = useState(2)
  const [gameOver, setGameOver] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const userCode = typeof window !== 'undefined' ? localStorage.getItem('userCode') : null
  const { awardXP } = useXP(userCode)

  // Generate questions based on language
  const questions: GameQuestion[] = generateQuestions(language.name, languageId)

  const handleAnswerSelect = async (index: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(index)
    const correct = index === questions[currentQuestion].correctAnswer

    setIsCorrect(correct)
    setShowExplanation(true)

    if (correct) {
      setScore(score + 100)
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      })
      await awardXP(XP_REWARDS.GAME_COMPLETE_LEVEL, true)
    } else {
      setLives(lives - 1)
      if (lives - 1 === 0) {
        setGameOver(true)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setIsCorrect(false)
    } else {
      setGameOver(true)
      if (lives > 0) {
        awardXP(XP_REWARDS.GAME_WIN, true)
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
        })
      }
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setLives(3)
    setHints(2)
    setGameOver(false)
    setShowExplanation(false)
    setIsCorrect(false)
  }

  const handleUseHint = () => {
    if (hints > 0 && selectedAnswer === null) {
      setHints(hints - 1)
      // Remove one wrong answer
      const correctAnswer = questions[currentQuestion].correctAnswer
      // This is a simple hint implementation
      alert(`Hint: The answer is NOT option ${correctAnswer === 0 ? 2 : 0 + 1}`)
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => router.push(`/module/${moduleId}`)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            className="flex items-center gap-2 text-white/80 hover:text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {language.name}</span>
          </motion.button>

          <div className="flex items-center gap-6">
            {/* Lives */}
            <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-lg rounded-xl px-4 py-2">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
                />
              ))}
            </div>

            {/* Hints */}
            <button
              onClick={handleUseHint}
              disabled={hints === 0 || selectedAnswer !== null}
              className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-lg rounded-xl px-4 py-2 text-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lightbulb className="w-6 h-6" />
              <span>{hints} Hints</span>
            </button>

            {/* Score */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl px-6 py-2">
              <p className="text-white font-bold text-xl">Score: {score}</p>
            </div>
          </div>
        </div>

        {/* Game Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">{language.icon}</div>
          <h1 className="text-5xl font-bold text-white mb-2">
            {language.name} Quiz Game
          </h1>
          <p className="text-white/80 text-xl">
            Test your knowledge and earn XP!
          </p>
        </motion.div>

        {!gameOver ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-semibold">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    whileHover={selectedAnswer === null ? { scale: 1.02, x: 5 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    className={`w-full p-6 rounded-2xl font-semibold text-left transition-all ${
                      selectedAnswer === null
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        : selectedAnswer === index
                        ? index === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : index === question.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-800 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      {option}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`max-w-4xl mx-auto rounded-3xl p-6 ${
                    isCorrect
                      ? 'bg-green-500/20 border-2 border-green-500'
                      : 'bg-red-500/20 border-2 border-red-500'
                  }`}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                  </h3>
                  <p className="text-white/90 text-lg mb-4">{question.explanation}</p>
                  {isCorrect && (
                    <p className="text-white font-semibold">
                      +{XP_REWARDS.GAME_COMPLETE_LEVEL} XP Earned!
                    </p>
                  )}
                  <button
                    onClick={handleNext}
                    className="mt-4 bg-white text-gray-800 px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Game'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Game Over Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white/95 backdrop-blur-lg rounded-3xl p-12 shadow-2xl text-center"
          >
            <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-6" />
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              {lives > 0 ? 'Congratulations!' : 'Game Over'}
            </h2>
            <p className="text-2xl text-gray-600 mb-8">
              Final Score: <span className="font-bold text-purple-600">{score}</span>
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-gray-600 text-sm">Questions Answered</p>
                <p className="text-3xl font-bold text-blue-600">{currentQuestion + 1}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-gray-600 text-sm">Lives Remaining</p>
                <p className="text-3xl font-bold text-green-600">{lives}</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                Play Again
              </button>
              <button
                onClick={() => router.push(`/module/${moduleId}`)}
                className="bg-gray-200 text-gray-800 px-8 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
              >
                Back to Module
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function generateQuestions(languageName: string, languageId: string): GameQuestion[] {
  // Question bank for different languages
  const questionBanks: { [key: string]: GameQuestion[] } = {
    html: [
      {
        id: 1,
        question: 'Which HTML tag is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correctAnswer: 1,
        explanation: 'The <a> tag (anchor tag) is used to create hyperlinks in HTML. The href attribute specifies the URL.',
      },
      {
        id: 2,
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
        correctAnswer: 0,
        explanation: 'HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages.',
      },
      {
        id: 3,
        question: 'Which tag is used for the largest heading?',
        options: ['<h6>', '<heading>', '<h1>', '<head>'],
        correctAnswer: 2,
        explanation: '<h1> defines the most important (largest) heading. HTML headings range from <h1> to <h6>.',
      },
    ],
    css: [
      {
        id: 1,
        question: 'Which property is used to change the background color?',
        options: ['color', 'bgcolor', 'background-color', 'bg-color'],
        correctAnswer: 2,
        explanation: 'The background-color property is used to set the background color of an element.',
      },
      {
        id: 2,
        question: 'How do you select an element with id "header"?',
        options: ['.header', '#header', '*header', 'header'],
        correctAnswer: 1,
        explanation: 'In CSS, the # symbol is used to select elements by their ID. So #header selects the element with id="header".',
      },
      {
        id: 3,
        question: 'Which property controls text size?',
        options: ['text-size', 'font-size', 'text-style', 'font-weight'],
        correctAnswer: 1,
        explanation: 'The font-size property is used to control the size of text in CSS.',
      },
    ],
    javascript: [
      {
        id: 1,
        question: 'Which keyword is used to declare a variable in JavaScript?',
        options: ['var', 'variable', 'v', 'int'],
        correctAnswer: 0,
        explanation: 'The "var", "let", and "const" keywords are used to declare variables in JavaScript. "var" is the traditional way.',
      },
      {
        id: 2,
        question: 'What is the correct syntax for a function in JavaScript?',
        options: ['function myFunc()', 'def myFunc()', 'function:myFunc()', 'func myFunc()'],
        correctAnswer: 0,
        explanation: 'Functions in JavaScript are declared using the "function" keyword followed by the function name and parentheses.',
      },
      {
        id: 3,
        question: 'How do you write a comment in JavaScript?',
        options: ['<!-- comment -->', '# comment', '// comment', '/* comment'],
        correctAnswer: 2,
        explanation: '// is used for single-line comments in JavaScript. /* */ is used for multi-line comments.',
      },
    ],
    python: [
      {
        id: 1,
        question: 'Which function is used to output text in Python?',
        options: ['echo()', 'print()', 'console.log()', 'write()'],
        correctAnswer: 1,
        explanation: 'The print() function is used to output text and values to the console in Python.',
      },
      {
        id: 2,
        question: 'How do you create a list in Python?',
        options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = <1, 2, 3>'],
        correctAnswer: 1,
        explanation: 'Lists in Python are created using square brackets []. For example: my_list = [1, 2, 3]',
      },
      {
        id: 3,
        question: 'What is the correct file extension for Python files?',
        options: ['.pyt', '.pt', '.py', '.python'],
        correctAnswer: 2,
        explanation: 'Python files use the .py extension. For example: script.py',
      },
    ],
  }

  // Return language-specific questions or generic ones
  if (questionBanks[languageId]) {
    return questionBanks[languageId]
  }

  // Generic questions
  return [
    {
      id: 1,
      question: `What is the primary use of ${languageName}?`,
      options: [
        'Building applications',
        'Creating databases',
        'Designing graphics',
        'Writing documentation',
      ],
      correctAnswer: 0,
      explanation: `${languageName} is primarily used for building applications and software solutions.`,
    },
    {
      id: 2,
      question: `Which of these is a key feature of ${languageName}?`,
      options: [
        'Strong typing',
        'Dynamic features',
        'Cross-platform support',
        'All of the above',
      ],
      correctAnswer: 3,
      explanation: `${languageName} typically offers multiple features including type systems, dynamic capabilities, and cross-platform support.`,
    },
    {
      id: 3,
      question: `What skill level is ${languageName} best suited for?`,
      options: [
        'Beginners only',
        'Experts only',
        'All skill levels',
        'None of the above',
      ],
      correctAnswer: 2,
      explanation: `${languageName} can be learned and used effectively by developers at all skill levels.`,
    },
  ]
}
