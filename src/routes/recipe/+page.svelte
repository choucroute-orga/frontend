<script>
	import { enhance } from '$app/forms';
	const { data } = $props();
</script>

<h1 class="text-2xl">Recipes</h1>

{#if data.recipes.length > 0}
	<div class="flex justify-start gap-4 p-4">
		{#each data.recipes as recipe}
			<div class="join join-vertical items-center">
				<img
					src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
					class="z-10 -mb-8 rounded mask mask-squircle w-32 shadow-xl"
				/>
				<a href={`/recipe/${recipe.id}`}>
					<div class="card card-compact border input-bordered bg-base-100 w-64">
						<div class="card-body">
							<h2 class="card-title">
								{recipe.name}
								<div class="badge badge-secondary">NEW</div>
							</h2>
							<p>{recipe.description}</p>
							<div class="card-actions justify-start">
								<div class="badge badge-outline">{recipe.servings} servings</div>
								<div class="badge badge-outline">{recipe.ingredients.length} ing</div>
							</div>
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
{:else}
	<p>No recipes found</p>
{/if}
