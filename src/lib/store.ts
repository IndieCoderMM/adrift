import { create } from "zustand";

interface AppStore {
  openLogin: boolean;
  setOpenLogin: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  openLogin: false,
  setOpenLogin: (open) => set({ openLogin: open }),
}));
