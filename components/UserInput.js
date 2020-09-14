import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

const UserInput = onPressSubmit => {
  const [value, onChangeText] = useState('');

  return (
    <Input
      multiline
      placeholder="Type Here..."
      onChangeText={text => onChangeText(text)}
      value={value}
      rightIcon={
        <Icon
          name="user"
          size={24}
          color="black"
          onPress={() => onPressSubmit(value)}
        />
      }
    />
  );
};

export default UserInput;
