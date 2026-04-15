import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

function AIChatContainer() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hi! I\'m your AI assistant. I can help you with questions, coding, writing, and much more. Try asking me anything!',
      timestamp: new Date(Date.now() - 300000),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedPrompts = [
    "Write a Python function",
    "Explain quantum computing",
    "Create a recipe",
    "Help with math problem",
  ];

  const callOpenAIAPI = async (userMessage) => {
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        toast.error('OpenAI API key not configured');
        return 'I\'m not configured yet. Please set up your OpenAI API key in the environment variables.';
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: userMessage,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('OpenAI API error:', error);
        throw new Error(error.error?.message || 'Failed to get AI response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('API Error:', error);
      toast.error(error.message || 'Failed to get AI response');
      return `I encountered an error: ${error.message}`;
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Get AI response
    const aiResponse = await callOpenAIAPI(message);
    
    const aiMessageObj = {
      id: Date.now() + 1,
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, aiMessageObj]);
    setIsLoading(false);
  };

  const handleSuggestedPrompt = (prompt) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
      {/* HEADER */}
      <div className="border-b border-slate-700/50 px-6 py-4 flex items-center gap-3">
        <div className="p-2 rounded-full bg-purple-500/20">
          <Sparkles className="size-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-200">AI Assistant</h2>
          <p className="text-xs text-slate-400">Powered by OpenAI</p>
        </div>
      </div>

      {/* SETUP INFO - Show if no API key */}
      {!import.meta.env.VITE_OPENAI_API_KEY && (
        <div className="border-b border-yellow-500/30 bg-yellow-500/10 px-6 py-3">
          <p className="text-sm text-yellow-200">
            ⚙️ <strong>Setup Required:</strong> Add your OpenAI API key to <code className="bg-slate-800 px-2 py-1 rounded text-yellow-100">.env.local</code> to enable AI features.
            <br />
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">
              Get your API key →
            </a>
          </p>
        </div>
      )}

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Sparkles className="size-12 mx-auto mb-4 text-purple-400" />
              <p className="text-slate-300">Start a conversation with AI</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-cyan-500 text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-cyan-100' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}

        {/* LOADING INDICATOR */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* SUGGESTED PROMPTS - Show only when no messages or initial state */}
        {messages.length <= 1 && !isLoading && (
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <p className="text-xs text-slate-400 mb-3 font-semibold">SUGGESTED PROMPTS</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  disabled={!import.meta.env.VITE_OPENAI_API_KEY}
                  className="text-left px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600 transition-all text-sm text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="border-t border-slate-700/50 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Ask me anything..."
            className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            disabled={isLoading || !import.meta.env.VITE_OPENAI_API_KEY}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isLoading || !import.meta.env.VITE_OPENAI_API_KEY}
            className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white transition-colors"
          >
            <Send className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChatContainer;
