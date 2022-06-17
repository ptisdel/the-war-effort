import _ from 'lodash';
import React, { useState } from 'react';
import common from '@the-war-effort/common';
import { sendMessage } from '@/api';


const JoinRoomView = () => {
    const { ROOM_CODES } = common.constants;

    const adjectivesSorted = ROOM_CODES.adjectives.sort();
    const nounsSorted = ROOM_CODES.nouns.sort();

    const [adjective, setAdjective] = useState(_.first(adjectivesSorted));
    const [noun, setNoun] = useState(_.first(nounsSorted));

    const onSubmit = () => {
        sendMessage('room-code-submitted', `${adjective} ${noun}`);
    }

    const onSelectAdjective = e => {
        setAdjective(e.target.value);
    };    

    const onSelectNoun = e => {
        setNoun(e.target.value);
    };

    return (
        <div>
            
            <h1>Select Room Code</h1>
            <div style={{ display: 'flex' }}>
                <span>Operation</span>

                <select id='adjective' onChange={onSelectAdjective} value={adjective}>
                    { _.map(adjectivesSorted, (adjective, i) => <option key={i} value={adjective}>{adjective}</option>) }
                </select>
                
                <select id='noun' onChange={onSelectNoun} value={noun}>
                    { _.map(nounsSorted, (noun, i) => <option key={i} value={noun}>{noun}</option>) }
                </select>
            </div>
        
            <button onClick={ () => onSubmit() } type='submit'>Submit Room Code</button>
        </div>
    );
};

export default JoinRoomView;
