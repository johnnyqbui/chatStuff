import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

const UserInput = props => {
  const {onPressSubmit, disabled} = props;
  const [value, setValue] = useState('');

  return (
    <Input
      containerStyle={styles.userInputContainer}
      inputContainerStyle={styles.inputContainer}
      rightIconContainerStyle={styles.rightIcon}
      maxLength={200}
      disabled={disabled}
      inputStyle={styles.input}
      multiline
      placeholder="Type Here..."
      onChangeText={text => setValue(text)}
      value={value}
      rightIcon={{
        type: 'font-awesome',
        name: 'paper-plane-o',
        color: 'white',
        onPress: () => {
          if (disabled) return;

          onPressSubmit(value);
          setValue('');
        },
      }}
    />
  );
};

export default UserInput;

const styles = StyleSheet.create({
  userInputContainer: {
    backgroundColor: '#ebf4f6',
    padding: 10,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  input: {
    flex: 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dfebf8',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    padding: 10,
    paddingBottom: 50,
    borderWidth: 1,
    borderRadius: 2,
  },
  rightIcon: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    backgroundColor: '#5093fd',
    borderRadius: 3,
  },
});
