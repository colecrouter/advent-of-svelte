<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let filter = '';
    let tbody: HTMLTableSectionElement;

    const createPerson = async () => {
        data.people = [
            ...data.people,
            {
                name: '',
                tally: 0,
            },
        ];
        setTimeout(() => {
            tbody.scrollTo({
                top: tbody.scrollHeight,
                behavior: 'smooth',
            });
        }, 0);
    };

    const removePerson = async (index: number) => {
        data.people = [...data.people.slice(0, index), ...data.people.slice(index + 1)];
    };
</script>

<table class="table">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Tally</th>
            <th class="px-5 pe-4"></th>
        </tr>
        <tr class="search">
            <th scope="col"><i class="bi bi-search"></i><input class="form-control w-100" bind:value={filter} placeholder="Enter a name here..." /></th>
        </tr>
    </thead>
    <tbody bind:this={tbody}>
        {#each data.people.filter((i) => i.name.search(new RegExp(filter, 'i')) !== -1) as item, i}
            <tr class:bg-danger={item.tally < 0}>
                <td><input class="form-control" type="text" bind:value={item.name} /></td>
                <td><input class="form-control" type="number" bind:value={item.tally} /></td>
                <td><button class="btn {item.tally < 0 ? 'btn-outline-dark' : 'btn-outline-secondary'}" on:click={() => removePerson(i)}>✕</button></td>
            </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <td></td>
            <td></td>
            <td><button class="btn btn-outline-success" on:click={createPerson}>+</button></td>
        </tr>
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

    tfoot,
    tfoot td {
        border-bottom: 0;
    }

    .search {
        width: 100% !important;
        display: block !important;
    }

    .search > th {
        display: grid !important;
        width: 100% !important;
        grid-template-columns: min-content 1fr;
    }

    .search > th > i {
        display: flex;
        align-items: center;
        margin: 8px;
        margin-left: 2px;
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
        /* First and second auto, third 50px */
        grid-template-columns: auto auto min-content;
    }

    tbody {
        display: block;
        height: 600px !important;
        overflow-y: auto;
        width: 100%;
    }
</style>
