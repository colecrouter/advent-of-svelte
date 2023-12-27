<script lang="ts">
    import { onMount } from 'svelte';

    let data: Task[] = [];

    let filter = '';
    let tbody: HTMLTableSectionElement;

    import { writable } from 'svelte/store';
    import Chart from '../4/Chart.svelte';

    const selected = writable<string | undefined>();

    const update = async () => {
        const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json');
        data = (await res.json()) as Task[];
    };

    onMount(async () => {
        await update();

        $selected = data[0].elf;

        setInterval(update, 60000);
    });
</script>

<table class="table">
    <thead>
        <tr>
            <th scope="col">Name</th>
        </tr>
        <div class="hstack gap-1 m-2">
            <i class="bi bi-search" />
            <input class="form-control w-100" bind:value={filter} placeholder="Enter a name here..." />
        </div>
    </thead>
    <tbody bind:this={tbody}>
        {#each new Set(data.map((t) => t.elf).filter((name) => name === $selected || name.search(new RegExp(filter, 'i')) !== -1)) as name}
            <tr class:bg-primary={$selected === name} on:click={() => ($selected = name)}>
                <td>{name}</td>
            </tr>
        {/each}
    </tbody>
</table>

{#key $selected}
    {#if $selected}
        {@const filtered = data.filter((t) => t.elf === $selected)}
        <h2 class="text-center mb-4">{$selected}</h2>
        <Chart
            data={{
                data: Object.entries(Object.groupBy(filtered, (t) => t.task))
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([label, t]) => t.reduce((a, c) => a + c.minutesTaken, 0)),
                label: 'Time',
            }}
            chartType="doughnut"
            labels={[...new Set(filtered.map((t) => t.task))].sort((a, b) => a.localeCompare(b))}
            options={{
                borderColor: 'transparent',
                backgroundColor: ['#7f7fff', '#ff7f7f'],
            }} />

        <div class="d-flex justify-content-evenly my-4">
            <span class="card w-auto p-2">Presents Wrapped: {filtered.filter((t) => t.task === 'WRAPPED_PRESENT').length}</span>
            <span class="card w-auto p-2">Toys Made: {filtered.filter((t) => t.task === 'CREATED_TOY').length}</span>
        </div>

        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                Average Time Wrapping: {Math.round(filtered.filter((t) => t.task === 'WRAPPED_PRESENT').reduce((a, c) => a + c.minutesTaken, 0) / filtered.filter((t) => t.task === 'WRAPPED_PRESENT').length)} minutes
            </li>
            <li class="list-group-item">Average Time Making Toys: {Math.round(filtered.filter((t) => t.task === 'CREATED_TOY').reduce((a, c) => a + c.minutesTaken, 0) / filtered.filter((t) => t.task === 'CREATED_TOY').length)} minutes</li>
            <li class="list-group-item">Toys Made per Hour: {Math.round(filtered.filter((t) => t.task === 'CREATED_TOY').length / (filtered.filter((t) => t.task === 'CREATED_TOY').reduce((a, c) => a + c.minutesTaken, 0) / 60))}</li>
            <li class="list-group-item">
                Presents Wrapped per Hour: {Math.round(filtered.filter((t) => t.task === 'WRAPPED_PRESENT').length / (filtered.filter((t) => t.task === 'WRAPPED_PRESENT').reduce((a, c) => a + c.minutesTaken, 0) / 60))}
            </li>
        </ul>
    {/if}
{/key}

<style>
    table {
        margin-bottom: 0 !important;
    }

    input::placeholder {
        opacity: 0.25;
        font-weight: 100;
    }

    td,
    th {
        background-color: transparent !important;
    }

    thead,
    tbody tr {
        display: table;
        width: 100%;
        transition: background-color 0.15s ease-in-out;
    }

    tr {
        display: grid !important;
        user-select: none;
        cursor: pointer;
    }

    tbody {
        display: block;
        height: 600px !important;
        overflow-y: auto;
        width: 100%;
    }
</style>
