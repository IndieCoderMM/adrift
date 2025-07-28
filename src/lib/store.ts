import { create } from "zustand";

interface AppStore {
  openLogin: boolean;
  openSidebar: boolean;
  setOpenLogin: (open: boolean) => void;
  setOpenSidebar: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  openLogin: false,
  openSidebar: true,
  setOpenLogin: (open) => set({ openLogin: open }),
  setOpenSidebar: (open) => set({ openSidebar: open }),
}));
