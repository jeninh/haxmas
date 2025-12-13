<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let day: number;
	export let boxColor: string = 'hsla(-150, 45%, 45%, 1)';
	export let ribbonColor: string = 'hsla(30, 45%, 70%, 0.75)';
	export let width: number = 80;
	export let height: number = 60;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button class="present-button" on:click={handleClick}>
	<svg viewBox="0 0 {width + 20} {height + 40}" class="present-svg">
		<text
			x={(width + 20) / 2}
			y="20"
			text-anchor="middle"
			fill="white"
			font-size="16"
			font-weight="bold"
		>
			Day {day}
		</text>
		<rect x="10" y="30" {width} {height} fill={boxColor} />
		<rect x="10" y={30 + (height - 6) / 2} {width} height="6" fill={ribbonColor} />
		<rect x={10 + (width - 6) / 2} y="30" width="6" {height} fill={ribbonColor} />
	</svg>
</button>

<style>
	.present-button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.present-button:hover {
		transform: scale(1.1) translateY(-10px);
	}

	.present-svg {
		width: 120px;
		height: auto;
		display: block;
	}
</style>
