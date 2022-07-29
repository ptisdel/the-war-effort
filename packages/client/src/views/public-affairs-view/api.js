import { sendMessage } from '@/api';

export const censorArticle = articleId => sendMessage('role-action', {
  type: 'publicAffairs/censorArticle',
  data: articleId,
});

export const createPropagandaCampaign = travelInfo => sendMessage('role-action', {
  type: 'publicAffairs/createPropagandaCampaign',
  data: travelInfo,
});
