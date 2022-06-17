import _ from 'lodash-es';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPlayerId, subscribe, unsubscribe } from '@/api';

const StoreContext = createContext({});

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
    // subscribe to gamestate changes
    const [gameState, setGameState] = useState({});
    const [room, setRoom] = useState(null);

    const playerId = getPlayerId(); 

    console.log(playerId);
    const playerRole = _.get(room, ['clients', playerId]);
    console.log('playerRole', playerRole);

    const onGameStateChanged = gameState => {
      console.log('gameStateChange', 'Game State:', gameState);
      setGameState(gameState);
    }

    const onRoomUpdated = room => {
      console.log('room updated', room);
      setRoom(room);
    }
  
    useEffect(() => {
      subscribe('game-state-updated', onGameStateChanged);
      subscribe('room-updated', onRoomUpdated);

      return () => {
        unsubscribe('game-state-updated', onGameStateChanged);
        unsubscribe('room-updated', onRoomUpdated);
      }
    }, []);

    return (
      <StoreContext.Provider value={{
          gameState,
          playerRole,
          room,
      }}>
        {children}
      </StoreContext.Provider>
    )
  }