import { PUBLIC_API_URL } from '$env/static/public';
import { setUser, userSchema } from '../../shared.svelte.js';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { apiErrorSchema, type FormResponse } from '$lib';

const signinSchema = z.object({
	username: z.string().trim().min(4, { message: 'Username must be at least 4 characters long' }),
	password: z.string().trim().min(8, { message: 'Password must be at least 8 characters long' })
});

export const actions: Actions = {
	default: async ({ cookies, request }): Promise<FormResponse<{ message: string }>> => {
		const formData = await request.formData();
		const signinObject: any = {};
		for (const pair of formData.entries()) {
			signinObject[pair[0]] = pair[1];
		}
        const signinData = signinSchema.safeParse(signinObject);

		if (!signinData.success) {
			// Loop through the errors array and create a custom errors array
			const errors = signinData.error.issues.map(
				(issue) => `${issue.path[0]} ${issue.message.toLowerCase()}`
			);
			return fail(422, {
				error: true,
				errors,
				message: 'Validation error',
				status: 422
			});
		}

		// Extract the username and password from the signupData object and send a POST request to the login endpoint
		const { data } = signinData;
		const response = await fetch(`${PUBLIC_API_URL}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		// If the response is successful, extract and set the user data
		if (response.ok) {
			const apiData = await response.json();
			const userData = userSchema.safeParse(apiData);

			if (!userData.success) {
				const errors = userData.error.issues.map(
                    (issue) => `${issue.path[0]} ${issue.message.toLowerCase()}`
                );
				return fail(500, { error: true, errors, message: 'Internal Server Error', status: 500 });
			}
			const user = userData.data;
			// setUser(user);
            console.log(user);
			// Set the cookie with the user token
			cookies.set('sessionid', JSON.stringify(user), {
				secure: true,
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 24 * 7,
				path: '/'
			});
		}
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
