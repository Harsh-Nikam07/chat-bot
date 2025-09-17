export interface AIModel {
    id: string;
    name: string;
    description: string;
    provider: string;
    maxTokens: number;
    pricing?: {
      input: number;
      output: number;
    };
  }
  
  export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    model?: string;
  }
  
  export interface Template {
    id: string;
    name: string;
    description: string;
    prompt: string;
    parameters: ModelParameters;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ModelParameters {
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  }
  
  export interface ChatSession {
    id: string;
    title: string;
    messages: ChatMessage[];
    model: string;
    parameters: ModelParameters;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface AppState {
    selectedModel: string;
    parameters: ModelParameters;
    currentPrompt: string;
    chatHistory: ChatMessage[];
    templates: Template[];
    sessions: ChatSession[];
    theme: 'light' | 'dark';
    sidebarCollapsed: boolean;
  }
  
  export type AppAction = 
    | { type: 'SET_MODEL'; payload: string }
    | { type: 'SET_PARAMETERS'; payload: Partial<ModelParameters> }
    | { type: 'SET_PROMPT'; payload: string }
    | { type: 'ADD_MESSAGE'; payload: ChatMessage }
    | { type: 'CLEAR_CHAT' }
    | { type: 'ADD_TEMPLATE'; payload: Template }
    | { type: 'DELETE_TEMPLATE'; payload: string }
    | { type: 'SET_THEME'; payload: 'light' | 'dark' }
    | { type: 'TOGGLE_SIDEBAR' }
    | { type: 'LOAD_STATE'; payload: Partial<AppState> };