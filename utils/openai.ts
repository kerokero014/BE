// utils/openai.ts
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// callOpenAIApi stays the same, using `openai`:
export const callOpenAIApi = async (prompt: string): Promise<string> => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful chef that returns recipes in JSON format.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });
        console.log(response);
        return response.choices[0].message.content || '';
    } catch (error: any) {
        if (error.response?.status === 429) {
            throw new Error('Rate limit exceeded. Please try again later.');
        } else if (error.response?.status === 401) {
            throw new Error('Invalid OpenAI API key.');
        }
        throw new Error('Failed to fetch data from OpenAI.');
    }
};
