import { create } from 'zustand';

interface BasePathStore {
  basePath: string | null;
  setBasePath: (path: string) => void;
}

export const useBasePathStore = create<BasePathStore>((set) => ({
  basePath: null,
  setBasePath: (path: string) => set({ basePath: path })
}));
