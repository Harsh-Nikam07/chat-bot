'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { PromptEditor } from '@/components/PromptEditor';
import { ChatOutput } from '@/components/ChatOutput';

export default function Home() {
  return (
    <div 
      className="flex flex-col h-screen"
      style={{ 
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)' 
      }}
    >
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main 
          className="flex-1 flex flex-col" 
          style={{ backgroundColor: 'var(--background)' }}
        >
          {/* Chat Output (scrollable area) */}
          <div 
            className="flex-1 overflow-auto no-scrollbar"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div className="max-w-4xl mx-auto px-6 py-6">
              <ChatOutput />
            </div>
          </div>

          {/* Prompt Editor (fixed at bottom) */}
          <div 
            className=" p-2"
            style={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="max-w-4xl mx-auto">
              <PromptEditor />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}