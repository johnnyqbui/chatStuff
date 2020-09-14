import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Avatar, Card, ListItem, Button, Icon} from 'react-native-elements';

import UserInput from './UserInput';
import ChatAgent from './ChatAgent';

const API_ENDPOINT =
  'https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json';

export default ChatBox = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  console.log({answers});

  useEffect(() => {
    setLoading(true);
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(json => setQuestions(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(loading);
  return (
    <Card>
      <ChatAgent />
      <Card.Divider />
      {loading ? (
        <Text style={styles.questions}>...loading</Text>
      ) : (
        questions.map(({id, paths, question, validation}) => {
          if (id === 1) {
            return <Text style={styles.questions}>{question}</Text>;
          }
        })
      )}
      <UserInput onPressSubmit={answer => setAnswers(answer)} />
    </Card>
  );
};

const styles = StyleSheet.create({
  chatBox: {
    flex: 1,
    padding: 20,
    backgroundColor: 'blue',
  },
  questions: {
    color: 'white',
  },
});
