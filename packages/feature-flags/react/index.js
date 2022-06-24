import _ from 'lodash-es';
import 'flagsmith';
import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { v4 as uuid } from 'uuid';

const FeatureFlagContext = createContext({});
export const useFeatureFlags = () => useContext(FeatureFlagContext);

export const FeatureFlagProvider = ({ children, userKey, environmentId }) => {
  const [flags, setFlags] = useState({});

  useEffect(() => {
    const identity = userKey || uuid();
    console.log('use effect');

    // TODO: figure out why flagsmith is mounted on window and address it somehow
    // eslint-disable-next-line
    flagsmith.init({
      cacheFlags: true,
      environmentID: environmentId,
      enableAnalytics: true,
      identity,
      onChange: () => {
        // eslint-disable-next-line
        const flagState = flagsmith.getState();
        const newFlags = flagState?.flags;
        const parsedFlags = _.mapValues(newFlags, flag => flag.enabled);
        setFlags(parsedFlags);
      },
    });
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ flags }}>
        { children }
    </FeatureFlagContext.Provider>
  );
};
