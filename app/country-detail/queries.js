import { gql } from 'graphql-tag';

export const countryQuery = gql`
  query CountryQuery($countryId: Int!) {
    country(id: $countryId) {
      name
      currency
      capital
      currency_symbol
      phone_code
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
