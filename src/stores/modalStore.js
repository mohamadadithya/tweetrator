import { writable } from "svelte/store";

export let hasOpen = writable(false), date = writable('04/03/2022'), time = writable('16:20');