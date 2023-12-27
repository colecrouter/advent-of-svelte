<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from './Chart.svelte';

    let heart: HTMLSpanElement;
    let heartRate: number | undefined;

    let history: [string, number][] = [];

    const update = async () => {
        const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
        heartRate = ((await res.json()) as { heartRate: number }).heartRate;
        // heartRate = 120;

        heart.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], {
            duration: (1 / heartRate) * 30000,
            easing: 'ease-in-out',
        });

        setTimeout(update, (1 / heartRate) * 60000);
    };

    // Store history
    onMount(() => {
        let s = setInterval(() => {
            history.push([new Date().toLocaleTimeString(), heartRate ?? 0]);
            // history = [...history.slice(-20)];
            history = [...history];
        }, 1000);

        return () => clearInterval(s);
    });

    onMount(() => {
        update();
    });
</script>

<span bind:this={heart}>💝</span>

<h2 class="display-1">{heartRate ?? ''}</h2>

<Chart data={history.map(([, value]) => value)} labels={history.map(([label]) => label)} />

<style>
    span {
        display: flex;
        justify-content: center;
        line-height: 1.2;
        margin-bottom: 0.2em;
        font-size: 400px;
    }

    h2 {
        text-align: center;
    }
</style>
