import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import MonsterList from './components/MonsterList';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <MonsterList/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
