<script lang="ts">
	import { getContext } from "svelte";
	import StockBox from "./StockBox.svelte"

	const chart: any = getContext('chart')
</script>

<div>
	<div class="text-xs mt-4 color-3">Recent Stocks</div>
	<div class="flex">
		{#each chart.recent.slice().reverse() as el, i}
			{#if i !== 0}
				<StockBox currentStock={el} />
			{/if}
		{/each}
	</div>
</div>