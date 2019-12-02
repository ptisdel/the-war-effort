import React, { useEffect, useState } from 'react';

import { sendMessage, subscribeToMessages } from '../api';

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

  const messages = useMessages();

  return (
    <div>
      <p>Hello from the Host!</p>
      <ul>
        { messages.map((msg, index) => <li key = { index }>{ msg }</li>) }
      </ul>
    </div>
  )
};