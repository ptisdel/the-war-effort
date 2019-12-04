import _ from 'lodash';
import React, { useState } from 'react';
import api from '../../api';
import * as Styles from './styles';
import useGlobal from '../../state/store';

export const TestView = () => {
  const [globalState] = useGlobal();
  const [inputText, setInputText] = useState('');

  const { messages } = globalState;
  const { players } = globalState.gameState;
  
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
        { _.map(messages, (msg, index) => <li key = { index }>{ msg }</li>) }
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
      <div>
  { _.map(players, (value, key) => 
    <li key = { key }>{ key } : { value || 'null' }</li>
  )}
      </div>
    </Styles.Root>
  )
};