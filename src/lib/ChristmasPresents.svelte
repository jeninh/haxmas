<script lang="ts">
	import { onMount } from 'svelte';

	let canvasEl: HTMLCanvasElement;
	let _width: number, _height: number;
	let _color: {
		garland: string;
		presents: string;
	};
	let _c: CanvasRenderingContext2D | null;
	let _scale = 1;

	var _seed = new Date().getTime();
	var __seed = _seed;

	function random() {
		let x = Math.sin(__seed++) * 10000;
		return x - Math.floor(x);
	}

	function range(v = 0, omin = 0, omax = 1, nmin = 0, nmax = 1, clamp = false) {
		let result = ((v - omin) * (nmax - nmin)) / (omax - omin) + nmin;
		if (clamp) result = Math.min(Math.max(result, nmin), nmax);
		return result;
	}

	function setColors() {
		_color = { garland: '', presents: '' };

		let bh = range(random(), 0, 1, -90, 90);
		let bs = range(random(), 0, 1, 45, 55);
		let bl = range(random(), 0, 1, 50, 65);

		_color.garland = `hsla(${bh + 120},${bs}%,${bl + 15}%,0.75)`;
		_color.presents = `hsla(${bh - 120},${bs}%,${bl - 25}%,1.0)`;
	}

	function drawPresents() {
		let i = 0;
		let ox = _width * 0.5;
		let oy = _height;
		let offset = 0;

		if (!_c) return;

		_c.fillStyle = _color.presents;
		_c.strokeStyle = '';

		let bs = range(random(), 0, 1, 35, 45);
		let bh = range(random(), 0, 1, -120, 120);

		while (i < 12) {
			let w = Math.floor(range(random(), 0, 1, 30, 110)) * _scale;
			let h = Math.floor(range(random(), 0, 1, 30, 110)) * _scale;
			let spread = _width / 2 - 50;
			let x = Math.floor(ox + range(random(), 0, 1, -spread, spread) - w * 0.5);
			let y = Math.floor(oy - h);
			y += offset;

			let bl = range(random(), 0, 1, 35, 85);
			_color.presents = `hsla(${bh - 120},${bs}%,${bl - 15}%,1.0)`;

			_c.beginPath();
			_c.fillStyle = _color.presents;
			_c.fillRect(x, y, w, h);

			let ribbon = 5;
			_c.fillStyle = _color.garland;

			_c.fillRect(x, y + (h - ribbon) * 0.5, w, ribbon);
			_c.fillRect(x + (w - ribbon) * 0.5, y, ribbon, h);

			offset += range(random(), 0, 1, 3, 8);

			i++;
		}
	}

	function resize() {
		let ratio = window.devicePixelRatio || 1;
		__seed = _seed;
		_width = window.innerWidth * ratio;
		_height = 150 * ratio;
		canvasEl.setAttribute('width', _width.toString());
		canvasEl.setAttribute('height', _height.toString());
		canvasEl.style.width = `${_width / ratio}px`;
		canvasEl.style.height = `${_height / ratio}px`;
		render();
	}

	function render() {
		setColors();
		drawPresents();
	}

	onMount(() => {
		_c = canvasEl.getContext('2d');
		resize();
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas bind:this={canvasEl}></canvas>

<style>
	canvas {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 50;
		pointer-events: none;
	}
</style>
