import { sendMessage } from '@/api';

const namespace = 'training';

export const createTrainingGroup = trainingInfo => sendMessage('role-action', {
    type: `${namespace}/createTrainingGroup`,
    payload: trainingInfo,
  });
  