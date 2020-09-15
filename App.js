import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import ChatBox from './components/ChatBox';

const Main = () => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <ChatBox />
    </SafeAreaView>
  );
};

export default function App() {
  return <Main />;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bae9ed',
  },
});
