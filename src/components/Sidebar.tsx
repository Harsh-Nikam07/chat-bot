'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { ModelSelector } from '@/components/ModelSelector';
import { ParametersPanel } from '@/components/ParametersPanel';

export function Sidebar() {
  const { state, dispatch } = useAppContext();

  return (
    <>
      {/* Mobile overlay when sidebar is open */}
      {!state.sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          style={{ background: 'var(--background)' }}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          width: state.sidebarCollapsed ? 0 : 'auto',
          opacity: state.sidebarCollapsed ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`
          ${state.sidebarCollapsed ? 'w-0' : 'w-full lg:w-80'}
          ${!state.sidebarCollapsed ? 'fixed lg:relative' : ''}
          ${!state.sidebarCollapsed ? 'z-50 lg:z-auto' : ''}
          ${!state.sidebarCollapsed ? 'top-0 lg:top-auto' : ''}
          ${!state.sidebarCollapsed ? 'left-0 lg:left-auto' : ''}
          ${!state.sidebarCollapsed ? 'h-full lg:h-auto' : ''}
          overflow-hidden
        `}
        style={{
          background: 'var(--background)',
          color: 'var(--foreground)',
          borderRight: `1px solid var(--border)`,
        }}
      >
        <div className="p-6 space-y-6 h-full overflow-y-auto no-scrollbar">
          <ModelSelector />
          <ParametersPanel />
        </div>
      </motion.aside>
    </>
  );
}