<script lang="ts">
	import { enhance } from '$app/forms';
	import { text } from '@sveltejs/kit';
	let { form } = $props();
	let password = $state('');
	let confirmPassword = $state('');
	let username = $state('');
	let email = $state('');
	let signupFocus = $state(false);
	let errorForm = $state(false);
	$effect(() => {
		if (password !== confirmPassword && signupFocus) {
			errorForm = true;
		} else {
			errorForm = false;
		}
	});
</script>

{#snippet passwordCondition(message: string, valid: boolean)}
	<div
		class:text-error={!valid}
		class:text-success={valid}
		class="join join-horizontal items-center justify-center"
	>
		{#if !valid}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 20 20"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 12l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 20 20"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 10l2 2 4-4m6 2a9 9 0 0 9 9 0 0118 0z"
				/>
			</svg>
		{/if}
		<p class:italic={!valid}>
			{message}
		</p>
	</div>
{/snippet}

<div class="flex flex-col items-center gap-5 justify-center mt-10">
	<h1 class="text-2xl font-bold">Sign up to Choucroute</h1>
	<span>{JSON.stringify(form)}</span>
	{#if form?.status === 201}
		<div>
			<div role="alert" class="alert alert-success">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>{form?.body?.message}</span>
			</div>
			<a href="/sign-in" class="mt-4 btn btn-sm btn-link">Sign in </a>
		</div>
	{/if}
	{#if form?.errors}
		<div role="alert" class="alert alert-error">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<div>
				{#each form.errors as error}
					<p>{error}</p>
				{/each}
			</div>
		</div>
	{/if}
	<form use:enhance method="post" class="card card-compact shadow-xl border input-bordered">
		<div class="card-body">
			<label class="input input-bordered flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					class="h-4 w-4 opacity-70"
				>
					<path
						d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
					/>
				</svg>
				<input
					name="username"
					bind:value={username}
					type="text"
					class="grow"
					placeholder="Username"
					required
				/>
			</label>
			<label class="input input-bordered flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					class="h-4 w-4 opacity-70"
				>
					<path
						d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
					/>
					<path
						d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
					/>
				</svg>
				<input name="email" bind:value={email} type="text" class="grow" placeholder="Email" />
			</label>
			<label class="input input-bordered flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					class="h-4 w-4 opacity-70"
				>
					<path
						fill-rule="evenodd"
						d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
						clip-rule="evenodd"
					/>
				</svg>
				<input
					name="password"
					bind:value={password}
					autocomplete="off"
					type="password"
					class="grow"
					placeholder="Password"
					required
				/>
			</label>
			<div class="gap-0 join join-vertical mt-0">
				{@render passwordCondition('Contains at least 8 caracters', password.length >= 8)}
				{@render passwordCondition('Contains at least 1 uppercase letter', /[A-Z]/.test(password))}
				{@render passwordCondition('Contains at least 1 lowercase letter', /[a-z]/.test(password))}
				{@render passwordCondition('Contains at least 1 number', /[0-9]/.test(password))}
				{@render passwordCondition(
					'Contains at least 1 special character',
					/[^A-Za-z0-9]/.test(password)
				)}
			</div>
			<label class="input input-bordered flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					class="h-4 w-4 opacity-70"
				>
					<path
						fill-rule="evenodd"
						d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
						clip-rule="evenodd"
					/>
				</svg>
				<input
					onfocusout={() => {
						signupFocus = true;
					}}
					bind:value={confirmPassword}
					autocomplete="off"
					type="password"
					class="grow"
					placeholder="Confirm password"
					required
				/>
			</label>
			{#if password !== confirmPassword && signupFocus}
				{@render passwordCondition('Passwords do not match', false)}
			{/if}
			<button class="btn btn-secondary" disabled={errorForm} type="submit">Sign up</button>
		</div>
	</form>
</div>
