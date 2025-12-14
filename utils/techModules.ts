export interface Language {
  id: string
  name: string
  icon: string
  color: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface Module {
  id: string
  name: string
  description: string
  icon: string
  color: string
  gradient: string
  languages: Language[]
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  modules: Module[]
}

// Main Technology Category with all modules
export const TECHNOLOGY_MODULES: Module[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Build amazing websites and web applications',
    icon: '🌐',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-700',
    languages: [
      {
        id: 'html',
        name: 'HTML',
        icon: '📄',
        color: '#E34F26',
        description: 'Structure your web pages with HTML',
        difficulty: 'beginner',
      },
      {
        id: 'css',
        name: 'CSS',
        icon: '🎨',
        color: '#1572B6',
        description: 'Style your websites beautifully',
        difficulty: 'beginner',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        icon: '⚡',
        color: '#F7DF1E',
        description: 'Make your websites interactive',
        difficulty: 'beginner',
      },
      {
        id: 'react',
        name: 'React',
        icon: '⚛️',
        color: '#61DAFB',
        description: 'Build modern UI components',
        difficulty: 'intermediate',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        icon: '🔷',
        color: '#3178C6',
        description: 'JavaScript with type safety',
        difficulty: 'intermediate',
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        icon: '▲',
        color: '#000000',
        description: 'Full-stack React framework',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'mobile-development',
    name: 'Mobile App Development',
    description: 'Create native and cross-platform mobile apps',
    icon: '📱',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-700',
    languages: [
      {
        id: 'react-native',
        name: 'React Native',
        icon: '📱',
        color: '#61DAFB',
        description: 'Build mobile apps with React',
        difficulty: 'intermediate',
      },
      {
        id: 'flutter',
        name: 'Flutter',
        icon: '🐦',
        color: '#02569B',
        description: 'Cross-platform apps with Dart',
        difficulty: 'intermediate',
      },
      {
        id: 'swift',
        name: 'Swift',
        icon: '🍎',
        color: '#FA7343',
        description: 'Native iOS development',
        difficulty: 'intermediate',
      },
      {
        id: 'kotlin',
        name: 'Kotlin',
        icon: '🤖',
        color: '#7F52FF',
        description: 'Modern Android development',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Analyze data and extract insights',
    icon: '📊',
    color: '#F59E0B',
    gradient: 'from-orange-500 to-amber-700',
    languages: [
      {
        id: 'python',
        name: 'Python',
        icon: '🐍',
        color: '#3776AB',
        description: 'Most popular data science language',
        difficulty: 'beginner',
      },
      {
        id: 'r',
        name: 'R',
        icon: '📈',
        color: '#276DC3',
        description: 'Statistical computing language',
        difficulty: 'intermediate',
      },
      {
        id: 'sql',
        name: 'SQL',
        icon: '🗄️',
        color: '#4479A1',
        description: 'Query and manage databases',
        difficulty: 'beginner',
      },
      {
        id: 'pandas',
        name: 'Pandas',
        icon: '🐼',
        color: '#150458',
        description: 'Data manipulation in Python',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Build intelligent systems and AI models',
    icon: '🤖',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-700',
    languages: [
      {
        id: 'python-ml',
        name: 'Python (ML)',
        icon: '🐍',
        color: '#3776AB',
        description: 'ML with Python libraries',
        difficulty: 'intermediate',
      },
      {
        id: 'tensorflow',
        name: 'TensorFlow',
        icon: '🧠',
        color: '#FF6F00',
        description: 'Deep learning framework',
        difficulty: 'advanced',
      },
      {
        id: 'pytorch',
        name: 'PyTorch',
        icon: '🔥',
        color: '#EE4C2C',
        description: 'Research-focused deep learning',
        difficulty: 'advanced',
      },
      {
        id: 'scikit-learn',
        name: 'Scikit-learn',
        icon: '📚',
        color: '#F7931E',
        description: 'Classical machine learning',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'game-development',
    name: 'Game Development',
    description: 'Create engaging games and interactive experiences',
    icon: '🎮',
    color: '#9333EA',
    gradient: 'from-purple-600 to-violet-800',
    languages: [
      {
        id: 'unity-csharp',
        name: 'Unity (C#)',
        icon: '🎯',
        color: '#000000',
        description: '3D/2D game development',
        difficulty: 'intermediate',
      },
      {
        id: 'unreal',
        name: 'Unreal Engine',
        icon: '🎬',
        color: '#0E1128',
        description: 'AAA game development',
        difficulty: 'advanced',
      },
      {
        id: 'godot',
        name: 'Godot',
        icon: '🎪',
        color: '#478CBF',
        description: 'Open-source game engine',
        difficulty: 'beginner',
      },
      {
        id: 'javascript-games',
        name: 'JavaScript Games',
        icon: '🕹️',
        color: '#F7DF1E',
        description: 'Browser-based games',
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'backend-development',
    name: 'Backend Development',
    description: 'Build servers, APIs, and backend systems',
    icon: '⚙️',
    color: '#0EA5E9',
    gradient: 'from-sky-500 to-blue-700',
    languages: [
      {
        id: 'nodejs',
        name: 'Node.js',
        icon: '🟢',
        color: '#339933',
        description: 'JavaScript on the server',
        difficulty: 'beginner',
      },
      {
        id: 'python-backend',
        name: 'Python (Backend)',
        icon: '🐍',
        color: '#3776AB',
        description: 'Django, Flask, FastAPI',
        difficulty: 'beginner',
      },
      {
        id: 'java',
        name: 'Java',
        icon: '☕',
        color: '#007396',
        description: 'Enterprise backend development',
        difficulty: 'intermediate',
      },
      {
        id: 'go',
        name: 'Go',
        icon: '🐹',
        color: '#00ADD8',
        description: 'Fast and efficient backend',
        difficulty: 'intermediate',
      },
      {
        id: 'rust',
        name: 'Rust',
        icon: '🦀',
        color: '#CE412B',
        description: 'Systems programming',
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    description: 'Deploy, monitor, and scale applications',
    icon: '☁️',
    color: '#14B8A6',
    gradient: 'from-teal-500 to-cyan-700',
    languages: [
      {
        id: 'docker',
        name: 'Docker',
        icon: '🐳',
        color: '#2496ED',
        description: 'Containerization platform',
        difficulty: 'intermediate',
      },
      {
        id: 'kubernetes',
        name: 'Kubernetes',
        icon: '☸️',
        color: '#326CE5',
        description: 'Container orchestration',
        difficulty: 'advanced',
      },
      {
        id: 'aws',
        name: 'AWS',
        icon: '☁️',
        color: '#FF9900',
        description: 'Amazon cloud services',
        difficulty: 'intermediate',
      },
      {
        id: 'terraform',
        name: 'Terraform',
        icon: '🏗️',
        color: '#7B42BC',
        description: 'Infrastructure as code',
        difficulty: 'intermediate',
      },
      {
        id: 'github-actions',
        name: 'GitHub Actions',
        icon: '⚡',
        color: '#2088FF',
        description: 'CI/CD automation',
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Protect systems and learn ethical hacking',
    icon: '🔒',
    color: '#DC2626',
    gradient: 'from-red-600 to-rose-800',
    languages: [
      {
        id: 'penetration-testing',
        name: 'Penetration Testing',
        icon: '🎯',
        color: '#EF4444',
        description: 'Ethical hacking basics',
        difficulty: 'intermediate',
      },
      {
        id: 'network-security',
        name: 'Network Security',
        icon: '🌐',
        color: '#DC2626',
        description: 'Secure network protocols',
        difficulty: 'intermediate',
      },
      {
        id: 'cryptography',
        name: 'Cryptography',
        icon: '🔐',
        color: '#991B1B',
        description: 'Encryption and security',
        difficulty: 'advanced',
      },
      {
        id: 'security-tools',
        name: 'Security Tools',
        icon: '🛡️',
        color: '#B91C1C',
        description: 'Kali Linux, Metasploit, etc.',
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'blockchain',
    name: 'Blockchain & Web3',
    description: 'Build decentralized applications',
    icon: '⛓️',
    color: '#7C3AED',
    gradient: 'from-violet-600 to-purple-800',
    languages: [
      {
        id: 'solidity',
        name: 'Solidity',
        icon: '💎',
        color: '#363636',
        description: 'Ethereum smart contracts',
        difficulty: 'advanced',
      },
      {
        id: 'web3js',
        name: 'Web3.js',
        icon: '🌐',
        color: '#F16822',
        description: 'Interact with blockchain',
        difficulty: 'intermediate',
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        icon: '◆',
        color: '#627EEA',
        description: 'Blockchain fundamentals',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'database',
    name: 'Database Management',
    description: 'Design and manage databases',
    icon: '🗄️',
    color: '#059669',
    gradient: 'from-emerald-600 to-green-800',
    languages: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        icon: '🐘',
        color: '#336791',
        description: 'Advanced relational database',
        difficulty: 'beginner',
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        icon: '🍃',
        color: '#47A248',
        description: 'NoSQL document database',
        difficulty: 'beginner',
      },
      {
        id: 'redis',
        name: 'Redis',
        icon: '🔴',
        color: '#DC382D',
        description: 'In-memory data store',
        difficulty: 'intermediate',
      },
      {
        id: 'firebase',
        name: 'Firebase',
        icon: '🔥',
        color: '#FFCA28',
        description: 'Real-time database',
        difficulty: 'beginner',
      },
    ],
  },
]

export const getModuleById = (id: string): Module | undefined => {
  return TECHNOLOGY_MODULES.find((module) => module.id === id)
}

export const getLanguageByModuleAndId = (
  moduleId: string,
  languageId: string
): Language | undefined => {
  const module = getModuleById(moduleId)
  return module?.languages.find((lang) => lang.id === languageId)
}

export const getAllLanguages = (): Language[] => {
  return TECHNOLOGY_MODULES.flatMap((module) => module.languages)
}
