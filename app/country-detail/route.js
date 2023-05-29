import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { queryManager } from 'ember-apollo-client';

import { countriesQuery, statesQuery } from './queries';

export default class CountryDetailRoute extends Route {
  @service('apollo') apollo;
  @queryManager() apolloQueryManager;

  async model(params) {
    const { countryName } = params;

    const countryResult = await this.apolloQueryManager.watchQuery({
      query: countriesQuery,
      variables: { name: countryName },
    });

    const statesResult = await this.apolloQueryManager.watchQuery({
      query: statesQuery,
      variables: { countryName },
    });

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
