<script lang="ts">
    import type { ChartDataset } from 'chart.js/auto';
    import { onMount } from 'svelte';

    let ctx: CanvasRenderingContext2D | null;
    let chart: import('chart.js').Chart | undefined;
    let canvas: HTMLCanvasElement;

    export let labels: string[] = [];
    export let chartType: import('chart.js').ChartType;
    export let data: ChartDataset<typeof chartType>;
    export let options: import('chart.js').ChartOptions;

    onMount(async () => {
        const { Chart } = await import('chart.js/auto');

        ctx = canvas.getContext('2d');
        if (!ctx) return;

        chart = new Chart<typeof chartType>(ctx, {
            type: chartType,
            data: {
                labels,
                datasets: [data],
            },
            options,
        });
    });

    $: {
        if (chart) {
            chart.data.labels = labels;
            chart.data = { ...chart.data };
            chart.update();
        }
    }
</script>

<canvas id="chart" bind:this={canvas} height="500"></canvas>
