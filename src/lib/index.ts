import { z } from 'zod';

// place files you want to import through the `$lib` alias in this folder.
export type FormResponse<T> = {
	success?: boolean;
	status: number;
	body?: T;
	error?: boolean;
	errors?: string[];
};

export const apiErrorSchema = z.object({
	error: z.boolean(),
	errors: z.array(z.string()).optional(),
	message: z.string(),
	issued_at: z.string(),
	code: z.number().min(400).max(599)
});
