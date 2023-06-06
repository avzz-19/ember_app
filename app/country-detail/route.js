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
    const pageSize = 20;
    const page = parseInt(params.page, 10) || 1;

    const pagination = {
      first: pageSize,
      after: null,
    };

    if (page > 1) {
      pagination.after = btoa(`arrayconnection:${(page - 1) * pageSize}`);
    }

    const [countryResult, statesResult] = await Promise.all([
      this.apolloQueryManager.watchQuery({
        query: countryQuery,
        variables: { countryId: id, pagination },
      }),
      this.apolloQueryManager.watchQuery({
        query: statesQuery,
        variables: { countryId: id, pagination },
      }),
    ]);
    return {
      country: countryResult.country,
      states: statesResult.states,
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
