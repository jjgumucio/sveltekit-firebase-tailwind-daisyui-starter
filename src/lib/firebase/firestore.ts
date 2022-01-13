import { addDoc, getFirestore, getDocs, collection } from 'firebase/firestore';
import type { iResponse } from './interfaces';
import { app } from './config';

/**
 *
 *
 * @class FirestoreAPI
 */
/**
 * Firebase Firebase DB implementation
 *
 * @class FirestoreAPI
 */
class FirestoreAPI {
  db;
  constructor() {
    this.db = getFirestore(app);
  }

  /**
   * Firebase
   *
   * @param {string} collectionName
   * @param {unknown} data
   * @return {*}  {Promise<iResponse>}
   */
  addDoc = async (collectionName: string, data: unknown): Promise<iResponse> => {
    try {
      const response = await addDoc(collection(this.db, collectionName), data);
      return { status: 200, data: response };
    } catch (error) {
      console.log('Error upserting document:', error);
      return { status: 500, message: error.message };
    }
  };

  listCollectionDocs = async (collectionName: string): Promise<iResponse> => {
    try {
      const qSnapshot = await getDocs(collection(this.db, collectionName));
      const docsList = [];
      qSnapshot.forEach((doc) => {
        console.log('DOC ID:', doc.id);
        console.log('DOC DATA:', doc.data());
        docsList.push({ id: doc.id, ...doc.data() });
      });
      return { status: 200, data: docsList };
    } catch (error) {
      console.log('Error:', error.code, error.message);
      return { status: 500, message: `Error code: ${error.code} ${error.message}` };
    }
  };
}

export default FirestoreAPI;
