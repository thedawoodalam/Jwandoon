import { registerRootComponent } from 'expo';
import App from './App';
import { initializeFirebase } from './src/config/firebase';

// Initialize Firebase
initializeFirebase();

// Register the app
registerRootComponent(App);