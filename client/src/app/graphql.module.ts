import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here

// 1. Creating  Apollo connection to localhost
export function createApolloLocal(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    name: 'local',
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApolloLocal,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
