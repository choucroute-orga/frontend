import { PUBLIC_API_URL } from '$env/static/public'
import { z } from 'zod';

const recipeSchema = z.object({
    id: z.string(),
    author: z.string(),
    name: z.string(),
    description: z.string(),
    dish: z.string(),
    servings: z.number(),
    metadata: z.object({}),
    timers: z.array(z.object({name: z.string(), amount: z.number(), unit: z.string()})),
    ingredients: z.array(z.object({id: z.string(), amount: z.number(), unit: z.string()})),
    steps: z.array(z.string()),
})

const recipesSchema = z.array(recipeSchema);

export const load = async ({cookies}) => {

    const response = await fetch(`${PUBLIC_API_URL}/recipe`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
 } );
    const apiData = await response.json();
    // Try to validate the data
    const recipes = recipesSchema.safeParse(apiData);
    if (!recipes.success) {
        console.error('Error while validating the data', recipes.error);
        return {
            recipes: []
        }
    }
    const {data} = recipes;
    return {
        recipes: data
    }
}