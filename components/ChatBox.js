import React, {useState, useEffect, useRef} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {Avatar, Card, ListItem, Button, Icon} from 'react-native-elements';

import UserInput from './UserInput';
import ChatAgent from './ChatAgent';

const API_ENDPOINT =
  'https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json';

const useAppendDialogs = (agentName, currentQuestion, text) => {
  const [dialogs, setDialogs] = useState([]);

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
      text: `${text} is not a valid answer.`,
    },
  ]);

  return [dialogs, setDialogs];
};
export default ChatBox = () => {
  const [agentName, setAgentName] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogs, setDialogs] = useState([]);
  const [endDialog, setEndDialog] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [loadingMessage, setLoadingMessage] = useState(false);
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
    setTimeout(() => {
      scrollRef.current.scrollToEnd();
    }, 100);
  }, [dialogs, loadingMessage]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     loadingMessage &&
  //       setDialogs([
  //         ...dialogs,
  //         {
  //           user: agentName,
  //           text: '*Thinking*',
  //         },
  //       ]);
  //   }, 2000);
  // }, [loadingMessage]);

  console.log({currentQuestion});

  return (
    <Card>
      <ChatAgent agent={agentName} />
      <Card.Divider />
      {loading ? (
        <Text style={styles.question}>...loading</Text>
      ) : (
        // Chat Dialog
        <ScrollView ref={scrollRef}>
          {dialogs.map(({user, text}) => (
            <Text style={{fontSize: 32}}>
              {user}: {text}
            </Text>
          ))}
          {!loadingMessage && (
            <Text style={{fontSize: 32}}>
              {agentName}: {currentQuestion.question}
            </Text>
          )}
        </ScrollView>
      )}
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <UserInput
          disable={!currentQuestion.paths}
          onPressSubmit={text => {
            const formatText = text.trim().toLowerCase();
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

            setLoadingMessage(true);

            // fake load/thinking
            setTimeout(() => {
              setLoadingMessage(false);

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
                    text: `${text} is not a valid answer.`,
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
          }}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  chatBox: {
    flex: 1,
    padding: 20,
    backgroundColor: 'blue',
  },
});
