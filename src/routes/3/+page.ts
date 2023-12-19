import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
    return {
        people: await res.json() as Array<{ name: string, weight: number; }>
    };
};