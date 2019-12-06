import _ from 'lodash';
import React, { useState } from 'react';
import api from '../../api';
import state from '../../state';
import * as Styles from './styles';

const { store } = state;

export const TestView = () => {
  const [inputText, setInputText] = useState('');
  const [globalState] = store();

  const { messages } = globalState;

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
        <h1>Hello, client.</h1>
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
        onClick = { handleSubmit }>
        Send Message</button>
    </Styles.Root>
  );
};
