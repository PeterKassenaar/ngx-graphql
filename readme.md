# Angular GraphQL example with Angular Apollo Client

The application comes in two parts:

1. A server part with `Node.js` + `express` + `express-graphql`.
2. A client part with Angular 14.2 application.

Both applications must be installed and run seperately!

I included a bunch of comments in the code (most notably `./server/index.js/` and `./client/../todos.component.ts`)
with additional information. But of course, also see other files for comments. 

I used a simple Bootrap theme for UI-information. Of course you can swap this out for NG Material, Tailwind CSS etc.

More information:

- Apollo Angular: https://www.the-guild.dev/graphql/apollo-angular
- Angular: https://angular.io/
- GraphQL (general): https://graphql.org/
- Bootstrap: https://getbootstrap.com/

## Installing & running the server

The application won't run without the (GraphQL) Server so:

```
cd server
npm install
npm start
````
(or: `nodemon index.js` if you want to run it manually.)

## Installing & running the client

```
cd client
npm install
npm start 
```
(or: `ng serve --open` if you want to run it manually)

Updates or additions? Feel free to issue a pull request.

Still questions, or want to book an (Angular-) training at your location? Drop me a note at info@kassenaar.com.
