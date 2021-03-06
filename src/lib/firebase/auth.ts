import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';

import type { User } from 'firebase/auth';
import { app } from './config';
import type { iResponse } from './interfaces';
import { UserStore, isLoggedIn, userId } from '$lib/stores/user';

/**
 * Custom AuthError for better handling
 *
 * @class AuthError
 * @extends {Error}
 */
class AuthError extends Error {
  code: string;
  ocurredAt: Date;
  constructor(code: string, message: string, ...params: never[]) {
    super(...params);
    this.name = 'AuthError';
    this.code = code;
    this.message = message;
    this.ocurredAt = new Date();
  }

  toString = () => {
    return `\n<===============\n${this.name}:\nCode: ${this.code}\nMessage: ${this.message}\nOcurred at: ${this.ocurredAt}\n================>`;
  };
}

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
  signUpWithEmail = async (email: string, password: string): Promise<iResponse> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return { status: 200, data: userCredential.user };
    } catch (error) {
      throw new AuthError(error.code, error.message);
    }
  };

  /**
   * Sign In to Firebase
   *
   * @param {string} email
   * @param {string} password
   * @return {*}  {Promise<iResponse>}
   */
  signInWithEmail = async (email: string, password: string): Promise<iResponse> => {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.onAuthStateChange();
      return { status: 200, data: userCredential.user };
    } catch (error) {
      throw new AuthError(error.code, error.message);
    }
  };

  /**
   * Sign Out from Firebase
   *
   * @return {*}  {Promise<iResponse>}
   *
   *
   */
  signOut = async (): Promise<iResponse> => {
    try {
      await signOut(this.auth);
      return { status: 200 };
    } catch (error) {
      throw new AuthError(error.code, error.message);
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
        UserStore.set({
          isLoggedIn: true,
          ...user,
          id: user.uid,
        });
        // isLoggedIn.set(true);
        // userId.set(user.uid)
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
      throw new AuthError(error.code, error.message);
    }
  };
}

export default FirebaseAuthAPI;
