import { create } from 'zustand'

const useChatStore = create((set) => ({
    messages: [],
    input: '',
    isLoading: false,

    setInput: (text) => set({ input: text }),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    setLoadgin: (value) => set({ isLoading: value })
}))

export default useChatStore;