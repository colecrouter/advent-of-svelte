<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="p-4">
    <h1>Advent of Svelte 2023</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

    <ol class="list-group list-group-flush list-group-numbered">
        {#each data.paths as path}
            <a class="list-group-item list-group-item-action" href={path.replace('+page.svelte', '')}>Day {(/\.\/(\d+)\/\+page.svelte/.exec(path))?.[1]}</a>
        {/each}
    </ol>
</div>
