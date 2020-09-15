import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';

export default ChatAgent = ({agent}) => (
  <View style={styles.chatAgent}>
    <Avatar
      rounded
      source={{
        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      }}
    />
    <Text style={styles.agentName}>{agent}</Text>
  </View>
);

const styles = StyleSheet.create({
  chatAgent: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    backgroundColor: '#ebf4f6',
  },
  agentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#576c81',
    padding: 5,
  },
});
