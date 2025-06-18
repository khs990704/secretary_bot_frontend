import { useMutation } from '@tanstack/react-query'

export const useChatMutation = () => {
  return useMutation({
    mutationFn: async (message) => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      if (!response.ok) throw new Error('Server error')
      return response.json()
    },
  })
}