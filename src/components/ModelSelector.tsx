'use client';

import React, { useState } from 'react';
import { ChevronDown, Zap, Clock, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { AI_MODELS } from '@/data/models';

export function ModelSelector() {
  const { state, dispatch } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const selectedModel = AI_MODELS.find(m => m.id === state.selectedModel);

  const handleModelSelect = (modelId: string) => {
    dispatch({ type: 'SET_MODEL', payload: modelId });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 rounded-lg transition-colors"
        style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        }}
      >
        <div className="flex items-center space-x-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--primary)' }}
          >
            <Zap size={16} style={{ color: 'var(--foreground-inverted, white)' }} />
          </div>
          <div className="text-left">
            <p style={{ fontWeight: 500 }}>{selectedModel?.name}</p>
            <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>{selectedModel?.provider}</p>
          </div>
        </div>
        <ChevronDown
          size={16}
          style={{
            color: 'var(--foreground)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto no-scrollbar"
            style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
          >
            {AI_MODELS.map((model) => (
              <motion.button
                key={model.id}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                onClick={() => handleModelSelect(model.id)}
                className="w-full p-4 text-left border-b last:border-b-0 transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  background:
                    model.id === state.selectedModel
                      ? 'var(--primary-50, rgba(59,130,246,0.1))'
                      : 'var(--background)',
                  color: 'var(--foreground)',
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 style={{ fontWeight: 500 }}>{model.name}</h3>
                      <span
                        style={{
                          fontSize: '0.625rem',
                          padding: '0 0.25rem',
                          borderRadius: '0.25rem',
                          background: 'var(--background)',
                          opacity: 0.6,
                        }}
                      >
                        {model.provider}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.5rem' }}>
                      {model.description}
                    </p>
                    <div className="flex items-center space-x-4" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{model.maxTokens} tokens</span>
                      </div>
                      {model.pricing && (
                        <div className="flex items-center space-x-1">
                          <DollarSign size={12} />
                          <span>${model.pricing.input}/1K tokens</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {model.id === state.selectedModel && (
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ background: 'var(--primary)' }}
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
