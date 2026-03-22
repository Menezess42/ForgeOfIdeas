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
            pkgs.stdenv.cc.cc.lib
    ] ++ baseShell.buildInputs;

    shellHook = ''
        echo "🔨 Welcome to The ForgeOfIdeas!"
        export LD_LIBRARY_PATH="${pkgs.stdenv.cc.cc.lib}/lib:$LD_LIBRARY_PATH"
        '';
}
