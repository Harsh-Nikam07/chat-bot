'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction } from '@/types';
import { DEFAULT_TEMPLATES } from '@/data/templates';

const initialState: AppState = {
    selectedModel: 'gpt-3.5-turbo',
    parameters: {
        temperature: 0.7,
        maxTokens: 1000,
        topP: 1.0,
        frequencyPenalty: 0,
        presencePenalty: 0
    },
    currentPrompt: '',
    chatHistory: [],
    templates: DEFAULT_TEMPLATES,
    sessions: [],
    theme: 'light', // Keep this for compatibility but won't be used
    sidebarCollapsed: false
};

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_MODEL':
            return { ...state, selectedModel: action.payload };
        case 'SET_PARAMETERS':
            return {
                ...state,
                parameters: { ...state.parameters, ...action.payload }
            };
        case 'SET_PROMPT':
            return { ...state, currentPrompt: action.payload };
        case 'ADD_MESSAGE':
            return {
                ...state,
                chatHistory: [...state.chatHistory, action.payload]
            };
        case 'CLEAR_CHAT':
            return { ...state, chatHistory: [] };
        case 'ADD_TEMPLATE':
            return {
                ...state,
                templates: [...state.templates, action.payload]
            };
        case 'DELETE_TEMPLATE':
            return {
                ...state,
                templates: state.templates.filter(t => t.id !== action.payload)
            };
        case 'SET_THEME':
            // Keep for compatibility but theme is now managed by ThemeProvider
            return { ...state, theme: action.payload };
        case 'TOGGLE_SIDEBAR':
            return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
        case 'LOAD_STATE':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
}