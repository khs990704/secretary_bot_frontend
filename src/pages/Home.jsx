import { useEffect, useState, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useChatMutation } from '../hooks/useChatMutation';

function Home() {
    const { messages, addUserMessage, addBotMessage, updateLastBotMessage } = useChatStore()
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const chatMutation = useChatMutation((reply) => {
        updateLastBotMessage(reply)
    })

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        addUserMessage(trimmed)
        addBotMessage('🤖 응답 준비 중...')
        chatMutation.mutate(trimmed)

        setInput('')
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
    // 전체 컨테이너
    <div className="flex flex-col h-screen bg-gray-50">

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto space-y-2">
            <div className="space-y-2 bg-white rounded shadow p-4 h-full">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`max-w-[75%] px-4 py-2 rounded text-sm ${
                            msg.role === 'user'
                            ? 'bg-blue-100 self-end text-right ml-auto'
                            : 'bg-gray-200 self-start text-left mr-auto'
                        }`}
                    >
                    <span className="block text-xs text-gray-500 mb-1">
                        {msg.role === 'user' ? '🧑 사용자' : '🤖 챗봇'}
                    </span>
                        {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>

        {/* 입력창 */}
        <div className="pt-1 pb-2 bg-white border-t shadow flex items-center gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                파일
            </button>
            <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                전송
            </button>
        </div>
    </div>
  );
}

export default Home;