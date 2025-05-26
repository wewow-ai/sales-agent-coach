// lib/openai.ts
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateFeedback(transcript: any[]) {
  const systemPrompt = `You are an AI assistant helping provide constructive feedback to customer service agents based on their recorded conversations.`;

  const userPrompt = `Here is the transcript of a customer service interaction:\n\n${JSON.stringify(transcript, null, 2)}\n\nPlease provide helpful feedback to the agent.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
  });
  return response.choices[0]?.message?.content ?? 'No feedback generated.';
}
