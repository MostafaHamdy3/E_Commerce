import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from './app/navigation/AppNavigator';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <AppNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
