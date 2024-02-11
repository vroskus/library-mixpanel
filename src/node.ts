// Helpers
import Mixpanel from 'mixpanel';

// Service
import MixpanelService from './common';

// Types
import type {
  $Config,
} from './types';

class MixpanelServiceWrap<C extends $Config> extends MixpanelService {
  constructor({
    serviceName,
    token,
  }: C) {
    super(
      Mixpanel,
      token,
      serviceName,
    );
  }
}

export default MixpanelServiceWrap;
