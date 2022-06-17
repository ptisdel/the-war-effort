import { sendMessage } from '@/api';

export const decreaseRoleBudget = roleName => sendMessage('role-action', { type: 'commander/decreaseRoleBudget', data: roleName });
export const fireRole = roleName => sendMessage('role-action', { type: 'commander/fireRole', data: roleName });
export const increaseRoleBudget = roleName => sendMessage('role-action', { type: 'commander/increaseRoleBudget', data: roleName });
export const requestBudgetIncrease = requestedIncrease => sendMessage('role-action', { type: 'commander/requestBudgetIncrease', data: requestedIncrease });
    