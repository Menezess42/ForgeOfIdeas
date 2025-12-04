# Forge of Ideas

Forge of Ideas is a productivity desktop application built with **Electron + React + TypeScript + Vite**.  
Its goal is simple: help you **organize, prioritize, and forge (develop)** your ideas — while enforcing a healthy rule:

> **You can only work on ONE project at a time.**

This app was born from a personal struggle: juggling too many projects at once and finishing none. Forge of Ideas solves that by giving you a structured shelf for storing ideas and a single **Anvil** where only one idea can be forged at a time.

---

## ✨ Features

### 🗂 The Ideas Shelf
- Contains **4 shelves**, each holding **up to 8 ideas** (32 total).
- Navigate between shelves using elevator-style up/down buttons.
- Create ideas with:
  - Name  
  - Description  
  - Priority (**1 to 3**, represented by color)  
  - Color tag
- Click an idea to view/edit/delete/forge it.
- Priority is visually represented through colored borders.

### 🔨 The Anvil
- The Anvil can hold **only one active idea**.
- When an idea is forged:
  - It moves from the shelf to the anvil.
  - It **cannot** be edited or returned to the shelf.
- You must choose:
  - **Finish it** (mark as forged), or
  - **Abandon it** (delete it)
- Once resolved, the Anvil becomes free again.

---
## 📦 Installation (Nix / NixOS Only)

Forge of Ideas currently provides installation exclusively through **Nix flakes**.

You can run the app without installing it, or install it system-wide or per-user using your Nix profile.

### ▶️ Run without installing
Inside the project directory:

```sh
nix run .
```
This will build the app and run Electron immediately.

### 📥 Build the package

To build the Electron app:
```sh
nix build .
```
The resulting binary will appear in:
```sh
./result/bin/fore-of-ideas
```
You can run it directly:
```sh
./result/bin/forge-of-ideas
```

### Install (user profile)
To install Forge Of Ideas to your user profile:
```sh
nix profile install .
```
After that, you can run the app from anywhere:
```sh
forge-of-ideas
```

---

## 🛠 Development

The project is fully configured for development using **Nix**.  
This is the recommended — and simplest — way to work on Forge of Ideas.

After cloning the repository:

```sh
nix develop
```
This enters the development shell, providing:

Node.js

Electron

Vite

TypeScript

Tailwind

ESLint

All project tooling configured exactly as expected

Once inside the devShell, start the app in development mode:
```sh
npm run dev
```
No other global dependencies or manual setup are required.

---
## 🧰 Technology Stack

- Forge of Ideas is built with:
- Electron (desktop runtime)
- React 19 (UI)
- TypeScript (type safety)
- Vite (frontend bundler + dev server)
- Zustand (state management)
- electron-builder (packaging)

---

## 📝 License

This project is licensed under the MIT License.
See the LICENSE file for details.

