<script>
	import { onMount } from "svelte";
	export let el;

	onMount(() => {
		let video = document.getElementById("video");
		let videoSrc = "https://v.redd.it/1fkc75aceck61/HLSPlaylist.m3u8";

		if (Hls.isSupported()) {
			let hls = new Hls();
			hls.loadSource(videoSrc);
			hls.attachMedia(video);
		} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
			video.src = videoSrc;
		}
	});
</script>

<video id="video" controls>
	<track kind="captions" />
</video>

<!-- <video
	poster="https://external-preview.redd.it/VZXWVf5Fkqu5-rqICysn9t9P9dCUe-Zmi4fiT6w5ypQ.png?width=320&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=6bfeee6756b6c81267e7193d75f16cf34562d027"
	preload="auto"
	controls
	src="https://www.reddit.com/78abbc23-1d14-4cc2-a381-d5e6572828d3"
>
	<source
		src="https://v.redd.it/1fkc75aceck61/HLSPlaylist.m3u8?a=1617298010%2CYmI5MjIzMWI2NjIwNTM3ZTAxNGRmMWYzODQ0YWI5ZDhhYzhmMjg0NWU4M2IzMGUzNjc2NmNkNWU5MDU4ZTIxOQ%3D%3D&amp;v=1&amp;f=sd"
		type="application/vnd.apple.mpegURL"
	/>
	<track kind="captions" />
</video> -->