import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { useEffect, useState, createContext, useContext } from 'react';
import { auth } from './firebaseConfig';
import { signInWithCredential, GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Google Login
  const [requestGoogle, responseGoogle, promptGoogle] = Google.useAuthRequest({
    expoClientId: '1066985197667-4vjto093c2p2h2gn37ab4795t0gmhp6u.apps.googleusercontent.com',
    webClientId: '1066985197667-4vjto093c2p2h2gn37ab4795t0gmhp6u.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
  });
  useEffect(() => {
    if (responseGoogle?.type === 'success') {
      const { id_token } = responseGoogle.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((userCredential) => {
        setUser(userCredential.user);
      });
    }
  }, [responseGoogle]);

  // Facebook Login
  const [requestFacebook, responseFacebook, promptFacebook] = Facebook.useAuthRequest({
    clientId: '2006569749852912',
  });

  useEffect(() => {
    if (responseFacebook?.type === 'success') {
      const { access_token } = responseFacebook.params;
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential).then((userCredential) => {
        setUser(userCredential.user);
      });
    }
  }, [responseFacebook]);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle: promptGoogle, signInWithFacebook: promptFacebook }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to Use Auth
export function useAuth() {
  return useContext(AuthContext);
}