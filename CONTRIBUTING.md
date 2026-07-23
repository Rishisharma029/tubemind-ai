# Contributing to TubeMind AI 🚀

Thank you for your interest in contributing to **TubeMind AI**! We welcome contributions from developers, UX researchers, designers, and AI enthusiasts around the world.

---

## 📜 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Request Process](#pull-request-process)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Message Conventions](#commit-message-conventions)

---

## 🛡️ Code of Conduct

This project and everyone participating in it is governed by the [TubeMind AI Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## 🛠️ How to Contribute

### Reporting Bugs
Before creating bug reports, please check existing issues. When creating a bug report, include:
- A clear, descriptive title.
- Steps to reproduce the behavior.
- Expected vs actual results.
- Screenshots or recordings if applicable.
- Your OS, Node.js version, and browser details.

### Suggesting Enhancements
Feature requests are welcome! Please specify:
- The target user problem or workflow.
- Proposed solution/UI behavior.
- Alternatives considered.

### Pull Request Process
1. Fork the repository and create a new branch from `main`:
   ```bash
   git checkout -b feature/amazing-new-feature
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Make your changes and ensure the application compiles cleanly:
   ```bash
   npm run build
   ```
4. Commit your changes following conventional commits.
5. Push to your fork and submit a Pull Request to `main`.

---

## 💻 Development Setup

```bash
# Clone the repository
git clone https://github.com/Rishisharma029/tubemind-ai.git

# Navigate into the project directory
cd tubemind-ai

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Coding Standards

- **TypeScript**: Use strict typing. Avoid `any` where possible.
- **Tailwind CSS v4**: Use semantic color classes (`bg-background`, `text-foreground`, `border-border`) to support dark/light theme switching cleanly.
- **Framer Motion**: Maintain smooth 60fps animations.
- **Components**: Keep components focused, reusable, and modular inside `src/components/`.

---

## 📝 Commit Message Conventions

We follow Conventional Commits:
- `feat:` A new feature for the user
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code (white-space, formatting)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing tests or correcting existing tests

Example: `feat(quiz): add streak confetti burst on 100% quiz score`

---

Thank you for building the future of video-based active learning! 🧠⚡
