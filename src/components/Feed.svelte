<script lang="ts">
	import * as j from "./namespace";
	import Loading from "../assets/loading.svelte";
	import Post from "./Post.svelte";

	let data: j.Data;
	let el: j.Data2;
	let feedEl: HTMLElement;

	/** Reddit json Api*/
	const requestJson = (filter: string) => {
		data = undefined;
		fetch(`https://www.reddit.com/r/wallstreetbets/${filter}.json?count=20`)
			.then((res) => res.json())
			.then((json) => {
				data = json.data;
				console.log(data);
			});
	};

	requestJson("hot");
</script>

<div
	class="h-screen overflow-hidden overflow-scroll pt-12"
	style="width: 48vw;"
	bind:this={feedEl}
>
	{#if !data}
		<Loading />
	{:else}
		<div class="flex color-2 cursor-pointer mt-3">
			<div
				on:click={() => requestJson("hot")}
				class="bg-secondary rounded-l-lg p-1 px-3 mr-sm bg-3-h"
			>
				Hot
			</div>
			<div
				on:click={() => requestJson("new")}
				class="bg-secondary p-1 px-3 mr-sm bg-3-h"
			>
				New
			</div>
			<div
				on:click={() => requestJson("top")}
				class="bg-secondary p-1 px-3 mr-sm bg-3-h"
			>
				Top
			</div>
			<div
				on:click={() => requestJson("rising")}
				class="bg-secondary rounded-r-lg p-1 px-3 bg-3-h"
			>
				Rising
			</div>
		</div>
		<div class="mr-3">
			{#each data.children as el}
				<Post {el} />
			{/each}
		</div>
	{/if}
</div>

<style global>
	a {
		color: rgb(97, 147, 240);
	}
</style>
