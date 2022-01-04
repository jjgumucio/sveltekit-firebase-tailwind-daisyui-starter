import {
	list,
	getStorage,
	connectStorageEmulator,
	ref,
	uploadBytesResumable,
	getDownloadURL
} from 'firebase/storage';
import { app } from './config';
import type { iResponse } from './interfaces';

class StorageAPI {
	storage;
	storageRef;
	emulator;
	constructor() {
		this.storage = getStorage(app);
		this.storageRef = ref(this.storage);
		connectStorageEmulator(this.storage, 'localhost', 9199)
	}

	// Upload file and metadata to the object 'images/mountains.jpg'
	uploadFile = (file: File, path: string): iResponse => {
		const storageRef = ref(this.storage, `${path}/` + file.name);
		const uploadTask = uploadBytesResumable(storageRef, file);
		let downloadURL;

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			'state_changed',
			(snapshot): iResponse => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				switch (snapshot.state) {
					case 'paused':
						return { status: 200, data: { progress, status: 'paused' } };
						break;
					case 'running':
						return { status: 200, data: { progress, status: 'running' } };
				}
			},
			(error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
					case 'storage/unauthorized':
						console.error("User doesn't have permission to access.");
						break;
					case 'storage/canceled':
						console.error('User canceled the upload');
						break;
					case 'storage/unknown':
						console.error('Unknown error occurred, inspect error.serverResponse');
						break;
					default:
						console.error('Error uploading image:', error.message);
						break;
				}
			},
			async (): Promise<iResponse> => {
				// Upload completed successfully, now we can get the download URL
				downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				return { status: 200, data: { downloadURL } };
			}
		);
		return { status: 200, data: { downloadURL } };
	};

	getDownloadURL = async (path: string): Promise<iResponse> => {
		try {
			const downloadURL = await getDownloadURL(ref(this.storage, path));
			return { status: 200, data: { downloadURL } };
		} catch (error) {
			return { status: 500, message: `Error getting download url ${error}` };
		}
	};

	listFiles = async (): Promise<iResponse> => {
		try {
			const allFiles = await list(this.storageRef);
			return { status: 200, data: allFiles };
		} catch (error) {
			return { status: 500, message: `Error: ${error.code} ${error.message}` };
		}
	};
}

export default StorageAPI;
