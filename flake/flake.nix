{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    essentials.url = "path:/mnt/hdmenezess42/GitProjects/flakeEssentials";
  };

  outputs = { self, nixpkgs, flake-utils, essentials}:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        baseShell = essentials.devShells.${system}.js;
        programs.nix-ld.enable = true;
      in {
        devShell = pkgs.mkShell rec{
          name = "ForgeOfIdeas-shell";

          buildInputs = [
            pkgs.nodejs_22
            pkgs.yarn
            pkgs.git
            pkgs.tailwindcss
            pkgs.nodePackages.postcss
            pkgs.autoprefixer
            pkgs.electron
          ] ++ baseShell.buildInputs;

          shellHook = ''
          export ELECTRON_OVERRIDE_DIST_PATH="${pkgs.electron}/bin"
          echo "🔨 Welcome to The ForgeOfIdeas!"
          echo "Electron path override set to: $ELECTRON_OVERRIDE_DIST_PATH"
          echo "Run 'yarn create vite my-app --template react' to bootstrap a new project"
          echo "Then: cd my-app && echo 'Ready to hack with Tailwind + Vite 🎨'"
          '';
        };
      }
      );
}
