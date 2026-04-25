{
    description = "Forge of Ideas - Electron Application (dev + build unified flake)";

    inputs = {
        nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
        flake-utils.url = "github:numtide/flake-utils";
        essentials.url = "path:/mnt/hdmenezess42/GitProjects/flakeEssentials";
    };

    outputs = { self, nixpkgs, flake-utils, essentials }:
        flake-utils.lib.eachDefaultSystem (system:
            let
                pkgs = import nixpkgs { inherit system; };

                devShell = import ./nix/devShell.nix {
                    inherit pkgs system essentials;
                };

            in {
                devShells.default = devShell;

                packages.default = pkgs.buildNpmPackage rec {
                    pname = "forgeOfIdeas";
                    version = "1.0.0";
                    src = ./forge-of-ideas;

                    npmDepsHash = "sha256-G3txaMINFirPJ9/hT4nq918qxyHByIXeTvMpcQO3+B8=";
                    makeCacheWritable = true;

                    env = {
                        ELECTRON_SKIP_BINARY_DOWNLOAD = "1";
                    };

                    nativeBuildInputs = with pkgs; [
                        electron
                        nodejs
                        nodePackages.npm
                        makeWrapper
                    ];

                    dontNpmBuild = true;

                    buildPhase = ''
                        runHook preBuild
                        npm run transpile:electron
                        npm run build
                        runHook postBuild
                    '';

                    installPhase = ''
                        mkdir -p $out/bin
                        mkdir -p $out/lib/node_modules/${pname}
                        mkdir -p $out/share/applications
                        mkdir -p $out/share/icons/hicolor/256x256/apps

                        cp -r dist-electron $out/lib/node_modules/${pname}/
                        cp -r dist-react $out/lib/node_modules/${pname}/
                        cp package.json $out/lib/node_modules/${pname}/

                        cp ${src}/furnace.png \
                           $out/share/icons/hicolor/256x256/apps/${pname}.png

                        makeWrapper ${pkgs.electron}/bin/electron \
                           $out/bin/${pname} \
                           --add-flags "$out/lib/node_modules/${pname}/dist-electron/main.js"

                        ln -s $out/bin/${pname} $out/bin/foi

                        cat > $out/share/applications/${pname}.desktop <<EOF
                        [Desktop Entry]
                        Name=Forge of Ideas
                        Comment=Productivity application
                        Exec=${pname}
                        Icon=${pname}
                        Terminal=false
                        Type=Application
                        Categories=Utility;
                        StartupNotify=true
                        EOF
                    '';

                    meta = with pkgs.lib; {
                        description = "Forge of Ideas - A productivity application";
                        license = licenses.mit;
                        platforms = platforms.linux;
                    };
                };

                apps.default = {
                    type = "app";
                    program = "${self.packages.${system}.default}/bin/forgeOfIdeas";
                };
            }
        );
}
