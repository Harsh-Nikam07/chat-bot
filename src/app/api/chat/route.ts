import { NextRequest, NextResponse } from 'next/server';

const MOCK_RESPONSES = [
  "I understand your request. Let me provide you with a comprehensive response based on the information you've shared.",
  "That's an interesting question! Here's what I think about this topic based on my knowledge and analysis.",
  "I'd be happy to help you with that. Let me break this down into several key points for better understanding.",
  "Based on your prompt, I can offer several perspectives and solutions that might be helpful for your specific situation.",
  "Great question! This is a topic that requires careful consideration of multiple factors. Let me explain step by step.",
];

const DETAILED_RESPONSES = {
  'creative': "In a world where the boundaries between reality and imagination blur, our story begins with an unlikely protagonist who discovers that their ordinary life is about to take an extraordinary turn. The morning sun cast long shadows across the cobblestone streets as Maya hurried to her job at the local bookstore, unaware that today would change everything she thought she knew about herself and the world around her.",
  
  'code': `Here's my analysis of the code you've shared:

**Strengths:**
- Clean, readable structure
- Good variable naming conventions
- Proper error handling in most areas

**Areas for Improvement:**
1. **Performance**: Consider using memoization for expensive calculations
2. **Security**: Validate all user inputs before processing
3. **Maintainability**: Break down large functions into smaller, more focused ones

**Recommended Changes:**
\`\`\`javascript
// Example optimization
const memoizedResult = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
\`\`\`

Would you like me to elaborate on any of these points?`,

  'business': `Based on your business scenario, here's my strategic analysis:

**Market Opportunity Assessment:**
- Current market size: Significant potential for growth
- Target demographic: Well-aligned with product offering
- Competitive landscape: Moderate competition with room for differentiation

**Strategic Recommendations:**
1. **Short-term (3-6 months)**: Focus on MVP development and customer validation
2. **Medium-term (6-12 months)**: Scale marketing efforts and expand feature set
3. **Long-term (1-2 years)**: Consider market expansion and strategic partnerships

**Risk Mitigation:**
- Diversify revenue streams
- Build strong customer relationships
- Maintain financial reserves for market volatility

**Next Steps:**
Would you like me to dive deeper into any specific aspect of this analysis?`,

  'education': `Let me explain this concept in a way that's easy to understand:

Think of this like building a house. Just as a house needs a strong foundation, good planning, and the right materials, the topic we're discussing has several key components that work together.

**The Foundation (Basic Concepts):**
- Core principle #1: This is like the concrete foundation
- Core principle #2: This acts like the structural framework
- Core principle #3: This provides the finishing touches

**Building Up (Advanced Concepts):**
As we add layers of complexity, each new concept builds upon the previous ones, creating a comprehensive understanding.

**Real-World Applications:**
You can see this concept in action when... [specific examples would go here based on the actual topic]

Does this help clarify the concept? What specific aspect would you like me to explain further?`
};

export async function POST(request: NextRequest) {
  try {
    const { message, model, parameters } = await request.json();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simple keyword-based response selection
    let response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
    
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('story') || lowerMessage.includes('creative') || lowerMessage.includes('write')) {
      response = DETAILED_RESPONSES.creative;
    } else if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('function')) {
      response = DETAILED_RESPONSES.code;
    } else if (lowerMessage.includes('business') || lowerMessage.includes('strategy') || lowerMessage.includes('market')) {
      response = DETAILED_RESPONSES.business;
    } else if (lowerMessage.includes('explain') || lowerMessage.includes('teach') || lowerMessage.includes('learn')) {
      response = DETAILED_RESPONSES.education;
    }

    // Add some randomness based on temperature
    if (parameters.temperature > 0.8) {
      response += "\n\n*This response was generated with high creativity settings, so I've tried to be more imaginative and exploratory in my answer.*";
    } else if (parameters.temperature < 0.3) {
      response += "\n\n*This response was generated with low temperature settings, focusing on precision and consistency.*";
    }

    return NextResponse.json({
      response,
      model,
      usage: {
        promptTokens: Math.floor(message.length / 4),
        completionTokens: Math.floor(response.length / 4),
        totalTokens: Math.floor((message.length + response.length) / 4)
      },
      parameters
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}