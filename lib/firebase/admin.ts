import * as React from 'react';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// Your service account credentials
const serviceAccount = {
  type: process.env.FIREBASE_TYPE || 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID || 'bdi-trades-services',
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
  token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

// Initialize Firebase Admin
function initializeFirebaseAdmin() {
  if (!getApps().length) {
    try {
      const app = initializeApp({
        credential: cert(serviceAccount as any),
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });

      // Initialize services
      const auth = getAuth(app);
      const db = getFirestore(app);
      const storage = getStorage(app);

      return { app, auth, db, storage };
    } catch (error) {
      console.error('Error initializing Firebase Admin:', error);
      throw error;
    }
  }

  // Return existing app instance
  const app = getApps()[0];
  return {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
  };
}

// Export initialized services
export const { app, auth, db, storage } = initializeFirebaseAdmin();

// Helper types for Firestore Admin
export type AdminTimestamp = FirebaseFirestore.Timestamp;
export type AdminDocumentData = FirebaseFirestore.DocumentData;
export type AdminQueryDocumentSnapshot = FirebaseFirestore.QueryDocumentSnapshot;
export type AdminDocumentReference = FirebaseFirestore.DocumentReference;
export type AdminCollectionReference = FirebaseFirestore.CollectionReference;

// Helper function to convert Firestore timestamp to Date
export function timestampToDate(timestamp: AdminTimestamp): Date {
  return timestamp.toDate();
}

// Helper function to convert Date to Firestore timestamp
export function dateToTimestamp(date: Date): AdminTimestamp {
  return FirebaseFirestore.Timestamp.fromDate(date);
}

// Helper function to handle Firestore errors
export function handleFirestoreError(error: any): never {
  console.error('Firestore Error:', error);
  
  if (error.code === 'permission-denied') {
    throw new Error('You do not have permission to perform this action');
  }
  
  if (error.code === 'not-found') {
    throw new Error('The requested document was not found');
  }
  
  if (error.code === 'already-exists') {
    throw new Error('A document with this ID already exists');
  }
  
  throw new Error('An error occurred while accessing Firestore');
}

// Helper function to validate document data
export function validateDocumentData(data: any): void {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid document data');
  }

  // Add any additional validation rules here
  // For example, checking required fields, data types, etc.
}

// Helper function to create a document reference
export function createDocRef(
  collection: AdminCollectionReference,
  id: string
): AdminDocumentReference {
  return collection.doc(id);
}
