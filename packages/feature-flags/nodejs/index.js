import Flagsmith from 'flagsmith-nodejs';
import Nodecache from 'node-cache';

let flagsmithClient;

export const initializeFeatureFlags = ({ environmentId }) => {
  flagsmithClient = new Flagsmith({
    environmentId,
    cache: new Nodecache({ stdTTL: 10, checkperiod: 10 }),
  });
};

export const getFlag = ({ flagKey }) => {
  if (!flagsmithClient) return null;
  return flagsmithClient.isFeatureEnabled(flagKey);
};
