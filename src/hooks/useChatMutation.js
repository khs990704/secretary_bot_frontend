import { useMutation } from '@tanstack/react-query'


const sendMessage = async (message) => {
  const response = await fetch('http://localhost:8010/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message })
  })

  if (!response.ok) {
    throw new Error('Failed to fetch reply')
  }

  const data = await response.json()
  console.log('API response');
  
  return data.reply
}

export const useChatMutation = (onSuccess = () => {}) => {
  return useMutation({
    mutationFn: sendMessage,
    onSuccess
  })
}