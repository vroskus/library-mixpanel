// Helpers
import _ from 'lodash';

// Types
type $User = {
  id: string;
  $name: string;
  $email: string;
};

type $Event = {
  pageVisit: 'Page visit';
  request: 'Request';
  queueAction: 'Queue action';
};

const event: $Event = {
  pageVisit: 'Page visit',
  queueAction: 'Queue action',
  request: 'Request',
};

class MixpanelService<M extends Record<string, unknown>> {
  instance: M;

  event: $Event;

  distinctId: string | void;

  constructor(Mixpanel: M, token: string) {
    if (token !== '') {
      this.instance = Mixpanel.init(token) || Mixpanel;
    }

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

  trackEvent(eventTitle: $Event[keyof $Event], data: object): void {
    if (this.instance) {
      const dataHasDistinctId: boolean = _.has(
        data,
        'distinct_id',
      );

      if (dataHasDistinctId === false) {
        _.set(
          data,
          'distinct_id',
          this.distinctId,
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
