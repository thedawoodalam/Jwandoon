import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { initializeFirebase } from './src/config/firebase';
import { AppNavigator } from './src/navigation/AppNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E53935',
    secondary: '#757575',
  },
};

function App(): React.JSX.Element {
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App; 