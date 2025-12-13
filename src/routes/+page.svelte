<script>
	import ChristmasAnimation from '$lib/ChristmasAnimation.svelte';
	import Button from '$lib/Button.svelte';
	import ChristmasCountdown from '$lib/ChristmasCountdown.svelte';
	import XmasTree from '$lib/XmasTree.svelte';
	import { goto } from '$app/navigation';

	function comingSoon() {
		alert('Coming very soon!');
	}

	function goToDays() {
		goto('/submit');
	}

	function faq() {
		goto('/faq');
	}
</script>

<ChristmasCountdown />
<ChristmasAnimation />
<XmasTree />

<div class="button-container">
	<Button on:click={goToDays}>Submit</Button>
	<Button on:click={comingSoon}>Shop</Button>
	<Button on:click={faq}>FAQ</Button>
	<Button href="/auth/logout">Log Out</Button>
</div>

<style>
	.button-container {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 1rem;
		z-index: 200;
	}
</style>
