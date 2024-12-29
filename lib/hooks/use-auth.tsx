import * as React from "react";
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
      throw err;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during logout');
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during password reset');
      throw err;
    }
  };

  // Update user profile
  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');
      await updateProfile(user, { displayName, photoURL });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred updating profile');
      throw err;
    }
  };

  // Update user email
  const updateUserEmail = async (email: string) => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');
      await updateEmail(user, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred updating email');
      throw err;
    }
  };

  // Update user password
  const updateUserPassword = async (password: string) => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');
      await updatePassword(user, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred updating password');
      throw err;
    }
  };

  // Clear error
  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    logout,
    resetPassword,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
