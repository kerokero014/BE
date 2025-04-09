// utils/gemini.ts
import { GoogleGenAI } from '@google/genai';

export const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export const generateWithGemini = async (prompt: string): Promise<string> => {
    const response = await gemini.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
    });
    return response.text ?? '';
};
