import { sendMessage } from '@/api';

export const moveUnitGroups = moveInfo => sendMessage('role-action', {
    type: 'groundForces/moveUnitGroups',
    payload: moveInfo,
});