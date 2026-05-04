<div align="center">
<h1>Forge of Ideas</h1>
  <img alt="Forge Of Ideas Interface" src="https://github.com/user-attachments/assets/890aaf9d-269f-4e39-8297-ff54c5463381" alt="grandmai" width="500">

<p>You can find a video demonstration <a href="https://www.youtube.com/watch?v=l8lRgloj0T0">here</a></p>
<hr/>
</div>

Forge of Ideas is a productivity desktop application built with **Electron + React + TypeScript + Vite**.  
Its goal is simple: help you **organize, prioritize, and forge (develop)** your ideas — while enforcing a healthy rule:

> **You can only work on ONE idea at a time.**

This app was born from a personal struggle: juggling too many projects at once and finishing none. Forge of Ideas solves that by giving you a structured list for storing ideas and a single **Forge slot** where only one idea can be actively worked on at a time.

---

## ✨ Features

### 🗂 The Ideas Panel

- Displays your ideas in a scrollable sidebar list, color-coded by priority.
- Navigate through pages using elevator-style up/down buttons, or add new ideas with the **+** button.
- Filter ideas quickly using the **search bar** at the top.
- Priority counters at the top show how many ideas exist per priority level (displayed as colored hexagons).
- Each idea can have:
  - **Name**
  - **Description**
  - **Priority** (1 to 3, represented by color — orange, teal, or gray)
- Click an idea to select it and view its details.

### 🔨 The Forge

- The center panel shows the currently selected idea in detail.
- When ready, you can **Forge** an idea — moving it into active development.
- A forged idea **cannot be edited or sent back** to the list.
- You must resolve it by either:
  - Marking it as **Forged** (completed), or
  - **Deleting** it (abandoned)
- Once resolved, the Forge slot becomes free again.

### 📋 The Detail Panel

- The right panel shows a focused view of the selected idea.
- From here you can:
  - **Forge** it (start working on it)
  - **Edit** it (update name, description, or priority)
  - **Delete** it

---

## 📦 Installation (Nix / Home Manager)

Forge of Ideas is distributed as a **Nix flake** and is meant to be consumed via **Home Manager**.

### 1. Add the flake input

In your `flake.nix`, add Forge of Ideas as an input and pass it through to your Home Manager configuration:

```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    home-manager.url = "github:nix-community/home-manager";
    forge-of-ideas.url = "github:menezess42/forgeOfIdeas";
  };

  outputs = { nixpkgs, home-manager, forge-of-ideas, ... }@inputs: {
    homeConfigurations."your-username" = home-manager.lib.homeManagerConfiguration {
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      extraSpecialArgs = { inherit forge-of-ideas; };
      modules = [ ./home.nix ];
    };
  };
}
```

### 2. Add the package in `home.nix`

Receive `forge-of-ideas` as an argument and add the package to `home.packages`:

```nix
{ config, pkgs, lib, forge-of-ideas, ... }:
{
  home.packages = with pkgs; [
    forge-of-ideas.packages.x86_64-linux.default
    # ... your other packages
  ];
}
```

### 3. Apply

```sh
home-manager switch --flake .#your-username
```

After that, `forge-of-ideas` will be available in your `$PATH`.

---

## 🛠 Development

The project is fully configured for development using **Nix**.  
This is the recommended — and simplest — way to work on Forge of Ideas.

After cloning the repository:

```sh
nix develop
```

This enters the development shell, providing:

- Node.js
- Electron
- Vite
- TypeScript
- Tailwind
- ESLint
- All project tooling configured exactly as expected

Once inside the devShell, start the app in development mode:

```sh
npm run dev
```

No other global dependencies or manual setup are required.

---

## 🧰 Technology Stack

Forge of Ideas is built with:

- **Electron** (desktop runtime)
- **React 19** (UI)
- **TypeScript** (type safety)
- **Vite** (frontend bundler + dev server)
- **Zustand** (state management)
- **electron-builder** (packaging)

---

## 📝 License

This project is licensed under the MIT License.  
See the `LICENSE` file for details.
