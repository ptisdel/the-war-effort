import { sendMessage } from '@/api';

export const resupplyAircraft = unitId => sendMessage('role-action', { type: 'airSupport/resupplyAircraft', data: unitId });
