import { sendMessage } from '@/api';

export const requestRole = roleName => sendMessage('role-requested', roleName);
