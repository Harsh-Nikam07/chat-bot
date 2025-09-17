'use client';

import React, { useState } from 'react';
import { Send, FileText, Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { TemplateModal } from '@/components/TemplateModal';
import { v4 as uuidv4 } from 'uuid';

export function PromptEditor() {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.currentPrompt.trim() || isLoading) return;

    setIsLoading(true);

    const userMessage = {
      id: uuidv4(),
      role: 'user' as const,
      content: state.currentPrompt,
      timestamp: new Date(),
      model: state.selectedModel,
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: state.currentPrompt,
          model: state.selectedModel,
          parameters: state.parameters,
        }),
      });

      const data = await response.json();

      const assistantMessage = {
        id: uuidv4(),
        role: 'assistant' as const,
        content: data.response,
        timestamp: new Date(),
        model: state.selectedModel,
      };

      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
      dispatch({ type: 'SET_PROMPT', payload: '' });
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage = {
        id: uuidv4(),
        role: 'assistant' as const,
        content:
          '⚠️ Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        model: state.selectedModel,
      };
      dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTemplate = () => {
    if (!state.currentPrompt.trim()) return;

    const template = {
      id: uuidv4(),
      name: `Template ${Date.now()}`,
      description: 'Custom template',
      prompt: state.currentPrompt,
      parameters: state.parameters,
      tags: ['custom'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: 'ADD_TEMPLATE', payload: template });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="rounded-2xl shadow-sm overflow-hidden"
          style={{
            backgroundColor: 'var(--background)',
            // borderColor: 'var(--border)',
            height: '150px'
          }}
        >
          {/* Footer with Model Info and Buttons */}
          <div 
            className="px-4 text-xs pt-4"
            style={{ 
              borderColor: 'var(--border)',
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)'
            }}
          >
            <div className="flex items-center justify-between">
              {/* Left side - Model indicators */}
              <div>
                <span style={{ color: 'var(--foreground)' }}>{state.selectedModel}</span>
                <span className="mx-2">•</span>
                <span>Temperature: {state.parameters.temperature}</span>
              </div>

              {/* Right side - Action buttons */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplateModal(true)}
                  className="text-xs px-3 h-7 whitespace-nowrap"
                >
                  <FileText size={14} className="mr-1" />
                  Templates
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveTemplate}
                  disabled={!state.currentPrompt.trim()}
                  className="text-xs px-3 h-7 whitespace-nowrap"
                >
                  <Save size={14} className="mr-1" />
                  Save
                </Button>
                <Button
                  type="submit"
                  disabled={!state.currentPrompt.trim() || isLoading}
                  className="h-8 px-4 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm whitespace-nowrap"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} className="mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send size={14} className="mr-1" />
                      Send
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Area - Textarea */}
          <div className="flex-1 px-4 py-4">
            <div className="h-full relative">
              <textarea
                value={state.currentPrompt}
                onChange={(e) =>
                  dispatch({ type: 'SET_PROMPT', payload: e.target.value })
                }
                placeholder="Enter your prompt here..."
                className="w-full h-full p-3 text-sm rounded-xl resize-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent border-0 outline-none"
                style={{
                  backgroundColor: 'var(--muted)',
                  color: 'var(--muted-foreground)',
                  border: '1px solid var(--border)'
                }}
                disabled={isLoading}
              />
              <div
                className="absolute bottom-2 right-3 text-xs pointer-events-none"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {state.currentPrompt.length}
              </div>
            </div>
          </div>
        </div>
      </form>

      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
      />
    </>
  );
}