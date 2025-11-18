import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar, Text, TextInput, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import SplashScreen from './src/screens/SplashScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Ensure consistent system font across the app (Roboto on Android, System on iOS)
  if ((Text as any).defaultProps == null) (Text as any).defaultProps = {};
  if ((TextInput as any).defaultProps == null) (TextInput as any).defaultProps = {};
  (Text as any).defaultProps.style = [
    (Text as any).defaultProps.style || {},
    { fontFamily: Platform.OS === 'android' ? 'Roboto' : 'System' },
  ];
  (TextInput as any).defaultProps.style = [
    (TextInput as any).defaultProps.style || {},
    { fontFamily: Platform.OS === 'android' ? 'Roboto' : 'System' },
  ];

  if (showSplash) {
    return (
      <>
        <SplashScreen onFinish={() => setShowSplash(false)} />
        <StatusBar 
          backgroundColor="transparent" 
          barStyle="light-content" 
          translucent 
        />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppNavigator />
          <StatusBar 
            backgroundColor="transparent" 
            barStyle="dark-content" 
            translucent 
          />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}