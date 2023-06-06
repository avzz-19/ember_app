import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { queryManager } from 'ember-apollo-client';
import { countriesQuery } from './queries';

export default class CountryListRoute extends Route {
  @service('apollo') apollo;
  @queryManager() apolloQueryManager;
  @service router;
  beforeModel(/* transition */) {
    this.router.transitionTo('country-list'); // Implicitly aborts the on-going transition.
  }
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
      last: null,
      before: null,
    };

    if (page > 1) {
      pagination.after = params.after;
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
      hasNextPage: result.countries.pageInfo.hasNextPage,
      hasPreviousPage: result.countries.pageInfo.hasPreviousPage,
      after: result.countries.pageInfo.endCursor,
    };
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.setProperties(model);
  }

  @action
  async goToPage(page, after) {
    const pageSize = 20;

    const pagination = {
      first: pageSize,
      after,
      last: null,
      before: null,
    };

    const variables = {
      pagination,
    };

    const result = await this.apolloQueryManager.watchQuery({
      query: countriesQuery,
      variables,
    });

    const updatedModel = {
      countries: result.countries.edges.map((edge) => edge.node),
      totalCount: result.countries.totalCount,
      totalPages: Math.ceil(result.countries.totalCount / pageSize),
      currentPage: page,
      hasNextPage: result.countries.pageInfo.hasNextPage,
      hasPreviousPage: result.countries.pageInfo.hasPreviousPage,
      after: result.countries.pageInfo.endCursor,
    };

    this.controller.setProperties(updatedModel);
    this.router.transitionTo({
      queryParams: { page, after: updatedModel.after },
    });
  }
}
