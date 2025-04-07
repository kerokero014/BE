export interface RecipeStep {
    step: string;
    order: number;
}

export interface GeneratedRecipe {
    title: string;
    description: string;
    nutritionalValue: string;
    instructions: string;
    steps: RecipeStep[];
}
