# Vocabulary Activator

A small, production-ready web app for actively learning English vocabulary through
flashcards, quizzes, and speaking practice — with Uzbek meanings.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Dexie (IndexedDB) for local, offline persistence
- Framer Motion for animation
- lucide-react for icons

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Features

### Vocabulary
Add, edit, delete, and search words. Each word has an English term, its Uzbek
meaning, and an example sentence. Everything is stored locally in IndexedDB via
Dexie, so your list persists across reloads without any backend.

### Flashcards
Flip between the English word and its Uzbek meaning + example with a 3D flip
animation. Move through the deck with Previous / Next, shuffle the order, or mark
a card as learned.

### Quiz
A random multiple-choice quiz (4 options per question, one correct Uzbek meaning)
generated from your saved words. Requires at least 4 words. Shows your score at
the end with a Restart option.

### Speaking practice
Shows one random word and asks you to speak about it for 30–60 seconds. Uses the
browser's Speech Recognition API (`SpeechRecognition` /
`webkitSpeechRecognition`) to transcribe what you say live, then reports whether
you actually used the target word, with a Retry option.

> Speech recognition requires a Chromium-based browser (Chrome, Edge) with
> microphone access. It is not supported in every browser (e.g. Firefox); the
> app detects this and shows a fallback message.

## Project structure

```
src/
  components/
    Layout/        Navbar and page chrome
    Vocabulary/     Word list, search, add/edit form
    Flashcards/     Flashcard + flashcards page
    Quiz/           Multiple-choice quiz page
    Speaking/       Speaking practice page
    ui/             Reusable Button, Modal, EmptyState, ConfirmDialog
  hooks/            useWords (Dexie live queries + CRUD), useSpeechRecognition
  lib/              Utility helpers + Speech Recognition type declarations
  db.ts             Dexie database schema and starter data seed
  types.ts          Shared TypeScript types
```

## Notes

- All data lives in the browser's IndexedDB (database name
  `VocabularyActivatorDB`). Clearing site data will remove saved words.
- The app seeds a handful of starter words on first run so every screen has
  something to show immediately; add your own and delete the samples anytime.
