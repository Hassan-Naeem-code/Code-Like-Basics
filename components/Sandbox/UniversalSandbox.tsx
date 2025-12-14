'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, RotateCcw, Save, Download, Code2, Terminal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Language } from '@/utils/techModules'
import { useXP, XP_REWARDS } from '@/hooks/useXP'

interface UniversalSandboxProps {
  language: Language
  moduleId: string
  languageId: string
}

const STARTER_CODE: { [key: string]: string } = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Start building your webpage here.</p>
</body>
</html>`,
  css: `/* Add your CSS styles here */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}`,
  javascript: `// Write your JavaScript code here
console.log("Hello, World!");

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Learner"));`,
  python: `# Write your Python code here
print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("Learner"))`,
  react: `import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`,
}

export default function UniversalSandbox({ language, moduleId, languageId }: UniversalSandboxProps) {
  const router = useRouter()
  const [code, setCode] = useState(
    STARTER_CODE[languageId] || `// ${language.name} Sandbox\n// Write your ${language.name} code here\n\nconsole.log("Hello from ${language.name}!");`
  )
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const userCode = typeof window !== 'undefined' ? localStorage.getItem('userCode') : null
  const { awardXP } = useXP(userCode)

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('// Running code...\n')

    await awardXP(XP_REWARDS.SANDBOX_EXECUTE, false)

    // Simulate code execution
    setTimeout(() => {
      const simulatedOutput = `// Code executed successfully!\n// Language: ${language.name}\n// Lines of code: ${(code || '').split('\n').length}\n\n// Output:\n${getSimulatedOutput(languageId, code || '')}\n\n// This is a simulated execution environment.\n// In a production app, this would connect to a real code execution service.`

      setOutput(simulatedOutput)
      setIsRunning(false)
    }, 1000)
  }

  const handleReset = () => {
    setCode(
      STARTER_CODE[languageId] || `// ${language.name} Sandbox\n// Write your ${language.name} code here\n\nconsole.log("Hello from ${language.name}!");`
    )
    setOutput('')
  }

  const handleSave = () => {
    localStorage.setItem(`sandbox-${moduleId}-${languageId}`, code)
    alert('Code saved to browser storage!')
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([code], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${languageId}-code.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pb-10">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3">
            <div className="text-5xl">{language.icon}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{language.name} Sandbox</h1>
              <p className="text-white/70">Code, Run, Learn</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50"
            >
              <Play className="w-5 h-5" />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-3 rounded-xl hover:bg-blue-500/30 transition-all"
            >
              <Save className="w-5 h-5" />
              Save
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-3 rounded-xl hover:bg-purple-500/30 transition-all"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>
        </div>

        {/* Editor and Output */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gray-800 px-6 py-3 flex items-center gap-2 border-b border-gray-700">
              <Code2 className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">Code Editor</span>
              <span className="ml-auto text-gray-400 text-sm">
                {code.split('\n').length} lines
              </span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[600px] bg-gray-900 text-green-400 font-mono text-sm p-6 focus:outline-none resize-none"
              spellCheck={false}
              placeholder={`Write your ${language.name} code here...`}
            />
          </div>

          {/* Output Panel */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gray-800 px-6 py-3 flex items-center gap-2 border-b border-gray-700">
              <Terminal className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">Output</span>
              {isRunning && (
                <span className="ml-auto text-yellow-400 text-sm animate-pulse">
                  Executing...
                </span>
              )}
            </div>
            <div className="w-full h-[600px] bg-gray-900 text-gray-300 font-mono text-sm p-6 overflow-auto whitespace-pre-wrap">
              {output || '// Click "Run Code" to see the output here...'}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6"
        >
          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div>
              <h3 className="font-bold text-lg mb-2">🎯 Experiment Freely</h3>
              <p className="text-white/80 text-sm">
                Try different {language.name} syntax and see instant results. No setup required!
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">💾 Save Your Work</h3>
              <p className="text-white/80 text-sm">
                Save your code to browser storage or download it to your computer.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">⭐ Earn XP</h3>
              <p className="text-white/80 text-sm">
                Every time you run code, you earn {XP_REWARDS.SANDBOX_EXECUTE} XP. Keep experimenting!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function getSimulatedOutput(languageId: string, _code?: string): string {
  void _code
  // Simulate different outputs based on language
  const outputs: { [key: string]: string } = {
    javascript: '"Hello, World!"\n"Hello, Learner!"',
    python: 'Hello, World!\nHello, Learner!',
    html: 'Rendered HTML page (This would show in a preview window)',
    css: 'Styles applied successfully!',
    react: 'React component rendered successfully!',
  }

  return outputs[languageId] || 'Code executed successfully!\n> Output would appear here in a real execution environment.'
}
