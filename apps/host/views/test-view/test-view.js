import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import api from '../../api';
import * as Styles from './styles';
import { store } from '../../store';

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    api.subscribeToMessages(msg => {
      setMessages(currentMessages => [...currentMessages, msg]);
    });
  }, []);

  return messages;
}

export const TestView = () => {
  const [inputText, setInputText] = useState('');
  const messages = useMessages();
  
  const handleInputChange = e => {
    const value = _.get(e, 'target.value');
    setInputText(value);
  }

  const handleSubmit = () => {
    api.sendMessage(inputText);
    setInputText('');
  };

  const isSubmitDisabled = () => {
    if (inputText.length === 0) return true;
    return false;
  }

  return (
    <Styles.Root>
      <header>
        <h1>Hello, host.</h1>
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
      <ul>
        { store.getGameData().players.map((p, index) => <li key = { index }>{ p }</li>) }
      </ul>
    </Styles.Root>
  )
};