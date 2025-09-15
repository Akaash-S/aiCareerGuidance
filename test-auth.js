// Simple test file to verify Firebase authentication setup
// This file can be deleted after testing

import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Test function to verify Firebase authentication
export const testFirebaseAuth = async () => {
  const testEmail = 'test@example.com';
  const testPassword = 'testpassword123';

  try {
    console.log('Testing Firebase Authentication...');
    
    // Test 1: Create user
    console.log('1. Testing user creation...');
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    console.log('✅ User created successfully:', userCredential.user.email);
    
    // Test 2: Sign out
    console.log('2. Testing sign out...');
    await signOut(auth);
    console.log('✅ User signed out successfully');
    
    // Test 3: Sign in
    console.log('3. Testing sign in...');
    const signInCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
    console.log('✅ User signed in successfully:', signInCredential.user.email);
    
    // Test 4: Sign out again
    console.log('4. Testing final sign out...');
    await signOut(auth);
    console.log('✅ User signed out successfully');
    
    console.log('🎉 All Firebase authentication tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Firebase authentication test failed:', error);
    return false;
  }
};

// Uncomment the line below to run the test
// testFirebaseAuth();
