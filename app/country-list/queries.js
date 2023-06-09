import gql from 'graphql-tag';

export const countriesQuery = gql`
  query CountriesQuery($pagination: PaginationInput) {
    countries(page: $pagination) {
      totalCount
      edges {
        node {
          id
          name
          currency
          capital
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
