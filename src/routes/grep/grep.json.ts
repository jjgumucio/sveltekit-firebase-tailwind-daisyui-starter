import FirestoreAPI from '$lib/firebase/firestore';
import StorageAPI from '$lib/firebase/storage';

const Firestore = new FirestoreAPI();
const Storage = new StorageAPI();

export async function get({ params }) {
	console.log('GET:', params);
}

export async function post(request) {
	console.log('POST:', request);
}

export async function patch({ params }) {}

export async function del({ params }) {}
