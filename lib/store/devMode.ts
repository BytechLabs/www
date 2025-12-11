import { create } from "zustand";

interface DevModeStore {
    isDevMode: boolean;
    toggleDevMode: () => void;
    setDevMode: (value: boolean) => void;
}

export const useDevMode = create<DevModeStore>((set) => ({
    isDevMode: false,
    toggleDevMode: () => set((state) => ({ isDevMode: !state.isDevMode })),
    setDevMode: (value) => set({ isDevMode: value }),
}));
