import _ from 'lodash-es';
import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { getPlayerId, subscribe, unsubscribe } from '@/api';

const StoreContext = createContext({});

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  // subscribe to gamestate changes
  const [gameState, setGameState] = useState({});
  const [room, setRoom] = useState(null);
  const [testRoom, setTestRoom] = useState(null);

  const playerId = getPlayerId();

  console.log(playerId);
  const playerRole = _.get(room, ['clients', playerId]);
  console.log('playerRole', playerRole);

  const onGameStateChanged = newGameState => {
    // console.log('gameStateChange', 'Game State:', newGameState);
    setGameState(newGameState);
  };

  const onRoomUpdated = newRoom => {
    console.log('room updated', newRoom);
    setRoom(newRoom);
  };

  const onTestRoomAvailable = roomCode => {
    setTestRoom(roomCode);
  };

  useEffect(() => {
    subscribe('game-state-updated', onGameStateChanged);
    subscribe('test-room-available', onTestRoomAvailable);
    subscribe('room-updated', onRoomUpdated);

    return () => {
      unsubscribe('game-state-updated', onGameStateChanged);
      unsubscribe('room-updated', onRoomUpdated);
    };
  }, []);

  return (
      <StoreContext.Provider value={{
        gameState,
        playerRole,
        room,
        testRoom,
      }}>
        {children}
      </StoreContext.Provider>
  );
}
