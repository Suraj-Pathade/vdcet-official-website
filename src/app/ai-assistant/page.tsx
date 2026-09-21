'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, BookOpen, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sources?: Array<{ title: string; source_name: string; category: string }>;
  grounded?: boolean;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am the official VDCET AI Assistant. How can I help you today?",
      grounded: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    'What departments are available?',
    'Tell me about Computer Engineering.',
    'How can I get admission?',
    'What facilities are available?',
    'Where is VDCET located?',
  ];

  const handleSend = async (questionText?: string) => {
    const query = (questionText || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.answer || "I couldn't find this information in the official VDCET knowledge base. Please contact the college office.",
        sources: data.sources || [],
        grounded: data.grounded ?? true,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I couldn't find this information in the official VDCET knowledge base. Please contact the college office.",
        sources: [],
        grounded: false,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-black/[0.06] text-xs font-semibold text-neutral-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>VDCET Knowledge RAG Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          VDCET AI Assistant
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
          Ask questions about VDCET, academics, admissions, campus and official college information.
        </p>

        <div className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-white px-3 py-1 rounded-full border border-black/[0.04]">
          <AlertCircle className="w-3.5 h-3.5 text-neutral-400" />
          <span>AI answers are grounded in the available official VDCET knowledge base.</span>
        </div>
      </div>

      {/* Preset Sample Question Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {sampleQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white text-neutral-700 border border-black/[0.08] hover:bg-neutral-100 hover:text-black transition-colors disabled:opacity-50"
          >
            "{q}"
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="bg-white rounded-3xl border border-black/[0.08] shadow-apple-md flex flex-col h-[520px] overflow-hidden">
        {/* Messages list */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-black text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-300" />}
              </div>

              {/* Message Content */}
              <div
                className={`rounded-2xl p-4 text-xs sm:text-sm space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-black text-white rounded-tr-none'
                    : 'bg-neutral-100 text-neutral-900 rounded-tl-none border border-black/[0.04]'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                {/* Sources badge display */}
                {msg.sender === 'ai' && msg.sources && msg.sources.length > 0 && (
                  <div className="pt-2 border-t border-black/[0.08] space-y-1">
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-neutral-400" />
                      Official Knowledge Base Sources:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.sources.map((src, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-neutral-700 border border-black/[0.06]"
                        >
                          {src.title} ({src.source_name})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-neutral-400 p-2">
              <Bot className="w-4 h-4 text-neutral-400 animate-spin" />
              <span>Querying official VDCET knowledge base...</span>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="p-4 border-t border-black/[0.06] bg-neutral-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask questions about VDCET academics, admissions, campus..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-full text-xs sm:text-sm bg-white border border-black/[0.1] focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 disabled:opacity-50 transition-all flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
