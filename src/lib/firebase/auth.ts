import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { app } from './config';
import type { iResponse } from './interfaces';
import SessionStore from '$lib/stores/session';

class FirebaseAuthAPI {
	auth;
	constructor() {
		this.auth = getAuth(app);
	}

	signUpWithEmail = async (email: string, password: string): Promise<iResponse> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
			return { status: 200, data: userCredential.user };
		} catch (error) {
			const errorMessage = `Error on User creation: ${error.message}`;
			console.error(errorMessage);
			// throw Error(errorMessage);
			return { status: 500, message: errorMessage };
		}
	};

	signInWithEmail = async (email: string, password: string): Promise<iResponse> => {
		try {
			const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
			return { status: 200, data: userCredential.user };
		} catch (error) {
			const errorMessage = `Error on User signin: ${error.message}`;
			console.error(errorMessage);
			// throw Error(errorMessage);
			return { status: 500, message: errorMessage };
		}
	};

	signOut = async (): Promise<iResponse> => {
		try {
			await signOut(this.auth);
			return { status: 200 };
		} catch (error) {
			const errorMessage = `Error on signout: ${error.message}`;
			return { status: 500, message: errorMessage };
		}
	};

	onAuthStateChange = (): void => {
		onAuthStateChanged(this.auth, (user) => {
			if (user) {
				SessionStore.set(user);
			} else {
				SessionStore.set(null);
			}
		});
	};

	resetPassword = async (email: string): Promise<iResponse> => {
		try {
			sendPasswordResetEmail(this.auth, email);
			this.signOut()
			// The client should redirect to the login page
			return { status: 200 };
		} catch (error) {
			return { status: 500, message: `Error sending reset email: ${error}` };
		}
	};
}

export default FirebaseAuthAPI;
