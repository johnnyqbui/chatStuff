import React, {useState} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

const UserInput = props => {
  const {onPressSubmit} = props;
  const [value, onChangeText] = useState('');

  return (
    <Input
      multiline
      placeholder="Type Here..."
      onChangeText={text => onChangeText(text)}
      value={value}
      rightIcon={
        <Text
          onPress={() => {
            if (props.disable) return;
            onPressSubmit(value);
            onChangeText('');
          }}>
          Send
        </Text>
      }
    />
  );
};

export default UserInput;
