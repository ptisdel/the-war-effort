import common from '@the-war-effort/common';
import { resignFromRole } from '../../api';

const { allRoles } = common.constants;

export const useAirSupport = () => {
  const onResign = () => {
    resignFromRole(allRoles.AIR_SUPPORT);
  };

  return { onResign };
};
