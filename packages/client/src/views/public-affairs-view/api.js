import { sendMessage } from '@/api';

export const censorArticle = articleId => sendMessage('role-action', {
    type: 'publicAffairs/censorArticle',
    payload: articleId,
})

export const createPropagandaCampaign = travelInfo => sendMessage('role-action', {
    type: 'publicAffairs/createPropagandaCampaign',
    payload: travelInfo,
});