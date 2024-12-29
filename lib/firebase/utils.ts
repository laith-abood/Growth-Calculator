import * as React from 'react';
import { db, auth, storage } from './config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentReference,
  CollectionReference,
  Timestamp,
  WhereFilterOp,
  OrderByDirection,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Generic type for Firestore documents
export interface FirestoreDocument extends DocumentData {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Helper function to convert document snapshot to data
export function snapshotToData<T extends FirestoreDocument>(
  snapshot: QueryDocumentSnapshot
): T {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as T;
}

// Helper function to get a single document
export async function getDocument<T extends FirestoreDocument>(
  collectionName: string,
  documentId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return snapshotToData<T>(docSnap as QueryDocumentSnapshot);
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}

// Helper function to query documents
export async function queryDocuments<T extends FirestoreDocument>(
  collectionName: string,
  conditions: {
    field: string;
    operator: WhereFilterOp;
    value: any;
  }[],
  orderByField?: string,
  orderDirection?: OrderByDirection,
  limitTo?: number,
  startAfterDoc?: QueryDocumentSnapshot
): Promise<T[]> {
  try {
    let queryRef = collection(db, collectionName);
    let queryBuilder = query(queryRef);

    // Add where clauses
    conditions.forEach(({ field, operator, value }) => {
      queryBuilder = query(queryBuilder, where(field, operator, value));
    });

    // Add orderBy if specified
    if (orderByField) {
      queryBuilder = query(queryBuilder, orderBy(orderByField, orderDirection));
    }

    // Add limit if specified
    if (limitTo) {
      queryBuilder = query(queryBuilder, limit(limitTo));
    }

    // Add startAfter if specified (for pagination)
    if (startAfterDoc) {
      queryBuilder = query(queryBuilder, startAfter(startAfterDoc));
    }

    const querySnapshot = await getDocs(queryBuilder);
    return querySnapshot.docs.map(doc => snapshotToData<T>(doc));
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
}

// Helper function to upload a file to Firebase Storage
export async function uploadFile(
  file: File,
  path: string,
  metadata?: any
): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, metadata);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Helper function to format Firestore timestamp
export function formatTimestamp(
  timestamp: Timestamp,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
): string {
  return timestamp.toDate().toLocaleString(undefined, options);
}

// Helper function to create a new timestamp
export function createTimestamp(): Timestamp {
  return Timestamp.now();
}

// Helper function to validate document data
export function validateDocumentData(
  data: any,
  requiredFields: string[] = []
): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return requiredFields.every(field => {
    const value = data[field];
    return value !== undefined && value !== null;
  });
}

// Helper function to handle Firestore errors
export function handleFirestoreError(error: any): string {
  console.error('Firestore Error:', error);

  if (error.code === 'permission-denied') {
    return 'You do not have permission to perform this action';
  }

  if (error.code === 'not-found') {
    return 'The requested document was not found';
  }

  if (error.code === 'already-exists') {
    return 'A document with this ID already exists';
  }

  return 'An error occurred while accessing Firestore';
}

// Helper function to create a typed collection reference
export function getTypedCollection<T extends FirestoreDocument>(
  collectionName: string
): CollectionReference {
  return collection(db, collectionName);
}

// Helper function to create a typed document reference
export function getTypedDocument<T extends FirestoreDocument>(
  collectionName: string,
  documentId: string
): DocumentReference {
  return doc(db, collectionName, documentId);
}
