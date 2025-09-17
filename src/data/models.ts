import { AIModel } from '@/types';

export const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Most capable model, great for complex tasks requiring deep understanding',
    provider: 'OpenAI',
    maxTokens: 8192,
    pricing: { input: 0.03, output: 0.06 }
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for most conversational tasks',
    provider: 'OpenAI',
    maxTokens: 4096,
    pricing: { input: 0.001, output: 0.002 }
  },
  {
    id: 'claude-3',
    name: 'Claude 3 Sonnet',
    description: 'Balanced model with strong reasoning and creative capabilities',
    provider: 'Anthropic',
    maxTokens: 8192,
    pricing: { input: 0.003, output: 0.015 }
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Google\'s advanced model with multimodal capabilities',
    provider: 'Google',
    maxTokens: 8192,
    pricing: { input: 0.00025, output: 0.0005 }
  },
  {
    id: 'llama-2-70b',
    name: 'Llama 2 70B',
    description: 'Open-source model with strong performance',
    provider: 'Meta',
    maxTokens: 4096,
    pricing: { input: 0.0007, output: 0.0009 }
  }
];