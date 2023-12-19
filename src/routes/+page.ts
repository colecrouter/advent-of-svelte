import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
    return {
        paths: Object.keys(import.meta.glob('./*/+page.svelte')),
    };
};