import { sendMessage } from '@/api';

export const decreaseRoleBudget = roleName => sendMessage('role-action', { type: 'commander/decreaseRoleBudget', payload: roleName });
export const fireRole = roleName => sendMessage('role-action', { type: 'commander/fireRole', payload: roleName });
export const increaseRoleBudget = roleName => sendMessage('role-action', { type: 'commander/increaseRoleBudget', payload: roleName });
export const requestBudgetIncrease = requestedIncrease => sendMessage('role-action', { type: 'commander/requestBudgetIncrease', payload: requestedIncrease });
    