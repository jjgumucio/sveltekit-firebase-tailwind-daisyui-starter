import FirestoreAPI from '$lib/firebase/firestore';
import StorageAPI from '$lib/firebase/storage';

const Firestore = new FirestoreAPI();
const Storage = new StorageAPI();

export async function get({ params }) {
  console.log('GET:', params);
}