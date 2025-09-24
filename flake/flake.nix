{
  description = "ForgeOfIdeas - Cozy Pixel Art Project Tracker (React + Tailwind DevShell)";

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
      in {
        devShell = pkgs.mkShell {
          name = "ForgeOfIdeas-shell";

          buildInputs = [
            pkgs.nodejs_22
            pkgs.yarn
            pkgs.git
            pkgs.tailwindcss
            pkgs.nodePackages.postcss
            pkgs.autoprefixer
            pkgs.vite
            pkgs.typescript-language-server
            pkgs.typescript
            pkgs.vscode-langservers-extracted
            pkgs.tailwindcss-language-server
          ] ++ baseShell.buildInputs;

          shellHook = ''
            echo "🔨 Welcome to The ForgeOfIdeas!"
            echo "Run 'yarn create vite my-app --template react' to bootstrap a new project"
            echo "Then: cd my-app && echo 'Ready to hack with Tailwind + Vite 🎨'"
          '';
        };
      }
    );
}
# {
#   description = "ForgeOfIdeas - Cozy Pixel Art Project Tracker";
#
#   inputs = {
#     nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
#     flake-utils.url = "github:numtide/flake-utils";
#     # essentials.url = "path:/mnt/hdmenezess42/GitProjects/flakeEssentials";
#   };
#
#   outputs = { self, nixpkgs, flake-utils, }:#essentials }:
#     flake-utils.lib.eachDefaultSystem (system:
#       let
#         pkgs = import nixpkgs { inherit system; };
#         # baseShell = essentials.devShells.${system}.python;
#       in {
#         devShell = pkgs.mkShell {
#           name = "ForgeOfIdeas-shell";
#
#           buildInputs = [
#             pkgs.nodejs_22   # Node.js moderno, útil para servir e ferramentas JS
#             pkgs.yarn        # ou pnpm/npm, se preferir
#             pkgs.git
#           ]; # ++ baseShell.buildInputs;
#
#           shellHook = ''
#             echo "🔨 Welcome to The ForgeOfIdeas!"
#             echo "Use 'npx serve .' to run the site local"
#           '';
#         };
#       }
#     );
# }
