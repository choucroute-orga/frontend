import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, params }): Promise<{ status: number; body: { message: string } }> => {
		const formData = await request.formData();

		// create an object from the form data
		let obj: any = {};
		for (const pair of formData.entries()) {
			obj[pair[0]] = pair[1];
		}
		console.log(JSON.stringify(obj));
		const title = formData.get('title');
		console.log(title);
		const body = formData.get('body');
		console.log(body);
		return {
			status: 200,
			body: {
				message: `This is the recipe page with id ${params.id}`
			}
		};
	}
};
