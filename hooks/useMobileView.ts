import { create } from "zustand";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useMobileSidebar = create<MobileSidebarProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
