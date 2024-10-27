import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { apiErrorSchema, type FormResponse } from '$lib';
import { z } from 'zod';
import { PUBLIC_API_URL } from '$env/static/public';
import { setUser, userSchema } from '../../shared.svelte';

const signupSchema = z.object({
	username: z.string().trim().min(4, { message: 'Username must be at least 4 characters long' }),
	email: z.string().email("Invalid email address"),
	password: z.string().trim().min(8, { message: 'Password must be at least 8 characters long' })
});

export const actions: Actions = {
	default: async ({ request }): Promise<FormResponse<{ message: string }>> => {
		const formData = await request.formData();
		const signupObject: any = {};
		for (const pair of formData.entries()) {
			signupObject[pair[0]] = pair[1];
		}
		const signupData = signupSchema.safeParse(signupObject);
		console.log(JSON.stringify(signupData));
		if (!signupData.success) {
			// Loop through the errors array and create a custom errors array
			const errors = signupData.error.issues.map(
				(issue) => issue.message
			);
			return fail(422, {
				error: true,
				errors,
				message: 'Validation error',
				status: 422
			});
		}

		// Extract the username and password from the signupData object and send a POST request to the login endpoint
		const { data } = signupData;
		const response = await fetch(`${PUBLIC_API_URL}/api/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		// If the response is successful, extract and set the user data
		if (response.ok) {
			return {
				status: 201,
				body: {
					message: 'User created successfully'
				}
			};
		}
		// If the response is not succesful, try to read the body, parse it a s an APIError object and return the error
		try {
			const apiSchema = await response.json();
			const apiData = apiErrorSchema.safeParse(apiSchema);
			if (!apiData.success) {
				// Loop through the errors array and create a custom errors array
				const errors = apiData.error.issues.map(
					(issue) => `${issue.path[0]} ${issue.message.toLowerCase()}`
				);
				return fail(500, {
					error: true,
					errors,
					message: 'Internal Server Error',
					status: 500
				});
			}
			const { data } = apiData;

			return fail(data.code, {
				error: true,
				errors: data.errors,
				message: data.message,
				status: data.code
			});
		} catch (error) {
			return fail(500, { error: true, message: 'Internal Server Error', status: 500 });
		}
	}
};
