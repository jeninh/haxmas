<script lang="ts">
  import ChristmasAnimationNoPresents from "$lib/ChristmasAnimationNoPresents.svelte";
  import Button from "$lib/Button.svelte";
  import Present from "$lib/Present.svelte";

  interface Day {
    day: number;
    url: string;
    boxColor: string;
    ribbonColor: string;
  }

  const days: Day[] = [
    { day: 1, url: 'https://forms.hackclub.com/haxmas-day-1', boxColor: 'hsla(-150, 45%, 45%, 1)', ribbonColor: 'hsla(30, 45%, 70%, 0.75)' },
    { day: 2, url: '#', boxColor: 'hsla(-100, 40%, 35%, 1)', ribbonColor: 'hsla(80, 40%, 60%, 0.75)' },
    { day: 3, url: '#', boxColor: 'hsla(-80, 50%, 40%, 1)', ribbonColor: 'hsla(100, 50%, 65%, 0.75)' },
    { day: 4, url: '#', boxColor: 'hsla(-200, 42%, 38%, 1)', ribbonColor: 'hsla(-20, 42%, 63%, 0.75)' },
    { day: 5, url: '#', boxColor: 'hsla(-120, 48%, 42%, 1)', ribbonColor: 'hsla(60, 48%, 67%, 0.75)' },
    { day: 6, url: '#', boxColor: 'hsla(-180, 44%, 36%, 1)', ribbonColor: 'hsla(0, 44%, 61%, 0.75)' },
    { day: 7, url: '#', boxColor: 'hsla(-140, 46%, 44%, 1)', ribbonColor: 'hsla(40, 46%, 69%, 0.75)' },
    { day: 8, url: '#', boxColor: 'hsla(-90, 50%, 40%, 1)', ribbonColor: 'hsla(90, 50%, 65%, 0.75)' },
    { day: 9, url: '#', boxColor: 'hsla(-160, 43%, 37%, 1)', ribbonColor: 'hsla(20, 43%, 62%, 0.75)' },
    { day: 10, url: '#', boxColor: 'hsla(-110, 47%, 41%, 1)', ribbonColor: 'hsla(70, 47%, 66%, 0.75)' },
    { day: 11, url: '#', boxColor: 'hsla(-130, 45%, 39%, 1)', ribbonColor: 'hsla(50, 45%, 64%, 0.75)' },
    { day: 12, url: '#', boxColor: 'hsla(-170, 41%, 43%, 1)', ribbonColor: 'hsla(10, 41%, 68%, 0.75)' },
  ];

  function goToDay(url: string) {
    if (url === '#') {
      alert('Coming soon! Check back later');
    } else {
      window.location.href = url;
    }
  }

  function goBack() {
    window.location.href = '/';
  }
</script>

<ChristmasAnimationNoPresents />

<div class="container">
  <h1>Choose a day to submit</h1>
  
  <div class="days-grid">
    {#each days as day}
      <Present 
        day={day.day}
        boxColor={day.boxColor}
        ribbonColor={day.ribbonColor}
        on:click={() => goToDay(day.url)}
      />
    {/each}
  </div>

  <div class="back-button">
    <Button on:click={goBack}>Back</Button>
  </div>
</div>

<style>
  .container {
    position: relative;
    z-index: 100;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    padding-bottom: 200px;
  }

  h1 {
    color: #fff;
    font-size: 3rem;
    margin-bottom: 3rem;
    text-align: center;
  }



  .days-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    max-width: 600px;
    width: 100%;
  }

  @media (max-width: 768px) {
    .days-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 480px) {
    .days-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .back-button {
    margin-top: 2rem;
  }
</style>
