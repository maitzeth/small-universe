import { create } from 'zustand'

type Store = {
  isActive: boolean;
  setActive: (value?: boolean) => void
}

export const useCursorStore = create<Store>()((set) => ({
  isActive: false,
  setActive: (value) => {
    return set(() => ({ isActive: value }))
  },
}))
