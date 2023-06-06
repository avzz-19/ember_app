import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  beforeModel() {
    this.transitionTo('country-list');
  }
}
