import { gql } from 'graphql-tag';

export const countryQuery = gql`
query CountryQuery($countryId: Int!) {
  country(id: $countryId) {
    name
    currency
    capital
  }
}
`;

export const statesQuery = gql`
  query States($countryId: Int!, $pagination: PaginationInput) {
    states(filter: { cid: $countryId }, page: $pagination) {
      totalCount
      edges {
        cursor
        node {
          id
          name
          state_code
          latitude
          longitude
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
    }
  }
`;


export const paginationVariables = {
  first: 20,
  after: null,
  last: null,
  before: null
};
