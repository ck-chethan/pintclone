import { create } from 'zustand'
import { UserType } from './interface'
import { persist } from 'zustand/middleware'

type State = {
  currentUser: UserType | null
}

type Actions = {
  setCurrentUser: (newUser: UserType) => void
  removeCurrentUser: () => void
  updateCurrenUser: (updatedUser: UserType) => void
}

type AuthStore = State & Actions

const useAuthStore = create<AuthStore>(
  persist((set) => ({
    currentUser: null,
    setCurrentUser: (newUser: UserType) => set({ currentUser: newUser }),
    removeCurrentUser: () => set({ currentUser: null }),
    updateCurrenUser: (updatedUser: UserType) =>
      set({ currentUser: updatedUser }),
  }))
)

export default useAuthStore
