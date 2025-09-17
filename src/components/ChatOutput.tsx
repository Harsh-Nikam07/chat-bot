'use client';

import React, { useEffect, useRef } from 'react';
import { Copy, User, Bot, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export function ChatOutput() {
  const { state, dispatch } = useAppContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.chatHistory]);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  if (state.chatHistory.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{ 
              backgroundColor: 'var(--muted)',
              border: '1px solid var(--border)'
            }}
          >
            <Bot size={36} style={{ color: 'var(--muted-foreground)' }} />
          </div>
          <div className="space-y-2">
            <h3 
              className="text-2xl font-semibold" 
              style={{ color: 'var(--foreground)' }}
            >
              Ready to help
            </h3>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Start a conversation by typing a prompt and selecting send.
              <br />
              Your chat history will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 
          className="text-2xl font-bold" 
          style={{ color: 'var(--foreground)' }}
        >
          Chat History
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearChat}
          className="text-sm"
        >
          <Trash2 size={16} className="mr-2" />
          Clear
        </Button>
      </div>

      {/* Messages */}
      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {state.chatHistory.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex space-x-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex space-x-3 max-w-[80%] ${
                  message.role === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{
                    backgroundColor: message.role === "user"
                      ? 'var(--primary)'
                      : 'var(--muted)',
                    border: '1px solid var(--border)'
                  }}
                >
                  {message.role === "user" ? (
                    <User size={18} color="white" />
                  ) : (
                    <Bot size={18} style={{ color: 'var(--muted-foreground)' }} />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className="rounded-2xl px-5 py-4 shadow-sm"
                  style={{
                    backgroundColor: message.role === "user"
                      ? 'var(--primary)'
                      : 'var(--muted)',
                    color: message.role === "user" 
                      ? 'white' 
                      : 'var(--foreground)',
                    border: message.role === "user" 
                      ? 'none' 
                      : '1px solid var(--border)'
                  }}
                >
                  <div className="prose prose-sm max-w-none">
                    {message.content.split("\n").map((line, i) => (
                      <p 
                        key={i} 
                        className="text-sm leading-relaxed"
                        style={{ 
                          color: message.role === "user" 
                            ? 'white' 
                            : 'var(--foreground)',
                          margin: i === 0 ? '0' : '12px 0 0 0'
                        }}
                      >
                        {line || '\u00A0'}
                      </p>
                    ))}
                  </div>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between mt-4 pt-3 border-t"
                    style={{ 
                      borderColor: message.role === "user"
                        ? 'rgba(255,255,255,0.2)'
                        : 'var(--border)'
                    }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: message.role === "user" 
                          ? 'rgba(255,255,255,0.8)' 
                          : 'var(--muted-foreground)'
                      }}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{ 
                        color: message.role === "user"
                          ? 'rgba(255,255,255,0.8)'
                          : 'var(--muted-foreground)',
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = message.role === "user"
                          ? 'rgba(255,255,255,0.1)'
                          : 'var(--border)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}