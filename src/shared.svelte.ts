import { writable } from 'svelte/store';
import { z } from 'zod';

export const userSchema = z.object({
	id: z.string(),
	username: z.string().trim().min(3),
	email: z.string().email(),
	token: z.string()
});

type User = z.infer<typeof userSchema>;

export const user: User = $state({
	id: '',
	username: '',
	email: '',
	token: ''
});

export const setUser = (newUser: User) => {
	user.id = newUser.id;
	user.username = newUser.username;
	user.email = newUser.email;
	user.token = newUser.token;
};
