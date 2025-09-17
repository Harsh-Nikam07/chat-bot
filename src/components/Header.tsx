'use client';

import React from 'react';
import { Menu, Zap } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';

export function Header() {
    const { dispatch } = useAppContext();

    const toggleSidebar = () => {
        dispatch({ type: 'TOGGLE_SIDEBAR' });
    };

    return (
        <header
            className="px-6 py-2 border-b "
            style={{
                background: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={18} style={{ color: 'var(--foreground)' }} />
                    </Button>

                    <div className="flex items-center space-x-3">
                        {/* <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: 'var(--primary)' }}
                        >
                            <Zap size={18} style={{ color: 'var(--background)' }} />
                        </div> */}

                        <div>
                            <h1 style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '0.875rem' }}>
                                AI Chat Bot
                            </h1>
                            <p style={{ color: 'var(--foreground)', opacity: 0.6, fontSize: '0.75rem' }}>
                                Prototype v1.0
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
