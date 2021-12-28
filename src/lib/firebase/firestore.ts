import { addDoc, getFirestore, collection } from 'firebase/firestore';
import type { iResponse } from './interfaces';
import { app } from './config';

class FirestoreAPI {
	db;
	constructor() {
		this.db = getFirestore(app);
	}

	addDoc = async (collectionName: string, data: unknown): Promise<iResponse> => {
		try {
			console.log('path:', collectionName);
			console.log('data:', data);
			const response = await addDoc(collection(this.db, collectionName), data);
			return { status: 200, data: response };
		} catch (error) {
			console.log('Error upserting document:', error);
			return { status: 500, message: error.message };
		}
	};
}

export default FirestoreAPI;
