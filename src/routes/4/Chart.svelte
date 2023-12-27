<script lang="ts">
    import { onMount } from 'svelte';

    let ctx: CanvasRenderingContext2D | null;
    let chart: import('chart.js').Chart | undefined;
    let canvas: HTMLCanvasElement;

    export let labels: string[] = [];
    export let data: number[] = [];

    onMount(async () => {
        const { Chart, LineController, LineElement, CategoryScale, LinearScale, PointElement } = await import('chart.js');
        Chart.register(LineElement, LineController, CategoryScale, LinearScale, PointElement);

        ctx = canvas.getContext('2d');
        if (!ctx) return;

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{ label: 'My First Dataset', data }],
            },
            options: {
                color: '#fff',
                borderColor: '#fff',
                scales: {
                    y: {
                        min: 60,
                        max: 100,
                        grid: {
                            color: '#fff5',
                        },
                    },
                    x: {
                        grid: {
                            color: '#fff5',
                        },
                    },
                },
            },
        });
    });

    $: {
        if (chart) {
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.update();
        }
    }
</script>

<canvas id="chart" bind:this={canvas} height="500"></canvas>
