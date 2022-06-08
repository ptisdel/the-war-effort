import { sendMessage } from '@/api';

const namespace = 'procurement';

export const startResearchingPrototype = prototypeId => sendMessage('role-action', {
    type: `${namespace}/startResearchingPrototype`,
    payload: prototypeId,
});