<script lang="ts">
	import Video from "./Video.svelte";

	export let el;
	let full = false

	const span = document.createElement("span");
	const decodeHTMLEntities = (text) => {
		return text.replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
			span.innerHTML = entity;
			return span.innerText;
		});
	};

	/** Parse Number for shorter length */
	const parse = (num: number) => {
		if (num > 999) {
			return Math.round(num / 1000) + "k";
		}
		return num;
	};

	const toDateTime = (secs: number) => {
		let t = new Date(1970, 0, 1); // Epoch
		t.setSeconds(secs);
		return t.toDateString();
	};
</script>

<div class="mt-5 rounded-lg flex bg-secondary text-white">
	<div class="bg-3 rounded-l-lg">
		<div class="text-xs w-8 text-center pt-2">{parse(el.data.ups)}</div>
	</div>
	<div class="m-3 overflow-hidden h-12"
		class:full={full}
		on:click={() => full = !full}
	>
	<div class="text-xs flex">
		<div>{"u/" + el.data.author}</div>
		<div class="ml-2">{toDateTime(el.data.created)}</div>
	</div>
	<div class="mt-1 mb-3">{el.data.title}</div>
		{#if el.data.selftext !== ""}
			<!-- Komment -->
			<div class="text-sm">
				{@html (() => decodeHTMLEntities(el.data.selftext_html))()}
			</div>
		{:else if el.data.secure_media && Object.keys(el.data.secure_media).length !== 0 && el.data.secure_media.constructor === Object} // 👈 null and undefined check
			<!-- Video -->
			{(() => {
				console.log("####", el.data.secure_media.reddit_video);
			})()}
			<div>
				<Video el={el.data.secure_media} />
			</div>
		{:else}
			<!-- Image & Gif -->
			<div>
				<img src={el.data.url} alt="ka" />
			</div>
		{/if}
	</div>
</div>


<style>
	.full {
		height: auto;
	}
</style>