import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const callOpenAIApi = async (prompt: string): Promise<string> => {
    try {
        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 1000,
        });
        return response.choices[0].text || '';
    } catch (error: any) {
        if (error.response?.status === 429) {
            throw new Error('Rate limit exceeded. Please try again later.');
        } else if (error.response?.status === 401) {
            throw new Error('Invalid OpenAI API key.');
        }
        throw new Error('Failed to fetch data from OpenAI.');
    }
};