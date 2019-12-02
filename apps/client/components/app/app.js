import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { sendMessage, subscribeToMessages } from '../../api';
import * as Styles from './styles';


const useMessages = () => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    subscribeToMessages(msg => {
      setMessages(currentMessages => [...currentMessages, msg]);
    });
  }, []);

  return messages;
}

export const App = () => {

  const [inputText, setInputText] = useState('');
  const messages = useMessages();

  const handleInputChange = e => {
    const value = _.get(e, 'target.value');
    setInputText(value);
  }

  const handleSubmit = () => {
    sendMessage(inputText);
    setInputText('');
  };

  const isSubmitDisabled = () => {
    if (inputText.length === 0) return true;
    return false;
  }

  return (
    <Styles.Root>
      <header>
        <h1>Hello, commander.</h1>
      </header>
      <ul>
        { messages.map((msg, index) => <li key = { index }>{ msg }</li>) }
      </ul>
      <input 
        onChange = { handleInputChange } 
        type='text'
        value = { inputText }  
      ></input>
      <button 
        disabled = { isSubmitDisabled() } 
        onClick = { handleSubmit }
      >Send Message</button>
    </Styles.Root>
  );
};
