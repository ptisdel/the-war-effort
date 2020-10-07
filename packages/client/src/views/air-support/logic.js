import common from '@the-war-effort/common';
import { resignFromRole } from '../../api';

const { ALL_ROLES } = common.constants;

export const useAirSupport = () => {
  const onResign = () => {
    resignFromRole(ALL_ROLES.AIR_SUPPORT);
  };

  return { onResign };
};
