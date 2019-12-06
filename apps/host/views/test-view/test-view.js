import _ from 'lodash';
import React, { useState } from 'react';
import api from '../../api';
import state from '../../state';
import { models } from '../../../shared';
import * as Styles from './styles';

const { Role } = models;
const { store } = state;

export const TestView = () => {
  const [globalState] = store();
  const [inputText, setInputText] = useState('');

  const { messages } = globalState;
  const { roles } = globalState.gameState;
  console.log(roles);
  
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
  { _.map(roles, (r, key) => 
    <li key = { key }>{ key } : { Role.getPlayer(r) } / { Role.getBudget(r) || '$0' } }</li>
  )}
      </div>
    </Styles.Root>
  )
};