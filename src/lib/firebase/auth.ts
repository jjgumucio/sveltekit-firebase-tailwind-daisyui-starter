import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { app } from './config';
import type { iResponse } from './interfaces';
import UserStore from '$lib/stores/user';

/**
 * Firebase Authentication API implementation.
 *
 * @class FirebaseAuthAPI
 */
class FirebaseAuthAPI {
	auth;
	constructor() {
		this.auth = getAuth(app);
	}

	/**
	 * Sign Up to Firebase
	 *
	 * @param {string} email
	 * @param {string} password
	 * @return {*}  {Promise<iResponse>}
	 */
	signUpWithEmail = async (email: string, password: string, rememberMe: boolean): Promise<iResponse> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
			if (rememberMe) {
				this.onAuthStateChange()
			}
			return { status: 200, data: userCredential.user };
		} catch (error) {
			throw Error({...error});
		}
	};

	/**
	 * Sign In to Firebase
	 *
	 * @param {string} email
	 * @param {string} password
	 * @param {boolean} remember
	 * @return {*}  {Promise<iResponse>}
	 */
	signInWithEmail = async (
		email: string,
		password: string,
		remember: boolean
	): Promise<iResponse> => {
		try {
			const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
			if (remember) {
				this.onAuthStateChange();
			}
			return { status: 200, data: userCredential.user };
		} catch (error) {
			throw Error({...error});
		}
	};

	/**
	 * Sign Out from Firebase
	 *
	 * @return {*}  {Promise<iResponse>}
	 */
	signOut = async (): Promise<iResponse> => {
		try {
			await signOut(this.auth);
			return { status: 200 };
		} catch (error) {
			throw Error({...error});
		}
	};

	/**
	 * Adds the Firebase User objet to the UserStore 
	 * to keep track of session status
	 *
	 * @memberof FirebaseAuthAPI
	 * @return User | null
	 */
	onAuthStateChange = (): User | null => {
		let userObj: User;
		onAuthStateChanged(this.auth, (user) => {
			if (user) {
				UserStore.set(user);
				userObj = user;
			} else {
				UserStore.set(null);
				userObj = null;
			}
		});
		return userObj;
	};

	/**
	 * Resets User password
	 *
	 * @param {string} email
	 * @return {*}  {Promise<iResponse>}
	 */
	resetPassword = async (email: string): Promise<iResponse> => {
		try {
			sendPasswordResetEmail(this.auth, email);
			this.signOut();
			// The client should redirect to the login page
			return { status: 200 };
		} catch (error) {
			throw Error({...error});
		}
	};
}

export default FirebaseAuthAPI;
