<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let filter = '';
    let tbody: HTMLTableSectionElement;

    import { writable } from 'svelte/store';

    const selected = writable(new Set<string>());
    const max = 100;
    let weight = 0;

    selected.subscribe((s) => {
        weight = [...$selected.values()].map((name) => data.people.filter((item) => name === item.name)[0].weight).reduce((a, c) => a + c, 0);
    });
</script>

<table class="table">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Weight</th>
        </tr>
        <div class="hstack gap-1 m-2">
            <i class="bi bi-search" />
            <input class="form-control w-100" bind:value={filter} placeholder="Enter a name here..." />
        </div>
    </thead>
    <tbody bind:this={tbody}>
        {#each data.people.filter((i) => $selected.has(i.name) || i.name.search(new RegExp(filter, 'i')) !== -1) as item, i}
            <tr
                class:bg-primary={$selected.has(item.name)}
                on:click={() =>
                    selected.update((set) => {
                        set.has(item.name) ? set.delete(item.name) : set.add(item.name);
                        return set;
                    })}>
                <td>{item.name}</td>
                <td>{item.weight}</td>
            </tr>
        {/each}
    </tbody>
    <tfoot>
        <div class="progress m-4" role="progressbar" aria-label="Basic example" aria-valuenow={weight} aria-valuemin="0" aria-valuemax={max} style:height="8px">
            <div class="progress-bar {weight < max ? 'bg-success' : 'bg-danger'}" style:width={`${(weight / max) * 100}%`} />
        </div>

        <h4 class="text-center mb-4">
            {Math.round(weight)} / {max} kg
        </h4>
    </tfoot>
</table>

<style>
    table {
        margin-bottom: 0 !important;
    }

    input::placeholder {
        opacity: 0.25;
        font-weight: 100;
    }

    tfoot {
        border-bottom: 0;
    }

    td,
    th {
        background-color: transparent !important;
    }

    thead,
    tfoot,
    tbody tr {
        display: table;
        width: 100%;
        transition: background-color 0.15s ease-in-out;
    }

    tr {
        display: grid !important;
        grid-template-columns: 1fr 1fr;
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
