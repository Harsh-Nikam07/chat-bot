import { Template } from '@/types';

export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Creative Writing',
    description: 'Generate creative stories and narratives',
    prompt: 'Write a creative story about {topic}. Make it engaging and descriptive, with well-developed characters and an interesting plot.',
    parameters: {
      temperature: 0.9,
      maxTokens: 1000,
      topP: 0.9,
      frequencyPenalty: 0.1,
      presencePenalty: 0.1
    },
    tags: ['creative', 'writing', 'story'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Code Review',
    description: 'Review and improve code quality',
    prompt: 'Please review this code and provide suggestions for improvement:\n\n{code}\n\nFocus on:\n- Code quality and best practices\n- Performance optimizations\n- Security considerations\n- Readability improvements',
    parameters: {
      temperature: 0.3,
      maxTokens: 1500,
      topP: 0.8,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0
    },
    tags: ['code', 'review', 'programming'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'Business Analysis',
    description: 'Analyze business scenarios and provide insights',
    prompt: 'Analyze the following business scenario and provide strategic recommendations:\n\n{scenario}\n\nPlease consider:\n- Market opportunities and threats\n- Competitive advantages\n- Risk assessment\n- Implementation roadmap',
    parameters: {
      temperature: 0.4,
      maxTokens: 2000,
      topP: 0.85,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0
    },
    tags: ['business', 'analysis', 'strategy'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: 'Educational Explanation',
    description: 'Explain complex topics in simple terms',
    prompt: 'Explain {topic} in a way that a {audience} can understand. Use analogies, examples, and break down complex concepts into digestible parts.',
    parameters: {
      temperature: 0.6,
      maxTokens: 800,
      topP: 0.9,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0
    },
    tags: ['education', 'explanation', 'learning'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];