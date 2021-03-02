<script lang="ts">
	export let el

	let paused = false

	const play = (e) => {
		if (!paused) e.target.play()
		else e.target.pause()
		paused = !paused
	}
</script>

<!-- <video
	src={el.data.secure_media.reddit_video.fallback_url}
	on:mousedown={play}>
	<track kind="captions">
</video> -->

<video
	controls
	preload="auto"
	width="640"
	height="264"
	src={el.data.secure_media.reddit_video.fallback_url}
	on:mousedown={play}>
>
<p class="vjs-no-js">
	To view this video please enable JavaScript, and consider upgrading to a
	web browser that
	<a href="https://videojs.com/html5-video-support/" target="_blank"
		>supports HTML5 video</a>
</p>
<track kind="captions">
</video>