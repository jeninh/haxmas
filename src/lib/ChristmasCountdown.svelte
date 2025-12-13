<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	let interval: NodeJS.Timeout;

	function updateCountdown() {
		const now = new Date();
		const currentYear = now.getFullYear();
		let christmas = new Date(currentYear, 11, 25);

		if (now > christmas) {
			christmas = new Date(currentYear + 1, 11, 25);
		}

		const diff = christmas.getTime() - now.getTime();

		days = Math.floor(diff / (1000 * 60 * 60 * 24));
		hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((diff % (1000 * 60)) / 1000);
	}

	onMount(() => {
		updateCountdown();
		interval = setInterval(updateCountdown, 1000);
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" />
</svelte:head>

<div id="countdown_container">
	<div class="countdown-globe">
		{days}
		<div class="label">Days</div>
	</div>
	<div class="countdown-globe">
		{hours}
		<div class="label">Hours</div>
	</div>
	<div class="countdown-globe">
		{minutes}
		<div class="label">Minutes</div>
	</div>
	<div class="countdown-globe">
		{seconds}
		<div class="label">Seconds</div>
	</div>
</div>

<style>
	#countdown_container {
		width: 600px;
		position: fixed;
		left: 50%;
		margin-left: -300px;
		top: 0;
		text-align: center;
		font-size: 40px;
		color: #fff;
		font-family: 'Lobster', cursive;
		z-index: 200;
		display: flex;
	}

	.countdown-globe {
		width: 150px;
		height: 200px;
		text-align: center;
		padding-top: 65px;
		line-height: 1.3;
		position: relative;
		box-sizing: border-box;
	}

	.countdown-globe .label {
		font-size: 20px;
	}

	.countdown-globe::after {
		content: '';
		background: url('http://awesome-coding.com/theme/images/countdown-globe.png');
		background-repeat: no-repeat;
		background-size: contain;
		width: 110px;
		height: 200px;
		position: absolute;
		left: 50%;
		margin-left: -55px;
		top: -40px;
		z-index: -1;
	}

	@media (max-width: 565px) {
		#countdown_container {
			width: 100%;
			margin-left: 0;
			left: 0;
			font-size: 30px;
		}

		.countdown-globe::after {
			display: none;
		}

		.countdown-globe {
			padding-top: 45px;
		}
	}

	@media (max-height: 768px) {
		#countdown_container {
			font-size: 30px;
		}

		.countdown-globe {
			height: 180px;
			padding-top: 55px;
		}

		.countdown-globe::after {
			margin-left: -50px;
			width: 100px;
		}
	}

	@media (max-height: 600px) {
		#countdown_container {
			font-size: 20px;
		}

		.countdown-globe {
			height: 165px;
			padding-top: 55px;
		}

		.countdown-globe::after {
			margin-left: -46px;
			width: 92px;
		}
	}
</style>
