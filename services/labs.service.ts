// services/labs.service.ts
import prisma from '../prisma/seed';
import { generateWithGemini } from '../utils/gemini';
import { GeneratedRecipe } from '../types/recipe.types';
import { saveRecipeForUser } from '../models/saveRecipe.model';

/**
 * Extract the first JSON object found in `text`.
 * Throws if none found.
 */
function extractJson(text: string): string {
    const cleaned = text
        .replace(/```(?:json)?/gi, '')
        .replace(/```/g, '')
        .trim();

    // Now extract the JSON
    const match = cleaned.match(/\{[\s\S]*\}$/);
    if (!match) {
        throw new Error('No JSON object found in response');
    }
    return match[0];
}

export const generateRecipe = async (craving: string, userId: number): Promise<GeneratedRecipe> => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { allergies: true, dislikes: true, favoriteFoods: true },
    });
    if (!user) throw new Error('User not found');

    const allergies = user.allergies.map((a) => a.name).join(', ') || 'None';
    const dislikes = user.dislikes.map((d) => d.name).join(', ') || 'None';
    const favorites = user.favoriteFoods.map((f) => f.name).join(', ') || 'None';

    const fullPrompt = `
You are a JSON generator.  
Generate a detailed recipe based on this craving: "${craving}".  
- Allergies to avoid: ${allergies}.  
- Dislikes: ${dislikes}.  
- Favorite foods to include: ${favorites}.  

**IMPORTANT**:  
Respond with ONLY the raw JSON object. Do NOT use triple backticks or say anything else.
The JSON must match exactly this schema:
{
  "title": string,
  "description": string,
  "nutritionalValue": string,
  "instructions": string,
  "steps": [{ "step": string, "order": number }]
}
`;

    // 1) call Gemini
    const raw = await generateWithGemini(fullPrompt);

    // 2) try to extract just the JSON
    let jsonText: string;
    try {
        jsonText = extractJson(raw);
    } catch (e) {
        console.error('🛑 Raw Gemini response (no JSON found):\n', raw);
        throw new Error(
            'Failed to extract JSON from Gemini response. See server logs for raw output.',
        );
    }

    // 3) parse it
    let parsed: GeneratedRecipe;
    try {
        parsed = JSON.parse(jsonText);
    } catch (e) {
        console.error('🛑 Extracted JSON was invalid:\n', jsonText);
        throw new Error(
            'Failed to parse extracted JSON from Gemini response. See server logs for the snippet.',
        );
    }

    const savedRecipe = await prisma.recipe.create({
        data: {
            title: parsed.title,
            description: parsed.description,
            nutritionalValue: parsed.nutritionalValue,
            steps: {
                create: parsed.steps,
            },
        },
    });

    await saveRecipeForUser(userId, savedRecipe.id);

    return parsed;
};
