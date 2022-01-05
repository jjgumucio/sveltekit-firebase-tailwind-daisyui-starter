import { writable } from 'svelte/store';

export const UserStore = writable(null);
export const isLoggedIn = writable(false);
