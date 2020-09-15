import React, {useState, useEffect, useRef} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

import UserInput from './UserInput';
import ChatAgent from './ChatAgent';
import DialogBox from './DialogBox';

const API_ENDPOINT =
  'https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json';

export default ChatBox = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [agentName, setAgentName] = useState('');
  const [dialogs, setDialogs] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(json => {
        // set initial question and agent
        setAllQuestions(json);
        const currentQuestion = json.find(question => question.id === 1);
        setCurrentQuestion(currentQuestion);
        // set fake agent
        setAgentName('Some Agent');
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    (loadingMessage || dialogs.length) &&
      setTimeout(() => {
        scrollRef.current.scrollToEnd();
      }, 100);
  }, [dialogs, loadingMessage]);

  const onPressSubmit = text => {
    const formatText = text.trim().toLowerCase();

    setLoadingMessage(true);
    setDialogs([
      ...dialogs,
      {
        user: agentName,
        text: currentQuestion.question,
      },
      {
        user: 'You',
        text,
      },
      {
        user: agentName,
        text: '*Thinking*',
      },
    ]);

    // fake load/thinking
    setTimeout(() => {
      setLoadingMessage(false);
      let valid = false;

      if (Array.isArray(currentQuestion.validation)) {
        valid = currentQuestion.validation.includes(formatText);
      }

      if (typeof currentQuestion.validation === 'string') {
        const regex = RegExp(currentQuestion.validation);
        valid = regex.test(formatText);
      }

      if (typeof currentQuestion.validation === 'boolean') {
        valid = currentQuestion.validation;
      }

      if (!valid) {
        setDialogs([
          ...dialogs,
          {
            user: agentName,
            text: currentQuestion.question,
          },
          {
            user: 'You',
            text,
          },
          {
            user: agentName,
            text: `Sorry, ${text} is not a valid answer.`,
          },
        ]);
      } else {
        const nextQuestion = allQuestions.find(question =>
          typeof currentQuestion.paths === 'object'
            ? currentQuestion.paths[formatText] === question.id
            : currentQuestion.paths === question.id,
        );
        setCurrentQuestion(nextQuestion);
      }
    }, 2000);
  };

  return (
    <View style={styles.chatBox}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <ChatAgent agent={agentName} />
          <DialogBox
            scrollRef={scrollRef}
            dialogs={dialogs}
            loadingMessage={loadingMessage}
            agentName={agentName}
            currentQuestion={currentQuestion}
          />
          <UserInput
            disabled={!currentQuestion.paths}
            onPressSubmit={onPressSubmit}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    margin: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
