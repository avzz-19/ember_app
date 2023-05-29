import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { queryManager } from 'ember-apollo-client';
import { countriesQuery } from './queries';

export default class CountryListRoute extends Route {
  @service('apollo') apollo;
  @queryManager() apolloQueryManager;

  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  async model(params) {
    const pageSize = 20;
    const page = parseInt(params.page, 10) || 1;

    const pagination = {
      first: pageSize,
      after: null,
    };

    if (page > 1) {
      pagination.after = btoa(`arrayconnection:${(page - 1) * pageSize}`);
    }

    const variables = {
      pagination,
    };

    const result = await this.apolloQueryManager.watchQuery({
      query: countriesQuery,
      variables,
    });

    return {
      countries: result.countries.edges.map((edge) => edge.node),
      totalCount: result.countries.totalCount,
      totalPages: Math.ceil(result.countries.totalCount / pageSize),
      currentPage: page,
    };
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('model', model);
  }
  

  @action
  goToPage(page) {
    this.transitionTo({ queryParams: { page } });
  }
}
