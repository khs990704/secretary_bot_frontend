import { create } from 'zustand'

export const useChatStore = create((set) => ({
    messages: [
        { role: 'assistant', content: '안녕하세요. 무엇을 도와드릴까요?' }
    ],

    addUserMessage: (content) => set((state) => ({
        messages: [...state.messages, { role: 'user', content }]
    })),

    addBotMessage: (content) => set((state) => ({
        messages: [...state.messages, { role: 'assistant', content }]
    })),

    updateLastBotMessage: (newContent) => set((state) => {
        const reversed = [...state.messages].reverse()
        const index = reversed.findIndex((msg) => msg.role === 'assistant')

        if (index === -1) return {}
        reversed[index] = { role: 'assistant', content: newContent }
        return { messages: reversed.reverse() }
    }),

    clearMessages: () => set({ messages: [] })
}))

export default useChatStore;