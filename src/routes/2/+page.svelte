<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

    let cookie: HTMLImageElement;
    let count: number;

    onMount(() => {
        count = 0;
    });

    const click = () => {
        cookie.animate([{ transform: 'translateY(-8px) rotate(2deg)' }, { transform: 'translateY(0px) rotate(6deg)' }, { transform: 'translateY(-8px) rotate(2deg)' }], {
            duration: 200,
            easing: 'ease-in-out',
        });

        count++;
    };
</script>

<div class="m-4 d-flex justify-content-center">
    <div on:click={click} on:keypress={click} tabindex="0" role="button">
        <img id="cookie" bind:this={cookie} src="/cookie.png" alt="cookie" height="200" width="200" />
    </div>
</div>

<div class="d-flex flex-column align-items-center">
    <div style:height="3em">
        {#key count}
            <h2 class="" in:fly={{ y: 20 }}>{count}</h2>
        {/key}
    </div>
    <div class="container">
        <div class="row gap-2 mx-2 mb-4">
            <button class="btn btn-outline-success col" on:click={() => count++}>Add</button>
            <button class="btn btn-outline-danger col" on:click={() => count--}>Remove</button>
            <button class="btn btn-outline-primary col" on:click={() => (count = 0)}>Reset</button>
        </div>
    </div>
</div>

<style>
    #cookie {
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
        transition:
            transform 0.2s ease-in-out,
            filter 0.2s ease-in-out;
    }

    #cookie:hover {
        filter: drop-shadow(8px 8px 2px rgba(0, 0, 0, 0.5)) brightness(0.9);
        transform: translateY(-8px) rotate(2deg);
        cursor: pointer;
    }
</style>
