import ApolloService from 'ember-apollo-client/services/apollo';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from 'apollo-link-http';

export default class MyApolloService extends ApolloService {
  clientOptions() {
    const httpLink = createHttpLink({
      uri: 'https://api.geographql.rudio.dev/graphql',
    });

    const authLink = setContext((_, { headers }) => {
      // No authentication required for this API, so no modification needed
      return {
        headers,
      };
    });

    return {
      link: authLink.concat(httpLink),
      cache: this.cache(),
    };
  }
}
