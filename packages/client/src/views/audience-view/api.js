import { sendMessage } from '@/api';

export const chooseRole = roleName => sendMessage('choose-role', roleName);
