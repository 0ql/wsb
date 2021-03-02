<script lang="ts">
	import * as j from "./namespace";
	import Loading from "../assets/loading.svelte";
	import App from "src/App.svelte";
	import Video from "./Video.svelte";

	let data: j.Data;
	let el: j.Data2;
	let feedEl: HTMLElement;

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

	const span = document.createElement('span');
  const decodeHTMLEntities = (text) => {
    return text
    .replace(/&[#A-Za-z0-9]+;/gi, (entity,position,text)=> {
			span.innerHTML = entity;
			return span.innerText;
    });
  }
</script>

<div
	class="w-1/2 h-screen overflow-hidden overflow-y-scroll pt-12"
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
		{#each data.children as el}
			<div class="mt-5 rounded-lg flex bg-secondary text-white">
				<div class="bg-3 rounded-l-lg">
					<div class="text-xs m-2">{parse(el.data.ups)}</div>
				</div>
				<div class="m-3">
					<div class="text-xs flex">
						<div>{"u/" + el.data.author}</div>
						<div class="ml-2">{toDateTime(el.data.created)}</div>
					</div>
					<div>
						<div class="mt-1 mb-3">{el.data.title}</div>
						{#if el.data.selftext !== ""}
							<!-- Komment -->
							<div class="text-sm">
								{@html (() => decodeHTMLEntities(el.data.selftext_html))()}
							</div>
						{:else if (el.data.secure_media // 👈 null and undefined check
							&& Object.keys(el.data.secure_media).length !== 0 && el.data.secure_media.constructor === Object)}
							<!-- Video -->
							{(()=>{console.log("####",el.data.secure_media.reddit_video)})()}
							<div>
								<Video el={el.data.secure_media} />
							</div>
						{:else}
							<!-- Image -->
							<div>
								<img src={el.data.url} alt="ka" />
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style global>
	a {
		color: rgb(97, 147, 240);
	}
</style>