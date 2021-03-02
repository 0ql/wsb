<script>
	import Chart from "./components/Chart.svelte";
	import Feed from "./components/Feed.svelte";
</script>

<main class="flex">
	<!-- Left vertical navigation bar -->
	<nav class="border-b bg-secondary w-12 h-screen fixed">
		<div
			on:click={() => window.open("https://www.reddit.com/r/wallstreetbets/")}
			class="absolute cursor-pointer bottom-2 mb-10"
			style="margin-left: 0.4rem"
		>
			<svg
				class="fill-current"
				height="28"
				width="28"
				viewBox="0 0 16 16"
				version="1.1"
				aria-hidden="true"
				><path
					fill-rule="evenodd"
					d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"
				/></svg
			>
		</div>
		<div
			on:click={() => window.open("https://github.com/0ql/wsb")}
			class="absolute cursor-pointer bottom-2"
			style="margin-left: 0.6rem"
		>
			<svg
				class="fill-current"
				height="28"
				width="28"
				viewBox="0 0 16 16"
				version="1.1"
				aria-hidden="true"
				><path
					fill-rule="evenodd"
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
				/></svg
			>
		</div>
	</nav>
	<div class="ml-12 w-full">
		<nav
			class="fixed w-full bg-main text-white pl-5 py-2 border-b border-secondary text-sm font-bold"
		>
			WSB Technicals
		</nav>
		<div class="flex w-full">
			<Chart />
			<Feed />
		</div>
	</div>
</main>

<style lang="scss" global>
	.bg-secondary {
		background-color: #2d2e3c;
	}

	.bg-main {
		background-color: #242532;
	}

	.bg-3 {
		background-color: #2f3240;
	}

	.bg-3-h:hover {
		background-color: #2f3240;
	}

	.border-secondary {
		border-color: #2d2e3c;
	}

	::-webkit-scrollbar {
		width: 13px;
		height: 13px;
	}
	::-webkit-scrollbar-thumb {
		background: linear-gradient(13deg, #2d2e3c 14%, #2d2f3f 64%);
		border-radius: 2px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(13deg, #323342 14%, #313344 64%);
	}
	::-webkit-scrollbar-track {
		background: #242532;
	}
</style>
