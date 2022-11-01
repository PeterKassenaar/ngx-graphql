// Communicating with Countries GraphQL API, available at https://github.com/trevorblades/countries
// Documentation for queries: https://trevorblades.github.io/countries/queries/continent

import {gql} from "apollo-angular"

// Get a list of all countries (200+!)
// These queries demonstrate the use of nested properties.
// Each propertY (for instance: languages{}) is also an array which has
// key-value pairs. See API documentation for details
const GET_COUNTRIES = gql`
  query getAllCountries{
    countries{
      name
      code
      capital
      languages{
        name
      }
    }
  }
  `

// Get a single country, based on country code
const GET_COUNTRY = gql`
  query getCountry($code: ID!){
    country(code: $code){
      code
      name
      capital
      languages{
        name
        native
      }
      states{
        code
        name
      }
    }
  }
`


export {GET_COUNTRIES, GET_COUNTRY}
