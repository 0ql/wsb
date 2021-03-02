<script lang="ts">
	import Chart from "./components/Chart.svelte";
	import Feed from "./components/Feed.svelte";
</script>

<main class="flex">
	<!-- Left vertical navigation bar -->
	<nav class="border-b bg-secondary w-12 fixed h-screen">
		<a href="https://z6q.github.io/GuessingPictures/">Das Dokument auf Github</a>
	</nav>
	<div class="ml-12 w-full">
		<nav class="fixed w-full bg-main text-white pl-5 py-2 border-b border-secondary text-sm font-bold">
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