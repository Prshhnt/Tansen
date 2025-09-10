import auth from '@react-native-firebase/auth';

// Initialize Firebase Auth
export const initializeAuth = () => {
  // Firebase should be initialized automatically with the google-services.json
  console.log('Firebase Auth initialized');
};

// Sign up with email and password
export const signUp = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed up successfully:', user.uid);
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
      },
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed in successfully:', user.uid);
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
      },
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Get current user
export const getCurrentUser = () => {
  const user = auth().currentUser;
  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      isEmailVerified: user.emailVerified,
    };
  }
  return null;
};

// Get Firebase JWT token for API calls
export const getAuthToken = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await auth().signOut();
    console.log('User signed out successfully');
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Listen to auth state changes
export const onAuthStateChanged = (callback) => {
  return auth().onAuthStateChanged(callback);
};

// Guest sign in (anonymous authentication)
export const signInAsGuest = async () => {
  try {
    const userCredential = await auth().signInAnonymously();
    const user = userCredential.user;
    console.log('Guest user signed in:', user.uid);
    return {
      success: true,
      user: {
        uid: user.uid,
        email: null,
        isAnonymous: true,
      },
    };
  } catch (error) {
    console.error('Guest sign in error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
