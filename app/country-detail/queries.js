import gql from 'graphql-tag';

export const countriesQuery = gql`
  query CountriesQuery($pagination: PaginationInput) {
    countries(pagination: $pagination) {
      name
    }
  }
`;

export const statesQuery = gql`
  query StatesQuery($countryName: String!, $pagination: PaginationInput) {
    states(countryName: $countryName, pagination: $pagination) {
      name
      code
      latitude
      longitude
    }
  }
`;

export const countryQuery = gql`
  query CountryQuery($name: String!) {
    country(name: $name) {
      name
      currency
      currencySymbol
      phoneCode
    }
  }
`;
