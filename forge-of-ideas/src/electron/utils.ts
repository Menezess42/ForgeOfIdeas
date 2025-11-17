// ./ForgeOfIdeas/forge-of-ideas/src/electron/utils.ts

export function isDev(): boolean{
    return process.env.NODE_ENV == "development";
}
