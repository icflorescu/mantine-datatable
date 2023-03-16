import mixpanel from 'mixpanel-browser';
import { MIXPANEL_PROJECT_TOKEN } from '~/config';

mixpanel.init(MIXPANEL_PROJECT_TOKEN, { debug: process.env.NODE_ENV === 'development' });

export function logPageView() {
  mixpanel.track(location.pathname);
}
