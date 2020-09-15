import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

export default DialogBox = ({
  scrollRef,
  dialogs,
  loadingMessage,
  agentName,
  currentQuestion,
}) => {
  return (
    <ScrollView ref={scrollRef} style={styles.scrollContainer}>
      {dialogs.map(({id, user, text}) => (
        <View key={id} style={styles.dialogContainer}>
          <Text
            style={{
              ...styles.text,
              color: user === 'You' ? '#79aafe' : '#657589',
            }}>
            {user}:
          </Text>
          <Text
            style={{
              ...styles.text,
              color: '#ccc',
            }}>
            {text}
          </Text>
        </View>
      ))}
      {!loadingMessage && (
        <View style={styles.currentQuestionContainer}>
          <Text
            style={{
              ...styles.text,
              color: '#657589',
            }}>
            {agentName}:
          </Text>
          <Text
            style={{
              ...styles.text,
              color: '#ccc',
            }}>
            {currentQuestion.question}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    paddingLeft: 15,
  },
  dialogContainer: {
    padding: 10,
  },
  currentQuestionContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
