export interface ElectronAPI {
    saveClick: () => Promise<
    | {success: true; count: number}
    | {success: false; error: string}>;
}

declare global{
    interface Window {
        api: ElectronAPI;
    }
}
// Isso informa que o window.api existe e se parece com isso.
