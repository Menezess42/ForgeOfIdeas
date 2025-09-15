{
  description = "ForgeOfIdeas - Cozy Pixel Art Project Tracker";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    # essentials.url = "path:/mnt/hdmenezess42/GitProjects/flakeEssentials";
  };

  outputs = { self, nixpkgs, flake-utils, }:#essentials }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        # baseShell = essentials.devShells.${system}.python;
      in {
        devShell = pkgs.mkShell {
          name = "ForgeOfIdeas-shell";

          buildInputs = [
            pkgs.nodejs_22   # Node.js moderno, útil para servir e ferramentas JS
            pkgs.yarn        # ou pnpm/npm, se preferir
            pkgs.git
          ]; # ++ baseShell.buildInputs;

          shellHook = ''
            echo "🔨 Welcome to The ForgeOfIdeas!"
            echo "Use 'npx serve .' to run the site local"
          '';
        };
      }
    );
}
