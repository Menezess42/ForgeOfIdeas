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
          cd ../forge-of-ideas/
          mkdir -p node_modules/.bin
          ln -sf $(which electron) node_modules/.bin/electron
          echo "🔨 Welcome to The ForgeOfIdeas!"
          '';
        };
      }
    );
}
