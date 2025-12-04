{ pkgs, system, essentials }:

let
  baseShell = essentials.devShells.${system}.js;
in
pkgs.mkShell rec {
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
    echo "🔨 Welcome to The ForgeOfIdeas!"
  '';
}
