// Clean, typed tutorial content generator

export interface TutorialSection {
  id: string
  title: string
  content: string
  syntax: string
  usage: string
  codeExample: string
}

export interface Tutorial {
  title: string
  description: string
  icon: string
  sections: TutorialSection[]
}

// Public API expected by app/tutorial/[tutorialId]/page.tsx
export function generateComprehensiveTutorial(
  languageId: string,
  languageName: string,
  icon: string,
  description: string
): Tutorial {
  const type = detectLanguageType(languageId)
  const sections = generateSections(languageId, languageName, type)

  return {
    title: `Master ${languageName}`,
    description: description || `Complete ${languageName} tutorial from basics to a mini project`,
    icon,
    sections,
  }
}

// --- Internal helpers ---

type LanguageType =
  | 'markup'
  | 'styling'
  | 'scripting'
  | 'framework'
  | 'mobile'
  | 'backend'
  | 'database'
  | 'ml'
  | 'devops'
  | 'blockchain'
  | 'general'

function detectLanguageType(languageId: string): LanguageType {
  const id = languageId.toLowerCase()
  if (/(html)/.test(id)) return 'markup'
  if (/(css|tailwind)/.test(id)) return 'styling'
  if (/(javascript|typescript|node)/.test(id)) return 'scripting'
  if (/(react|next|vue|angular)/.test(id)) return 'framework'
  if (/(react-native|flutter|swift|kotlin)/.test(id)) return 'mobile'
  if (/(python-backend|nodejs|java-backend|go-backend|rust-backend)/.test(id)) return 'backend'
  if (/(sql|postgres|postgresql|mongodb|redis|firebase-db|database)/.test(id)) return 'database'
  if (/(tensorflow|pytorch|scikit|sklearn|python-ml|ai-ml|ml)/.test(id)) return 'ml'
  if (/(docker|kubernetes|terraform|aws|github-actions|devops)/.test(id)) return 'devops'
  if (/(solidity|web3|ethereum|blockchain)/.test(id)) return 'blockchain'
  return 'general'
}

function generateSections(languageId: string, languageName: string, type: LanguageType): TutorialSection[] {
  switch (type) {
    case 'database':
      return generateDatabaseSections(languageId, languageName)
    case 'ml':
      return generateMLSections(languageId, languageName)
    case 'devops':
      return generateDevOpsSections(languageId, languageName)
    case 'blockchain':
      return generateBlockchainSections(languageId, languageName)
    case 'framework':
      return generateFrameworkSections(languageId, languageName)
    case 'mobile':
      return generateMobileSections(languageId, languageName)
    case 'backend':
      return generateBackendSections(languageId, languageName)
    default:
      return generateGeneralSections(languageName)
  }
}

// General purpose path: keep concise but complete
function generateGeneralSections(lang: string): TutorialSection[] {
  return [
    { id: '1', title: `Introduction to ${lang}`, content: `What ${lang} is used for and where it shines.`, syntax: 'Overview', usage: 'Understand goals', codeExample: `// Welcome to ${lang}\n// You will learn by building step-by-step.` },
    { id: '2', title: 'Setup', content: 'Install tools and create your first file/project.', syntax: 'Install + Init', usage: 'Get ready to code', codeExample: 'mkdir hello && cd hello\necho "print(\"Hello\")" > main.py' },
    { id: '3', title: 'Variables & Types', content: 'Store values and basic types.', syntax: 'number, string, boolean', usage: 'Keep state', codeExample: 'let score = 42;\nconst name = "Alice";\nconst ok = true;' },
    { id: '4', title: 'Control Flow', content: 'If/else and loops.', syntax: 'if, for/while', usage: 'Branching and repetition', codeExample: 'for (let i = 0; i < 3; i++) {\n  console.log(i)\n}' },
    { id: '5', title: 'Functions', content: 'Reusable logic with parameters and returns.', syntax: 'function fn(params) => result', usage: 'Organize code', codeExample: 'function greet(who){ return `Hello, ${who}` }\nconsole.log(greet("World"))' },
    { id: '6', title: 'Collections', content: 'Lists/arrays and maps/dicts.', syntax: '[], {}', usage: 'Handle groups of data', codeExample: 'const nums = [1,2,3];\nconst user = { name: "Alice", age: 25 }' },
    { id: '7', title: 'OOP Basics', content: 'Classes and objects.', syntax: 'class, constructor, method', usage: 'Model real things', codeExample: 'class Person { constructor(name){ this.name = name } }\nconsole.log(new Person("Bob"))' },
    { id: '8', title: 'Files & Modules', content: 'Read/write files and split code into modules.', syntax: 'fs/readFile, export/import', usage: 'Persistence and structure', codeExample: '// file utils.js\nexport const add = (a,b)=>a+b\n// file app.js\nimport { add } from "./utils.js"' },
    { id: '9', title: 'Error Handling', content: 'Try/catch and graceful failures.', syntax: 'try { ... } catch (e) { ... }', usage: 'Robust programs', codeExample: 'try { JSON.parse("bad") } catch(e){ console.error("Oops", e.message) }' },
    { id: '10', title: 'Testing', content: 'Write simple tests.', syntax: 'assert/expect', usage: 'Prevent regressions', codeExample: 'function add(a,b){return a+b}\nconsole.assert(add(2,3)===5)' },
    { id: '11', title: 'Async Basics', content: 'Promises/async-await or callbacks.', syntax: 'async/await', usage: 'I/O and waiting', codeExample: 'const wait = (ms)=>new Promise(r=>setTimeout(r,ms))\n(async()=>{ await wait(100); console.log("done") })()' },
    { id: '12', title: 'Mini Project', content: 'Tie it all together in a small app.', syntax: 'N/A', usage: 'Apply concepts end-to-end', codeExample: '// Build a CLI or web page using the above pieces.' },
  ]
}

// Database path (SQL & NoSQL). Keep SQL features neutral if ID doesn’t specify engine
function generateDatabaseSections(languageId: string, lang: string): TutorialSection[] {
  const isSQL = /(sql|postgres|postgresql)/.test(languageId.toLowerCase())
  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} overview and when to use it.`, syntax: 'Tables/Collections', usage: 'Store and query data', codeExample: isSQL ? 'SELECT version();' : 'db.stats()' },
    { id: '2', title: 'Setup & Connect', content: 'Install, run server, and connect.', syntax: 'Connection string', usage: 'Talk to database', codeExample: isSQL ? 'psql postgresql://user:pass@localhost:5432/app' : 'mongo mongodb://localhost:27017/app' },
    { id: '3', title: 'Create Schema', content: 'Create tables/collections with fields and constraints.', syntax: isSQL ? 'CREATE TABLE' : 'createCollection', usage: 'Structure data', codeExample: isSQL ? 'CREATE TABLE users(id SERIAL PRIMARY KEY, email TEXT UNIQUE, age INT);' : 'db.createCollection("users")' },
    { id: '4', title: 'CRUD - Insert', content: 'Add new records/documents.', syntax: isSQL ? 'INSERT' : 'insertOne', usage: 'Write data', codeExample: isSQL ? "INSERT INTO users(email,age) VALUES('a@b.com', 30);" : 'db.users.insertOne({email:"a@b.com", age:30})' },
    { id: '5', title: 'CRUD - Read', content: 'Query and filter.', syntax: isSQL ? 'SELECT ... WHERE' : 'find({ filter })', usage: 'Read data', codeExample: isSQL ? 'SELECT id,email FROM users WHERE age >= 21;' : 'db.users.find({ age: { $gte: 21 } }, { email: 1 })' },
    { id: '6', title: 'CRUD - Update/Delete', content: 'Modify or remove data.', syntax: isSQL ? 'UPDATE / DELETE' : 'updateOne / deleteOne', usage: 'Maintain data', codeExample: isSQL ? "UPDATE users SET age=31 WHERE email='a@b.com';" : 'db.users.updateOne({email:"a@b.com"}, {$set:{age:31}})' },
    { id: '7', title: isSQL ? 'Joins & Relationships' : 'Lookup & References', content: 'Combine related data.', syntax: isSQL ? 'JOIN' : '$lookup', usage: 'Query relations', codeExample: isSQL ? 'SELECT o.id,u.email FROM orders o JOIN users u ON o.user_id=u.id;' : 'db.orders.aggregate([{ $lookup:{ from:"users", localField:"userId", foreignField:"_id", as:"user"}}])' },
    { id: '8', title: 'Indexes', content: 'Speed up queries with indexes.', syntax: isSQL ? 'CREATE INDEX' : 'createIndex', usage: 'Performance', codeExample: isSQL ? 'CREATE INDEX idx_users_email ON users(email);' : 'db.users.createIndex({ email: 1 }, { unique: true })' },
    { id: '9', title: 'Transactions', content: 'Atomic multi-write operations (if supported).', syntax: isSQL ? 'BEGIN/COMMIT/ROLLBACK' : 'session.startTransaction()', usage: 'Consistency', codeExample: isSQL ? 'BEGIN; UPDATE accounts SET balance=balance-100 WHERE id=1; UPDATE accounts SET balance=balance+100 WHERE id=2; COMMIT;' : '// start session + transaction, then commit/abort' },
    { id: '10', title: 'Aggregations', content: 'Grouping and analytics.', syntax: isSQL ? 'GROUP BY, window functions' : 'aggregate pipeline', usage: 'Reports', codeExample: isSQL ? 'SELECT country, COUNT(*) FROM users GROUP BY country;' : 'db.users.aggregate([{ $group: { _id: "$country", total: { $sum: 1 } } }])' },
    { id: '11', title: 'Security', content: 'Least privilege and parameterized queries.', syntax: 'Roles / Prepared statements', usage: 'Protect data', codeExample: isSQL ? 'GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;' : 'db.createUser({user:"reader", pwd:"pwd", roles:[{role:"read", db:"app"}]})' },
    { id: '12', title: 'Backups & Performance', content: 'Backups, restores, and query plans.', syntax: 'dump/restore, EXPLAIN', usage: 'Reliability & speed', codeExample: isSQL ? 'EXPLAIN ANALYZE SELECT * FROM users WHERE email = \"a@b.com\";' : 'db.users.find({ email: \"a@b.com\" }).explain("executionStats")' },
    { id: '13', title: 'Mini Project', content: 'Design schema and build a tiny report API.', syntax: 'N/A', usage: 'Apply skills', codeExample: '// Build /users and /reports endpoints using the above.' },
  ]
}

// ML path: ensure Python basics first for Python ML
function generateMLSections(languageId: string, lang: string): TutorialSection[] {
  const id = languageId.toLowerCase()
  const isPyTorch = /pytorch/.test(id)
  const isTF = /(tensorflow|tf)/.test(id)
  const isSk = /(scikit|sklearn)/.test(id)
  const usesPython = /(python|tensorflow|pytorch|scikit|sklearn)/.test(id)

  const importLine = isPyTorch
    ? 'import torch\nimport torch.nn as nn\nimport torch.optim as optim'
    : isTF
      ? 'import tensorflow as tf'
      : 'import numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression'

  const sections: TutorialSection[] = [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} overview: you will start with Python basics, then ML.`, syntax: 'Python + ML libs', usage: 'Train and evaluate models', codeExample: importLine },
    { id: '2', title: 'Environment Setup', content: 'Create venv and install libraries.', syntax: 'venv + pip', usage: 'Isolate dependencies', codeExample: 'python -m venv venv\nsource venv/bin/activate\npip install numpy pandas scikit-learn matplotlib' },
    { id: '3', title: 'Python Basics: Variables & Types', content: 'Numbers, strings, booleans, lists, dicts.', syntax: 'name = "Alice"; age = 30', usage: 'Manipulate data', codeExample: 'name = "Alice"\nage = 30\nnums = [1,2,3]\nuser = {"name": name, "age": age}' },
    { id: '4', title: 'Control Flow & Functions', content: 'If/else, loops, and functions.', syntax: 'if, for, def', usage: 'Encapsulate logic', codeExample: 'def normalize(xs):\n    s = sum(xs)\n    return [x/s for x in xs]\nprint(normalize([1,2,3]))' },
    { id: '5', title: 'NumPy Essentials', content: 'ndarray, shapes, vectorized ops.', syntax: 'np.array, mean, dot', usage: 'Fast math', codeExample: 'import numpy as np\nX = np.array([[1,2],[3,4]])\nprint(X.mean())' },
    { id: '6', title: 'pandas Basics', content: 'Load CSV, inspect, filter.', syntax: 'pd.read_csv, df.head()', usage: 'Prep data', codeExample: 'import pandas as pd\ndf = pd.read_csv("data.csv")\nprint(df.head())' },
    { id: '7', title: 'Train/Test Split', content: 'Split data for fair evaluation.', syntax: 'train_test_split', usage: 'Avoid overfitting', codeExample: 'from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)' },
    { id: '8', title: 'Baseline Regression', content: 'Fit a simple regressor.', syntax: 'LinearRegression', usage: 'Predict numbers', codeExample: 'from sklearn.linear_model import LinearRegression\nmodel = LinearRegression().fit(X_train, y_train)' },
    { id: '9', title: 'Classification Intro', content: 'Logistic regression or simple NN.', syntax: isTF || isPyTorch ? 'Dense layer + Sigmoid' : 'LogisticRegression', usage: 'Predict classes', codeExample: isPyTorch ? 'model = nn.Sequential(nn.Linear(2,1), nn.Sigmoid())' : isTF ? 'model = tf.keras.Sequential([tf.keras.layers.Dense(1, activation="sigmoid")])' : 'from sklearn.linear_model import LogisticRegression\nclf = LogisticRegression().fit(X_train, y_train)' },
    { id: '10', title: 'Evaluation Metrics', content: 'Accuracy, F1, RMSE for regression.', syntax: 'accuracy_score, classification_report', usage: 'Measure quality', codeExample: 'from sklearn.metrics import accuracy_score, classification_report\ny_pred = clf.predict(X_test)\nprint(accuracy_score(y_test, y_pred))' },
    { id: '11', title: 'Save & Load Models', content: 'Persist trained models.', syntax: 'joblib / tf/pytorch save', usage: 'Reuse models', codeExample: isPyTorch ? 'torch.save(model.state_dict(), "model.pt")' : isTF ? 'model.save("./model")' : 'import joblib\njoblib.dump(model, "model.joblib")' },
    { id: '12', title: 'Mini Project', content: 'Train a small model and evaluate properly.', syntax: 'N/A', usage: 'Apply pipeline', codeExample: '# Combine steps: load → split → train → eval → save' },
  ]

  return usesPython ? sections : sections.slice(0, 1) // If non-Python ML id, keep generic
}

function generateDevOpsSections(languageId: string, lang: string): TutorialSection[] {
  return [
    { id: '1', title: `Introduction to ${lang}`, content: 'DevOps overview: build, ship, run.', syntax: 'Pipelines & infra as code', usage: 'Automate delivery', codeExample: '# DevOps brings dev and ops together' },
    { id: '2', title: 'Dockerfile Basics', content: 'Build container images.', syntax: 'FROM, COPY, RUN, CMD', usage: 'Containerize apps', codeExample: 'FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm ci\nCMD ["npm","start"]' },
    { id: '3', title: 'Compose / Local Orchestration', content: 'Run multi-service apps locally.', syntax: 'docker compose', usage: 'Dev environment', codeExample: 'services:\n  web:\n    build: .\n    ports: ["3000:3000"]\n  db:\n    image: postgres:16' },
    { id: '4', title: 'Kubernetes Primer', content: 'Deploy to a cluster.', syntax: 'Deployment, Service', usage: 'Scale reliably', codeExample: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 2\n  template:\n    spec:\n      containers:\n        - image: my/web:latest' },
    { id: '5', title: 'Terraform Basics', content: 'Provision infra declaratively.', syntax: 'resource, variable', usage: 'Reproducible infra', codeExample: 'resource "aws_s3_bucket" "b" {\n  bucket = "my-bucket"\n}' },
    { id: '6', title: 'CI Pipeline', content: 'Automate build/test/lint.', syntax: 'GitHub Actions YAML', usage: 'Consistency', codeExample: 'name: ci\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n      - run: npm ci && npm test' },
    { id: '7', title: 'Observability', content: 'Logs/metrics/traces.', syntax: 'OpenTelemetry / Prometheus', usage: 'Find issues fast', codeExample: '# Export metrics and add alerts for error rate' },
    { id: '8', title: 'Mini Project', content: 'Build → Test → Ship a sample app.', syntax: 'N/A', usage: 'Apply pipeline', codeExample: '# Wire Docker + CI + simple deploy target' },
  ]
}

function generateBlockchainSections(languageId: string, lang: string): TutorialSection[] {
  const isSolidity = /solidity/.test(languageId.toLowerCase())
  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} overview: build decentralized apps and smart contracts.`, syntax: 'Smart contracts', usage: 'Blockchain development', codeExample: isSolidity ? '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract HelloWorld {\n  string public message = "Hello, Blockchain!";\n}' : 'import Web3 from "web3";\nconst web3 = new Web3(provider);' },
    { id: '2', title: 'Setup Environment', content: 'Install tools: Hardhat/Truffle for Solidity, Web3.js for JS.', syntax: 'npm install', usage: 'Dev environment', codeExample: 'npm install --save-dev hardhat\nnpx hardhat init' },
    { id: '3', title: 'Smart Contract Basics', content: 'Variables, functions, and modifiers.', syntax: 'contract, function, modifier', usage: 'Write logic', codeExample: isSolidity ? 'contract Counter {\n  uint256 public count = 0;\n  function increment() public {\n    count += 1;\n  }\n}' : '// Web3.js interacts with contracts' },
    { id: '4', title: 'Data Types & Storage', content: 'uint, address, mapping, arrays.', syntax: 'uint, address, mapping', usage: 'Store blockchain data', codeExample: 'mapping(address => uint256) public balances;\naddress public owner;\nuint256[] public numbers;' },
    { id: '5', title: 'Functions & Visibility', content: 'public, private, internal, external.', syntax: 'function visibility', usage: 'Control access', codeExample: 'function publicFunc() public {}\nfunction privateFunc() private {}\nfunction internalFunc() internal {}\nfunction externalFunc() external {}' },
    { id: '6', title: 'Events', content: 'Log state changes for frontend tracking.', syntax: 'event, emit', usage: 'Notify listeners', codeExample: 'event Transfer(address indexed from, address indexed to, uint256 value);\n\nfunction transfer(address to, uint256 amount) public {\n  emit Transfer(msg.sender, to, amount);\n}' },
    { id: '7', title: 'Payable Functions', content: 'Send and receive ETH/native tokens.', syntax: 'payable, msg.value', usage: 'Handle payments', codeExample: 'function deposit() public payable {\n  balances[msg.sender] += msg.value;\n}\n\nfunction withdraw(uint256 amount) public {\n  payable(msg.sender).transfer(amount);\n}' },
    { id: '8', title: 'Inheritance', content: 'Extend contracts for code reuse.', syntax: 'is, super', usage: 'Modular contracts', codeExample: 'contract Base {\n  uint256 public data;\n}\n\ncontract Child is Base {\n  function setData(uint256 _data) public {\n    data = _data;\n  }\n}' },
    { id: '9', title: 'Testing', content: 'Write tests with Hardhat/Mocha.', syntax: 'expect, describe, it', usage: 'Ensure correctness', codeExample: 'const { expect } = require("chai");\n\ndescribe("Counter", function() {\n  it("should increment", async function() {\n    const Counter = await ethers.getContractFactory("Counter");\n    const counter = await Counter.deploy();\n    await counter.increment();\n    expect(await counter.count()).to.equal(1);\n  });\n});' },
    { id: '10', title: 'Deployment', content: 'Deploy to testnet/mainnet.', syntax: 'hardhat run scripts/deploy.js', usage: 'Go live', codeExample: 'async function main() {\n  const Contract = await ethers.getContractFactory("MyContract");\n  const contract = await Contract.deploy();\n  console.log("Deployed to:", contract.address);\n}\n\nmain();' },
    { id: '11', title: 'Frontend Integration', content: 'Connect dApp to MetaMask with Web3.js/ethers.js.', syntax: 'window.ethereum, ethers.providers', usage: 'User interaction', codeExample: 'const provider = new ethers.providers.Web3Provider(window.ethereum);\nawait provider.send("eth_requestAccounts", []);\nconst signer = provider.getSigner();\nconst contract = new ethers.Contract(address, abi, signer);' },
    { id: '12', title: 'Security Best Practices', content: 'Reentrancy guards, access control, audits.', syntax: 'nonReentrant, onlyOwner', usage: 'Prevent exploits', codeExample: 'import "@openzeppelin/contracts/security/ReentrancyGuard.sol";\nimport "@openzeppelin/contracts/access/Ownable.sol";\n\ncontract Secure is ReentrancyGuard, Ownable {\n  function withdraw() public nonReentrant onlyOwner {\n    // Safe withdrawal\n  }\n}' },
    { id: '13', title: 'Mini Project', content: 'Build a simple token or voting dApp.', syntax: 'N/A', usage: 'Apply concepts', codeExample: '// Create ERC20 token or voting contract + frontend' },
  ]
}

function generateFrameworkSections(languageId: string, lang: string): TutorialSection[] {
  const isReact = /react/.test(languageId.toLowerCase())
  const isNext = /next/.test(languageId.toLowerCase())
  const isVue = /vue/.test(languageId.toLowerCase())

  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} is a modern framework for building web applications.`, syntax: 'Component-based', usage: 'Build UIs', codeExample: isReact ? 'import React from "react";\n\nfunction App() {\n  return <h1>Hello React</h1>;\n}' : isVue ? '<template><h1>{{ message }}</h1></template>\n<script>\nexport default {\n  data() { return { message: "Hello Vue" } }\n}\n</script>' : `console.log("${lang} framework")` },
    { id: '2', title: 'Components', content: 'Reusable UI pieces.', syntax: 'Component', usage: 'Modular code', codeExample: isReact ? 'function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}' : 'Component structure' },
    { id: '3', title: 'State Management', content: 'Manage component data.', syntax: isReact ? 'useState' : isVue ? 'data()' : 'state', usage: 'Track changes', codeExample: isReact ? 'const [count, setCount] = useState(0);' : 'data() { return { count: 0 } }' },
    { id: '4', title: 'Props', content: 'Pass data between components.', syntax: 'props', usage: 'Component communication', codeExample: '<Child name="Alice" age={25} />' },
    { id: '5', title: 'Events', content: 'Handle user interactions.', syntax: 'onClick, onChange', usage: 'Interactivity', codeExample: '<button onClick={() => setCount(count + 1)}>Click</button>' },
    { id: '6', title: 'Lists & Keys', content: 'Render dynamic lists.', syntax: 'map(), key', usage: 'Display arrays', codeExample: '{items.map(item => <li key={item.id}>{item.name}</li>)}' },
    { id: '7', title: 'Forms', content: 'Handle user input.', syntax: 'input, value, onChange', usage: 'Data entry', codeExample: '<input value={text} onChange={e => setText(e.target.value)} />' },
    { id: '8', title: 'Lifecycle/Effects', content: 'Side effects and cleanup.', syntax: isReact ? 'useEffect' : 'mounted()', usage: 'API calls, subscriptions', codeExample: isReact ? 'useEffect(() => {\n  fetchData();\n}, []);' : 'mounted() { this.fetchData(); }' },
    { id: '9', title: 'Routing', content: 'Navigate between pages.', syntax: isNext ? 'Link, useRouter' : 'Router', usage: 'Multi-page apps', codeExample: isNext ? '<Link href="/about">About</Link>' : '<router-link to="/about">About</router-link>' },
    { id: '10', title: 'API Integration', content: 'Fetch data from backend.', syntax: 'fetch, axios', usage: 'Load data', codeExample: 'const data = await fetch("/api/users").then(r => r.json());' },
    { id: '11', title: isNext ? 'API Routes' : 'Global State', content: isNext ? 'Build backend APIs in Next.js' : 'Share state across app', syntax: isNext ? 'app/api/route.ts' : 'Context/Vuex', usage: isNext ? 'Full-stack' : 'State sharing', codeExample: isNext ? 'export async function GET() {\n  return Response.json({ data: [] });\n}' : 'State management example' },
    { id: '12', title: 'Mini Project', content: 'Build a todo app or blog.', syntax: 'N/A', usage: 'Apply all skills', codeExample: '// Combine components, state, routing, and API calls' },
  ]
}

function generateMobileSections(languageId: string, lang: string): TutorialSection[] {
  const isRN = /react-native/.test(languageId.toLowerCase())
  const isFlutter = /flutter/.test(languageId.toLowerCase())
  const isSwift = /swift/.test(languageId.toLowerCase())

  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} for building mobile apps.`, syntax: 'Mobile framework', usage: 'iOS/Android apps', codeExample: isRN ? 'import { View, Text } from "react-native";\n\nfunction App() {\n  return <View><Text>Hello Mobile</Text></View>;\n}' : isFlutter ? 'import \'package:flutter/material.dart\';\n\nvoid main() => runApp(MyApp());\n\nclass MyApp extends StatelessWidget {\n  Widget build(context) => MaterialApp(home: Text("Hello"));\n}' : 'import UIKit\nprint("Hello iOS")' },
    { id: '2', title: 'UI Components', content: 'Build layouts with native components.', syntax: isRN ? 'View, Text, Image' : isFlutter ? 'Widget, Container' : 'UIView', usage: 'Create UI', codeExample: isRN ? '<View style={{ padding: 20 }}><Text>Content</Text></View>' : 'Container(padding: EdgeInsets.all(20), child: Text("Content"))' },
    { id: '3', title: 'Styling', content: 'Style your components.', syntax: 'StyleSheet / TextStyle', usage: 'Beautiful UIs', codeExample: isRN ? 'const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: "white" } });' : 'TextStyle(fontSize: 24, fontWeight: FontWeight.bold)' },
    { id: '4', title: 'State Management', content: 'Manage component state.', syntax: isRN ? 'useState' : 'setState', usage: 'Interactive UIs', codeExample: isRN ? 'const [count, setCount] = useState(0);' : 'setState(() { count++; });' },
    { id: '5', title: 'Lists', content: 'Display scrollable lists.', syntax: isRN ? 'FlatList' : 'ListView.builder', usage: 'Show data', codeExample: isRN ? '<FlatList data={items} renderItem={({item}) => <Text>{item}</Text>} />' : 'ListView.builder(itemBuilder: (context, index) => Text(items[index]))' },
    { id: '6', title: 'Navigation', content: 'Navigate between screens.', syntax: 'Navigator', usage: 'Multi-screen apps', codeExample: isRN ? 'navigation.navigate("Details")' : 'Navigator.push(context, route)' },
    { id: '7', title: 'Forms & Input', content: 'Get user input.', syntax: 'TextInput / TextField', usage: 'Data entry', codeExample: isRN ? '<TextInput value={text} onChangeText={setText} />' : 'TextField(controller: controller)' },
    { id: '8', title: 'API Calls', content: 'Fetch data from backend.', syntax: 'fetch / http package', usage: 'Load data', codeExample: 'const data = await fetch(url).then(r => r.json());' },
    { id: '9', title: 'Local Storage', content: 'Persist data locally.', syntax: 'AsyncStorage / SharedPreferences', usage: 'Save data', codeExample: isRN ? 'await AsyncStorage.setItem("key", value);' : 'prefs.setString("key", value);' },
    { id: '10', title: 'Animations', content: 'Smooth animations.', syntax: 'Animated / Animation', usage: 'Engaging UIs', codeExample: isRN ? 'Animated.timing(fadeAnim, { toValue: 1 }).start();' : 'AnimationController animation;' },
    { id: '11', title: 'Platform-Specific Code', content: 'Handle iOS/Android differences.', syntax: 'Platform.OS / Platform.select', usage: 'Platform features', codeExample: isRN ? 'Platform.OS === "ios" ? iosCode : androidCode' : 'Platform differences' },
    { id: '12', title: 'Mini Project', content: 'Build a todo or weather app.', syntax: 'N/A', usage: 'Apply concepts', codeExample: '// Create full mobile app with state, navigation, and API' },
  ]
}

function generateBackendSections(languageId: string, lang: string): TutorialSection[] {
  const isNode = /node/.test(languageId.toLowerCase())
  const isPython = /python/.test(languageId.toLowerCase())

  return [
    { id: '1', title: `Introduction to ${lang}`, content: `${lang} for building server-side applications.`, syntax: 'Server framework', usage: 'Build APIs', codeExample: isNode ? 'const express = require("express");\nconst app = express();\napp.get("/", (req, res) => res.send("Hello"));\napp.listen(3000);' : 'from flask import Flask\napp = Flask(__name__)\n@app.route("/")\ndef home(): return "Hello"\napp.run()' },
    { id: '2', title: 'Routing', content: 'Define API endpoints.', syntax: 'GET, POST, PUT, DELETE', usage: 'Handle requests', codeExample: isNode ? 'app.get("/users", (req, res) => res.json({ users: [] }));' : '@app.route("/users")\ndef get_users(): return jsonify(users=[])' },
    { id: '3', title: 'Request Handling', content: 'Access request data.', syntax: 'req.params, req.query, req.body', usage: 'Extract data', codeExample: 'const { id } = req.params;\nconst { page } = req.query;\nconst { name } = req.body;' },
    { id: '4', title: 'Middleware', content: 'Add functionality to request pipeline.', syntax: 'app.use(middleware)', usage: 'Auth, logging, CORS', codeExample: isNode ? 'app.use(express.json());\napp.use(cors());' : 'from flask_cors import CORS\nCORS(app)' },
    { id: '5', title: 'Database Integration', content: 'Connect to database.', syntax: 'mongoose / SQLAlchemy', usage: 'Store data', codeExample: isNode ? 'const User = mongoose.model("User", schema);\nconst users = await User.find();' : 'user = User.query.filter_by(email=email).first()' },
    { id: '6', title: 'Authentication', content: 'Secure endpoints with JWT.', syntax: 'JWT tokens', usage: 'User auth', codeExample: 'const token = jwt.sign({ userId }, SECRET);\nverify(token, SECRET);' },
    { id: '7', title: 'Error Handling', content: 'Handle errors gracefully.', syntax: 'try/catch, error middleware', usage: 'Prevent crashes', codeExample: 'try {\n  await operation();\n} catch (error) {\n  res.status(500).json({ error: error.message });\n}' },
    { id: '8', title: 'File Uploads', content: 'Handle file uploads.', syntax: 'multer / werkzeug', usage: 'Accept files', codeExample: isNode ? 'app.post("/upload", upload.single("file"), (req, res) => {});' : 'file = request.files["file"]\nfile.save(path)' },
    { id: '9', title: 'Validation', content: 'Validate request data.', syntax: 'express-validator / marshmallow', usage: 'Data quality', codeExample: isNode ? 'body("email").isEmail()' : 'schema.load(request.json)' },
    { id: '10', title: 'Environment Variables', content: 'Manage configuration.', syntax: 'dotenv / os.environ', usage: 'Keep secrets safe', codeExample: 'require("dotenv").config();\nconst PORT = process.env.PORT;' },
    { id: '11', title: 'Testing', content: 'Test API endpoints.', syntax: 'jest/supertest / pytest', usage: 'Ensure quality', codeExample: 'test("GET /users", async () => {\n  const res = await request(app).get("/users");\n  expect(res.status).toBe(200);\n});' },
    { id: '12', title: 'Mini Project', content: 'Build a REST API with CRUD operations.', syntax: 'N/A', usage: 'Apply all concepts', codeExample: '// Create blog API or task manager with database' },
  ]
}
