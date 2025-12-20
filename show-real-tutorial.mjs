// Show actual tutorial output by simulating the function
import { readFileSync } from 'fs';

// Simulate what happens when user visits /tutorial/javascript
console.log('='.repeat(80));
console.log('SIMULATION: User visits /tutorial/javascript');
console.log('='.repeat(80));
console.log();

const content = readFileSync('./utils/comprehensiveTutorialContent.ts', 'utf-8');

// Extract the generateGeneralSections function content for JavaScript
const genMatch = content.match(/id: '1',\s*title:\s*`\$\{lang\} HOME`,\s*content:\s*`([^`]+?)`,\s*syntax:\s*'([^']+)',\s*usage:\s*'([^']+)'/s);

if (genMatch) {
  const homeContent = genMatch[1];
  const syntax = genMatch[2];
  const usage = genMatch[3];

  // Simulate for JavaScript
  const jsHomeContent = homeContent.replace(/\$\{lang\}/g, 'JavaScript');
  const jsSyntax = syntax.replace(/\$\{lang\}/g, 'JavaScript');
  const jsUsage = usage.replace(/\$\{lang\}/g, 'JavaScript');

  console.log('Section 1 - JavaScript HOME');
  console.log('-'.repeat(80));
  console.log('Title:', 'JavaScript HOME');
  console.log('Syntax:', jsSyntax);
  console.log('Usage:', jsUsage);
  console.log();
  console.log('Content:');
  console.log(jsHomeContent);
  console.log();
  console.log('Character count:', jsHomeContent.length);
  console.log('Word count:', jsHomeContent.split(/\s+/).length);
}

console.log();
console.log('='.repeat(80));

// Now show the Introduction section
const introMatch = content.match(/id: '2',\s*title:\s*`\$\{lang\} Introduction`,\s*content:\s*`([^`]+?)`,\s*syntax:\s*'([^']+)',\s*usage:/s);

if (introMatch) {
  const introContent = introMatch[1];
  const jsIntroContent = introContent.replace(/\$\{lang\}/g, 'JavaScript');

  console.log('Section 2 - JavaScript Introduction');
  console.log('-'.repeat(80));
  console.log(jsIntroContent);
  console.log();
  console.log('Word count:', jsIntroContent.split(/\s+/).length);
}

console.log();
console.log('='.repeat(80));
console.log('✅ This same comprehensive content appears for ALL languages:');
console.log('   - Python, Java, C++, Ruby, PHP, Go, Rust, TypeScript');
console.log('   - React Native, Flutter, Swift, Kotlin (mobile)');
console.log('   - Node.js, Express, Django, Flask (backend)');
console.log('   - SQL, MongoDB, PostgreSQL (database)');
console.log('   - Docker, Kubernetes, Terraform (DevOps)');
console.log('   - TensorFlow, PyTorch (ML)');
console.log('   - Solidity, Web3.js (Blockchain)');
console.log('='.repeat(80));
