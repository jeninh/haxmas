<script lang="ts">
  import { onMount } from 'svelte';

  interface Present {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    ribbonColor: string;
  }

  let presents: Present[] = [];
  let containerWidth = 0;

  const seed = new Date().getTime();
  let currentSeed = seed;

  function random() {
    let x = Math.sin(currentSeed++) * 10000;
    return x - Math.floor(x);
  }

  function range(v = 0, omin = 0, omax = 1, nmin = 0, nmax = 1) {
    return (v - omin) * (nmax - nmin) / (omax - omin) + nmin;
  }

  function generatePresents(width: number): Present[] {
    currentSeed = seed;
    const generated: Present[] = [];
    
    let bh = range(random(), 0, 1, -90, 90);
    let bs = range(random(), 0, 1, 45, 55);
    let bl = range(random(), 0, 1, 50, 65);
    const garlandColor = `hsla(${bh + 120},${bs}%,${bl + 15}%,0.75)`;
    
    let presentBs = range(random(), 0, 1, 35, 45);
    let presentBh = range(random(), 0, 1, -120, 120);
    
    let ox = width * 0.5;
    let offset = 0;

    for (let i = 0; i < 12; i++) {
      let w = Math.floor(range(random(), 0, 1, 30, 110));
      let h = Math.floor(range(random(), 0, 1, 30, 110));
      let spread = (width / 2) - 50;
      let x = Math.floor(ox + range(random(), 0, 1, -spread, spread) - w * 0.5);
      let y = offset;

      let presentBl = range(random(), 0, 1, 35, 85);
      const presentColor = `hsla(${presentBh - 120},${presentBs}%,${presentBl - 15}%,1.0)`;

      generated.push({
        x,
        y,
        width: w,
        height: h,
        color: presentColor,
        ribbonColor: garlandColor
      });

      offset += range(random(), 0, 1, 3, 8);
    }

    return generated;
  }

  function comingSoon() {
    alert("Coming very soon!");
  }

  function handleClick(index: number) {
    if (index === 0) {
      window.location.href = '/day1';
    } else {
      comingSoon();
    }
  }

  onMount(() => {
    function resize() {
      containerWidth = window.innerWidth;
      presents = generatePresents(containerWidth);
    }

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  });
</script>

<div class="presents-container">
  {#each presents as present, i}
    <div class="present-wrapper" style="left: {present.x}px; bottom: {present.y}px;">
      {#if i === 0}
        <span class="day-label">Day 1</span>
      {/if}
      <button
        class="present"
        style="width: {present.width}px; height: {present.height}px;"
        on:click={() => handleClick(i)}
        aria-label="Present {i + 1}"
      >
        <svg viewBox="0 0 {present.width} {present.height}" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <rect x="0" y="0" width="{present.width}" height="{present.height}" fill="{present.color}" />
          <rect x="0" y="{(present.height - 5) / 2}" width="{present.width}" height="5" fill="{present.ribbonColor}" />
          <rect x="{(present.width - 5) / 2}" y="0" width="5" height="{present.height}" fill="{present.ribbonColor}" />
        </svg>
      </button>
    </div>
  {/each}
</div>

<style>
  .presents-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    z-index: 50;
    pointer-events: none;
  }

  .present-wrapper {
    position: absolute;
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .day-label {
    color: white;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .present {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    transition: transform 0.2s ease;
  }

  .present:hover {
    transform: scale(1.1) translateY(-5px);
  }

  .present svg {
    display: block;
  }
</style>
