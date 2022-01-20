import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/hooks/Auth';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
 } from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import { AppRoutes } from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn';
import { TabTop } from './src/screens/TabTop';


export default function App() {
  const [ fontsLoaded ] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer> 
        <StatusBar
          backgroundColor={theme.colors.primary}
          translucent 
          style="light"
        />

      <AuthProvider>
       <AppRoutes />
      </AuthProvider>

      </NavigationContainer> 
    </ThemeProvider>
  );
}
