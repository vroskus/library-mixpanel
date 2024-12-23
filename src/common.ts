// Global Types
import type {
  Mixpanel as $MixpanelNode,
} from 'mixpanel';
import type {
  Mixpanel as $MixpanelBrowser,
} from 'mixpanel-browser';

// Helpers
import _ from 'lodash';

type $Event = {
  pageVisit: 'Page visit';
  queueAction: 'Queue action';
  request: 'Request';
};

// Types
type $Mixpanel = $MixpanelBrowser | $MixpanelNode;

type $User = {
  $email: string;
  $name: string;
  id: string;
};

const event: $Event = {
  pageVisit: 'Page visit',
  queueAction: 'Queue action',
  request: 'Request',
};

class MixpanelService {
  instance: $Mixpanel;

  event: $Event;

  distinctId: string | undefined;

  serviceName: string | undefined;

  constructor(Mixpanel: $Mixpanel, token: string, serviceName?: string) {
    if (token !== '') {
      this.instance = Mixpanel.init(token) || Mixpanel;
    }

    this.serviceName = serviceName;

    this.event = event;
  }

  setDistinctId(distinctId: string) {
    this.distinctId = distinctId;
  }

  setUser(user: $User): void {
    if (this.instance) {
      if (this.instance.identify) {
        this.instance.identify(user.id);
      }

      this.instance.people.set(
        user.id,
        user,
      );

      this.setDistinctId(user.id);
    } else {
      // eslint-disable-next-line
      console.info('Track user:', user);
    }
  }

  setServiceName(serviceName: string): void {
    this.serviceName = serviceName;
  }

  trackEvent(eventTitle: $Event[keyof $Event], data: object): void {
    if (this.instance) {
      const dataHasDistinctId: boolean = _.has(
        data,
        'distinct_id',
      );

      if (dataHasDistinctId === false && this.distinctId) {
        _.set(
          data,
          'distinct_id',
          this.distinctId,
        );
      }

      if (this.serviceName) {
        _.set(
          data,
          'Service',
          this.serviceName,
        );
      }

      this.instance.track(
        eventTitle,
        data,
      );
    } else {
      // eslint-disable-next-line
      console.info('Track event:', eventTitle, data);
    }
  }
}

export default MixpanelService;
