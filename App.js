import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Monster from './components/Monster';

const App = () => {
  return (
      <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content"/>
          <Monster id={1}/>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
      alignItems: 'center',
  },
});

export default App;
