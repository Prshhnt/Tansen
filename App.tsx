/**
 * Tansen App
 * Modular platform hosting mini-apps
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {PaperProvider, MD3LightTheme} from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6750a4',
    surface: '#fffbfe',
    surfaceVariant: '#e7e0ec',
  },
};

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="#6750a4" />
      <AppNavigator />
    </PaperProvider>
  );
}

export default App;
