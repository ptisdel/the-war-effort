import { sendMessage } from '@/api';

export const createTravelGroup = travelInfo => sendMessage('role-action', {
  type: 'logistics/createTravelGroup',
  data: travelInfo,
});
