<div align="center">

# 🧠⚡ TubeMind AI

### *Transform Every YouTube Video into an Interactive Learning Experience*

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

<p align="center">
  <b>TubeMind AI</b> isn't just another video summarizer. It is an enterprise-grade, high-fidelity active learning platform designed to convert long educational YouTube lectures into structured study notes, flippable flashcards, interactive quizzes, SVG mind maps, social media threads, and executable code snippets—instantly.
</p>

[✨ Live Demo](#) • [📖 Documentation](#) • [🚀 Quick Start](#-quick-start) • [🤝 Contributing](CONTRIBUTING.md)

---

</div>

## 🌟 Key Features

| Feature | Description |
| :--- | :--- |
| **⚡ Instant AI Video Synthesis** | Paste any YouTube URL or YouTube Short to automatically extract metadata, transcripts, and domain insights. |
| **📑 Executive Summaries** | Toggle between **Short**, **Medium**, **Detailed**, **Bullet Points**, **Beginner**, and **Expert** summary perspectives. |
| **📝 Interactive Markdown Notes** | Live markdown editor with real-time autosave to `localStorage`, versioning history, and draft backups. |
| **📍 Interactive Chapter Timeline** | Jump directly to specific key moments in the video with synced timestamp navigation. |
| **🧠 Interactive SVG Mind Maps** | Zoomable, pannable, expandable visual DAG hierarchy representing key concepts and dependencies. |
| **🎯 Active Recall Quizzes** | Practice with MCQs, True/False, Fill-in-the-blanks, and Code challenges featuring live scoring & confetti celebrations. |
| **🃏 3D Flippable Flashcards** | Spaced repetition flashcards with difficulty filters (Easy/Medium/Hard) and bookmarking logic. |
| **💬 AI Study Partner Chat** | Context-aware chat partner equipped with suggested prompts, code blocks, and transcript query capabilities. |
| **📢 Social Copywriter** | Generate tailored LinkedIn posts (Professional, Startup, Developer, Funny) and multi-tweet Twitter threads. |
| **💻 Code Runner & Resources** | Automatically extracts code snippets with runnable simulated console output and resource citations. |
| **📄 Custom PDF Exporters** | Compile and export custom print-ready study notes into downloadable PDF documents. |
| **⏱️ Pomodoro Focus Timer** | Integrated focus clock rewarding study minutes with achievement unlocks and streak tracking. |
| **📲 PWA & Offline Support** | Installable Progressive Web App (PWA) with custom service worker caching and offline fallback layout. |

---

## 🔄 System Flowchart & User Journey

The flowchart below demonstrates how a YouTube URL is processed through TubeMind AI's pipeline:

```mermaid
flowchart TD
    A[🎥 User Pastes YouTube URL] --> B{URL Validation & Parsing}
    B -->|Valid URL| C[📡 Fetch YouTube oEmbed Metadata]
    B -->|Invalid URL| D[❌ Show Validation Toast Error]
    
    C --> E[🔍 Domain Classification & Topic Detection]
    E -->|Mathematics / Science| F1[📐 Generate Calculus, Algebra & Formula Suite]
    E -->|Coding / Software| F2[💻 Generate Code Snippets & Architecture DAG]
    E -->|General / Business| F3[📝 Generate Executive Notes & General Quiz]
    
    F1 --> G[🚀 Render Interactive Workspace Dashboard]
    F2 --> G
    F3 --> G
    
    G --> H1[📑 Summary & Perspectivized Outlines]
    G --> H2[📝 Editable Auto-saving Notes]
    G --> H3[📍 Interactive Synced Timeline]
    G --> H4[🧠 SVG Mind Map Explorer]
    G --> H5[🎯 Quizzes & Score Tracking]
    G --> H6[🃏 3D Spaced-Repetition Flashcards]
    G --> H7[💬 AI Study Partner Chat]
    G --> H8[📢 Social Copywriter Threads]
    G --> H9[📄 Custom PDF Export Builder]

    H2 -->|Autosave| I[💾 Browser LocalStorage Cache]
```

---

## 🏗️ Architecture & Data Flow Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant App as Next.js 15 Client (React 19)
    participant Context as WorkspaceContext (State Manager)
    participant Engine as AI Synthesis Engine (mock-data.ts)
    participant Storage as LocalStorage & Cache

    User->>App: Paste YouTube Video URL
    App->>Context: Call analyzeVideo(url)
    Context->>App: Set isAnalyzing = true (Progress Stepper)
    Context->>Engine: Fetch oEmbed Metadata (Title, Channel, Thumbnail)
    Engine-->>Context: Return Domain-Aware VideoAnalysis Schema
    Context->>Storage: Save to tubemind-history & tubemind-notes
    Context-->>App: Set activeVideo & Navigate to /dashboard
    App->>User: Display Split-screen Video Player & 12 Study Tabs
    User->>App: Edit Notes / Take Quiz / Flip Flashcards
    App->>Storage: Real-time Autosave Notes & Gamification Streaks
```

---

## 💻 Tech Stack & Tools

- **Framework**: [Next.js 15.5](https://nextjs.org/) (App Router, Turbopack, Server Actions)
- **UI Core**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with dark/light mode CSS tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/) physics & keyframe micro-interactions
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti), [Fuse.js](https://fusejs.io/) fuzzy search
- **PWA**: Custom Service Worker (`public/sw.js`) and Manifest (`public/manifest.json`)

---

## 🚀 Quick Start

### Prerequisites
- Node.js `18.17.0` or higher
- npm `9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/tubemind-ai.git
   cd tubemind-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```

4. **Open the browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## ⌨️ Global Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Cmd</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> | Open Fuzzy Command Palette Search |
| <kbd>Alt</kbd> + <kbd>N</kbd> | Navigate to Notes Panel |
| <kbd>Alt</kbd> + <kbd>Q</kbd> | Navigate to Quiz Panel |
| <kbd>Alt</kbd> + <kbd>F</kbd> | Navigate to Flashcards Panel |
| <kbd>Alt</kbd> + <kbd>C</kbd> | Open AI Study Chat |
| <kbd>Esc</kbd> | Close Overlays & Search Dialogs |

---

## 📂 Project Structure

```text
tubemind-ai/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD Pipeline
├── public/
│   ├── manifest.json           # PWA Manifest settings
│   └── sw.js                   # Service Worker offline cache
├── src/
│   ├── app/
│   │   ├── dashboard/          # Split-screen study workspace layout
│   │   ├── home/               # Video URL submission & history hub
│   │   ├── offline/            # PWA offline fallback UI
│   │   ├── globals.css         # Tailwind v4 custom theme tokens & 3D perspectives
│   │   ├── layout.tsx          # Root layout & providers
│   │   └── page.tsx            # Landing page (Hero, Features, Pricing, FAQ)
│   ├── components/
│   │   ├── dashboard/          # 12 Modular Study Panels
│   │   ├── landing/            # Landing page sections
│   │   └── ui/                 # Reusable UI primitives (Button, Command Palette, etc.)
│   ├── context/
│   │   └── workspace-context.tsx # Global state, history, streaks & persistence
│   ├── hooks/
│   │   └── use-keyboard-shortcuts.ts # Global hotkey listeners
│   └── lib/
│       └── mock-data.ts        # Domain-aware AI synthesis engine
├── .gitignore                  # Production git ignore rules
├── CODE_OF_CONDUCT.md          # Contributor Covenant Code of Conduct
├── CONTRIBUTING.md             # Developer contribution guidelines
├── LICENSE                     # MIT License
├── next.config.ts              # Next.js 15 build configuration
└── package.json                # Project dependencies & scripts
```

---

## 🏷️ GitHub Topics

When publishing this repository, add the following GitHub topics to increase discoverability:
`nextjs15` • `react19` `typescript` • `tailwindcss-v4` • `youtube-summarizer` • `ai-education` • `active-learning` • `flashcards` • `mindmaps` • `pwa` • `framer-motion`

---

## 🤝 Contributing

Contributions are what make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please review our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a PR.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <sub>Built with ❤️ for students, developers, and lifelong learners worldwide. Powered by TubeMind AI.</sub>
</div>
