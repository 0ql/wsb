<script lang="ts">
	import { getContext } from "svelte";
	export let currentStock;

	const chart: any = getContext('chart')
</script>

<div on:click={chart.drawStock(currentStock)} class="mt-2 rounded-lg text-white mr-5 px-6 py-3 bg-3 cursor-pointer border-2 border-transparent hover:border-blue-600">
	{currentStock.toUpperCase()}
</div>