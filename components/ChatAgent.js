import React from 'react';
import {View} from 'react-native';
import {Avatar, Card} from 'react-native-elements';

const ChatAgent = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Avatar
        rounded
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
      />
      <Card.Title style={{padding: 5}}>Someone Random</Card.Title>
    </View>
  );
};

export default ChatAgent;
