# Contributing to CodeLikeBasics

Thank you for your interest in contributing to CodeLikeBasics! We welcome contributions from everyone. This document outlines how to contribute to this project.

---

## 📋 Code of Conduct

- Be respectful and constructive
- No harassment, discrimination, or hateful content
- Help others learn and grow
- Respect the maintainer's decisions

---

## 🤝 How to Contribute

### 1. **Clone the Repository**

Anyone can clone this repository freely:

```bash
git clone https://github.com/Hassan-Naeem-code/codelikebasics.git
cd codelikebasics
```

### 2. **Create an Issue**

Found a bug? Have an idea? Create an issue!

```
Click "Issues" → "New Issue"
Provide clear description and steps to reproduce
```

### 3. **Fork & Create a Pull Request**

```bash
# 1. Fork the repository (GitHub UI)
# 2. Clone your fork
git clone https://github.com/Hassan-Naeem-code/codelikebasics.git
cd codelikebasics

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes
git add .
git commit -m "feat: add your feature"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Open a Pull Request on GitHub
```

---

## ✅ PR Review Process

### What Happens After You Submit a PR:

1. **Automated Checks** — ESLint, TypeScript, build tests run automatically
2. **Owner Review** — The repository owner reviews your code
3. **Feedback** — You may receive feedback or change requests
4. **Approval & Merge** — Only the owner can approve and merge

### PR Requirements:

- ✅ Passes all automated checks (lint, type-check, build)
- ✅ Includes clear description of changes
- ✅ Follows existing code style
- ✅ Add/update tests if needed
- ✅ Updates documentation if applicable

---

## 💻 Code Style Guidelines

### TypeScript & React

- Use TypeScript types (no `any` unless absolutely necessary)
- Follow existing component patterns
- Keep components focused and reusable
- Add JSDoc comments for complex functions

### Naming Conventions

```typescript
// Components (PascalCase)
function MyComponent() {}

// Functions (camelCase)
function fetchUserData() {}

// Constants (UPPER_SNAKE_CASE)
const MAX_RETRIES = 3

// Variables (camelCase)
let userName = 'John'
```

### Imports

```typescript
// Organize imports
import type { Metadata } from 'next'
import React from 'react'
import { Button } from '@/components/ui/Button'
import { getUserData } from '@/utils/api'
import styles from './Component.module.css'
```

---

## 🔄 Merge Policy

### Only the Repository Owner Can:
- ✅ Merge approved pull requests
- ✅ Close issues
- ✅ Create releases
- ✅ Manage branch protection rules
- ✅ Delete branches

### Contributors Can:
- ✅ Clone the repository
- ✅ Create pull requests
- ✅ Create issues
- ✅ Discuss and comment
- ✅ Suggest changes

---

## 📝 Commit Message Format

Follow conventional commits:

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: improve code formatting
refactor: restructure code
test: add/update tests
chore: dependency updates
```

Examples:
```bash
git commit -m "feat: add dark mode support"
git commit -m "fix: resolve localStorage error on mobile"
git commit -m "docs: update setup instructions"
```

---

## 🚀 Areas for Contribution

### High Priority
- 📖 Complete remaining tutorials (Web Dev, Mobile, AI/ML, etc.)
- 🎮 Create new games for other tech domains
- 🛠️ Build more sandboxes
- 🐛 Bug fixes
- 📝 Documentation improvements

### Medium Priority
- 🎨 UI/UX improvements
- ♿ Accessibility enhancements
- 📱 Mobile responsiveness
- ⚡ Performance optimization

### Lower Priority
- 🔊 Sound effects & music
- 🌙 Dark mode theme
- 🎭 Additional animations
- 🌍 Internationalization

---

## 🧪 Testing Your Changes

Before submitting a PR, test locally:

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run linting
npm run lint

# Type checking
npm run type-check

# Build
npm run build
```

All must pass before submitting!

---

## 📚 Documentation

### Updating Docs

If you add a feature, please update:
- `README.md` — Feature overview
- `CONTRIBUTING.md` — If changing contribution process
- Code comments — For complex logic
- Type definitions — Clear interfaces

---

## 🆘 Need Help?

- **Questions?** Create a GitHub Discussion or Issue
- **Bug report?** Open an Issue with reproduction steps
- **Feature request?** Create an Issue with use case
- **Design feedback?** Comment on relevant PRs/Issues

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License, the same as CodeLikeBasics.

---

## 🎉 Thank You!

Your contributions make CodeLikeBasics better for everyone. We appreciate your effort in helping beginners learn to code!

**Questions? Create an issue and we'll help!**

---

<div align="center">

**Happy Contributing! 🚀**

</div>
