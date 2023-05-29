import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { queryManager } from 'ember-apollo-client';
import { countryQuery, statesQuery } from './queries';

export default class CountryDetailRoute extends Route {
  @service('apollo') apollo;
  @queryManager() apolloQueryManager;

  async model(params) {
    const { countryId } = params;
    const id = parseInt(countryId, 10); 

    const [countryResult, statesResult] = await Promise.all([
      this.apolloQueryManager.watchQuery({
        query: countryQuery,
        variables: { id },
      }),
      this.apolloQueryManager.watchQuery({
        query: statesQuery,
        variables: { countryId: id },
      }),
    ]);

    return {
      country: countryResult.data.country,
      states: statesResult.data.states,
    };
  }

  setupController(controller, model) {
    super.setupController(controller, model);

    controller.setProperties({
      country: model.country,
      states: model.states,
    });
  }
}
