import EmberRouter from '@ember/routing/router';
import config from 'ember-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('country-list', { path: '/' });
  this.route('country-detail', { path: '/country/:countryId' });
});
