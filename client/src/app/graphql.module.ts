import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, APOLLO_NAMED_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

const uriLocal = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
const uriCountries = 'https://countries.trevorblades.com/'

// Updated for using multiple endpoints.
// Credits: https://stackoverflow.com/questions/56212486/connect-an-angular-app-to-multiple-apollo-clients
// 1. Creating  Apollo connection to localhost
export function createApolloLocal(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    name: 'local',
    link: httpLink.create({uri: uriLocal}),
    cache: new InMemoryCache(),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}

// 2. Creating Apollo connection to external (Countries) API
// NOT WORKING YET, as I get the strange error 'Invariant Violation: To initialize Apollo Client, you must specify a 'cache' property in the options object.
// I DID create a cache, didn't I?
// export function createApolloCountries(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     name: 'countries',
//     link: httpLink.create({uri: uriCountries}),
//     cache: new InMemoryCache()
//   };
// }


@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApolloLocal,
      deps: [HttpLink],
    },
    // {
    //   provide: APOLLO_NAMED_OPTIONS,
    //   deps: [HttpLink],
    //   useFactory: createApolloCountries
    // }
  ],
})
export class GraphQLModule {
}
