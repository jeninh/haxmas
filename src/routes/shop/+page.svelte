<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	function goBack() {
		window.location.href = '/';
	}
</script>

<div class="container">
	<div class="snowflake-balance">
		❄️ {data.snowflakeCount ?? 0}
	</div>

	<h1>Shop</h1>

	<div class="items-grid">
		{#each data.items as item}
			<div class="item-card">
				{#if item.image}
					<img src={item.image} alt={item.name} class="item-image" />
				{:else}
					<div class="item-image placeholder">Image Coming Soon</div>
				{/if}
				<div class="item-info">
					<h3>{item.name}</h3>
					<p class="cost">{item.cost}</p>
					{#if item.snowflakeCost !== null}
						{@const userSnowflakes = data.snowflakeCount ?? 0}
						{@const canAfford = userSnowflakes >= item.snowflakeCost}
						{#if canAfford && item.redeemLink}
							<a href={item.redeemLink} target="_blank" rel="noopener noreferrer" class="redeem-btn">
								Redeem
							</a>
						{:else}
							<p class="snowflakes-needed">{item.snowflakeCost - userSnowflakes} Snowflakes Needed</p>
						{/if}
					{/if}
				</div>
			</div>
		{/each}
	</div>

	{#if data.items.length === 0}
		<p class="empty-message">No items available in the shop right now.</p>
	{/if}

	<button class="back-btn" on:click={goBack}>← Back</button>
</div>

<style>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		padding-bottom: 100px;
		overflow-y: auto;
		background-color: #4285f4;
	}

	h1 {
		color: #fff;
		font-size: 3rem;
		margin-bottom: 2.5rem;
		text-align: center;
		padding: 0 1rem;
	}

	.items-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		max-width: 1000px;
		width: 100%;
	}

	@media (max-width: 900px) {
		.items-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 550px) {
		.items-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		h1 {
			font-size: 1.75rem;
			margin-bottom: 1.5rem;
		}
	}

	.item-card {
		background: rgba(255, 255, 255, 0.1);
		border: 3px solid #fff;
		border-radius: 8px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		transition: transform 0.2s, background 0.2s;
	}

	.item-card:hover {
		transform: translateY(-4px);
		background: rgba(255, 255, 255, 0.15);
	}

	.item-image {
		width: 100%;
		height: 180px;
		object-fit: cover;
		border-radius: 6px;
	}

	.item-image.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.7);
		font-size: 1rem;
	}

	.item-info {
		text-align: center;
		width: 100%;
	}

	.item-card h3 {
		color: #fff;
		margin: 0;
		font-size: 1.3rem;
		margin-bottom: 0.5rem;
	}

	.item-card .cost {
		color: #f1c40f;
		margin: 0;
		font-size: 1.1rem;
		font-weight: bold;
	}

	.redeem-btn {
		display: inline-block;
		margin-top: 0.75rem;
		padding: 0.5rem 1.5rem;
		background: #33d6a6;
		color: #fff;
		border: none;
		border-radius: 5px;
		font-size: 1rem;
		font-weight: bold;
		text-decoration: none;
		cursor: pointer;
		transition: background 0.2s, transform 0.2s;
	}

	.redeem-btn:hover {
		background: #2bc295;
		transform: scale(1.05);
	}

	.snowflakes-needed {
		margin: 0.75rem 0 0 0;
		padding: 0.4rem 0.8rem;
		background: rgba(231, 76, 60, 0.3);
		border: 1px solid #e74c3c;
		border-radius: 5px;
		color: #fff;
		font-size: 0.9rem;
	}

	.empty-message {
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.2rem;
		text-align: center;
		margin-top: 2rem;
	}

	.back-btn {
		position: fixed;
		bottom: 2rem;
		left: 2rem;
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid #fff;
		border-radius: 5px;
		color: #fff;
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.2s;
	}

	.back-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.snowflake-balance {
		position: fixed;
		top: 1.5rem;
		right: 1.5rem;
		background: rgba(255, 255, 255, 0.15);
		border: 2px solid #fff;
		border-radius: 999px;
		padding: 0.5rem 1.25rem;
		color: #f1c40f;
		font-size: 1.25rem;
		font-weight: bold;
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		z-index: 200;
	}
</style>
