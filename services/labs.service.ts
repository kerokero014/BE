// services/labs.service.ts
import prisma from '../prisma/seed';
import { callOpenAIApi } from '../utils/openai';
import { GeneratedRecipe } from '../types/recipe.types';

export const generateRecipe = async (craving: string, userId: number): Promise<GeneratedRecipe> => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            allergies: true,
            dislikes: true,
            favoriteFoods: true,
        },
    });

    if (!user) throw new Error('User not found');
    const allergies = user.allergies?.map((a) => a.name).join(', ') || 'None';
    const dislikes = user.dislikes?.map((d) => d.name).join(', ') || 'None';
    const favorites = user.favoriteFoods?.map((f) => f.name).join(', ') || 'None';

    const fullPrompt = `
Generate a detailed recipe based on this craving: "${craving}".
- Allergies to avoid: ${allergies || 'None'}.
- Dislikes: ${dislikes || 'None'}.
- Favorite foods to include if possible: ${favorites || 'None'}.

Return in JSON format:
{
  "title": string,
  "description": string,
  "nutritionalValue": string,
  "instructions": string,
  "steps": [{ "step": string, "order": number }]
}
`;

    const response = await callOpenAIApi(fullPrompt);
    let parsedResponse: GeneratedRecipe;

    try {
        parsedResponse = JSON.parse(response);
    } catch (error) {
        throw new Error('Failed to parse OpenAI response. Ensure the API returned valid JSON.');
    }

    return parsedResponse;
};
