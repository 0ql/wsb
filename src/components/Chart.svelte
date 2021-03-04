<script lang="ts">
	import { onMount, setContext } from "svelte";
	import { mainChart } from "./chart";
	import StockBox from "./StockBox.svelte";
	import Loading from "../assets/loading.svelte";
	import Line from "../assets/line.svelte";
	import Candles from "../assets/candles.svelte";
	import Recent from "./Recent.svelte";

	let chart,
		chartEl,
		input,
		currentStock: string = "GME";
	let loaded: boolean = false,
		visibility: string = "block";

	export const hide = () => {
		loaded = false;
		visibility = "none";
	};

	export const show = () => {
		loaded = true;
		visibility = "block";
	};

	chart = new mainChart(hide, show);

	setContext("chart", chart);

	onMount(() => {
		chart.init(chartEl);

		chart.drawStock(currentStock, "daily", true, () => {
			loaded = true;
			setInterval(() => {
				currentStock = chart.currentStock;
			}, 1000);
		});
	});

	const search = () => {
		chart.drawStock(input, undefined, true);
	};
</script>

<div class="w-1/2 h-screen overflow-y-scroll overflow-hidden pt-10">
	{#if !loaded}
		<Loading />
	{:else}
		<div class="p-5">
			<!-- First Line -->
			<div class="flex">
				<input
					type="text"
					bind:value={input}
					class="pl-4 py-2 text-xs bg-secondary rounded-lg outline-none color-2 mr-5 bg-3-h focus:ring-2 focus:ring-blue-600"
					placeholder="Search"
					on:change={search}
				/>
				<div class="flex cursor-pointer mr-5 color-2">
					<div
						on:click={chart.createAreaSeries()}
						class="bg-secondary rounded-l-lg p-1 pt-2 px-2 mr-sm bg-3-h"
					>
						<Line />
					</div>
					<div
						on:click={chart.createCandles()}
						class="bg-secondary rounded-r-lg p-1 px-3 bg-3-h"
					>
						<Candles />
					</div>
				</div>
				<div class="flex color-2 cursor-pointer">
					<div
						on:click={chart.drawStock(currentStock, "1min")}
						class="bg-secondary rounded-l-lg p-1 px-3 mr-sm bg-3-h"
					>
						1M
					</div>
					<div
						on:click={chart.drawStock(currentStock, "15min")}
						class="bg-secondary p-1 px-3 mr-sm bg-3-h"
					>
						15M
					</div>
					<div
						on:click={chart.drawStock(currentStock, "60min")}
						class="bg-secondary p-1 px-3 mr-sm bg-3-h"
					>
						H
					</div>
					<div
						on:click={chart.drawStock(currentStock, "daily")}
						class="bg-secondary p-1 px-3 mr-sm bg-3-h"
					>
						D
					</div>
					<div
						on:click={chart.drawStock(currentStock, "weekly")}
						class="bg-secondary p-1 px-3 mr-sm bg-3-h"
					>
						W
					</div>
					<div
						on:click={chart.drawStock(currentStock, "monthly")}
						class="bg-secondary rounded-r-lg p-1 px-3 bg-3-h"
					>
						M
					</div>
				</div>
			</div>
			<!-- Second Line -->
			<div class="flex">
				<div>
					<div class="text-xs mt-4 color-3">Displayed Stock</div>
					<StockBox {currentStock} />
				</div>
				<Recent />
			</div>
		</div>
	{/if}
	<div
		style="--visibility: {visibility}"
		class="mx-5 vis"
		bind:this={chartEl}
	/>
</div>

<style global>
	.color-2 {
		color: #9a9a9a;
	}

	.color-3 {
		color: #c9c9c9;
	}

	.search-color::placeholder {
		color: #9a9a9a;
		opacity: 1;
	}

	.mr-sm {
		margin-right: 2px;
	}

	.vis {
		display: var(--visibility);
	}
</style>
