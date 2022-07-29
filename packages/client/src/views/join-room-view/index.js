import _ from 'lodash-es';
import React, { useState } from 'react';
import common from '@the-war-effort/common';
import { sendMessage } from '@/api';
import { useStore } from '@/store';

const JoinRoomView = () => {
  const { testRoom } = useStore();
  const { ROOM_CODES } = common.constants;

  const adjectivesSorted = ROOM_CODES.adjectives.sort();
  const nounsSorted = ROOM_CODES.nouns.sort();

  const [selectedAdjective, setSelectedAdjective] = useState(_.first(adjectivesSorted));
  const [selectedNoun, setSelectedNoun] = useState(_.first(nounsSorted));

  const onSubmit = () => {
    sendMessage('room-code-submitted', `${selectedAdjective} ${selectedNoun}`);
  };

  const onSelectAdjective = e => {
    setSelectedAdjective(e.target.value);
  };

  const onSelectNoun = e => {
    setSelectedNoun(e.target.value);
  };

  return (
        <div>

            <h1>Select Room Code</h1>
            { testRoom && <div data-test-id='test-room'>{ testRoom }</div> }
            <div style={{ display: 'flex' }}>
                <span>Operation</span>

                <select id='adjective' onChange={onSelectAdjective} value={selectedAdjective}>
                    {
                      _.map(adjectivesSorted, (adjective, i) =>
                        <option key={i} value={adjective}>{adjective}</option>)
                    }
                </select>

                <select id='noun' onChange={onSelectNoun} value={selectedNoun}>
                    {
                      _.map(nounsSorted, (noun, i) =>
                        <option key={i} value={noun}>{noun}</option>)
                    }
                </select>
            </div>

            <button onClick={ () => onSubmit() } type='submit'>Submit Room Code</button>
        </div>
  );
};

export default JoinRoomView;
