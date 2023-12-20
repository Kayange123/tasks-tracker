import { create } from "zustand";

type CardModalProps = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export const useCardModal = create<CardModalProps>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
