// Helpers
import Mixpanel from 'mixpanel-browser';

// Service
import MixpanelService from './common';

// Types
import type {
  $Config,
} from './types';

class MixpanelServiceWrap<C extends $Config> extends MixpanelService<Mixpanel> {
  constructor({
    token,
  }: C) {
    super(
      Mixpanel,
      token,
    );
  }
}

export default MixpanelServiceWrap;
