// graphql.queries.ts -the file holding the queries for the TODO application
// We use the gql tag to parse our query string into a query document.

import {gql} from "apollo-angular";

const GET_TODOS = gql`
  query getAllTodos{
    todos{
      id
      name
      description
    }
  }
`

const GET_TODO = gql`
  query getTodo($id: String!){
    todo(id: $id){
      id
      name
      description
    }
  }
`

const ADD_TODO = gql`
  mutation addTodo($name: String!, $description: String!) {
    addTodo(name: $name, description: $description) {
      id
      name
      description
    }
  }
`
const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
  `

const UPDATE_TODO = gql `
 mutation updateTodo($id: String!, $name: String!, $description: String!) {
    updateTodo(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
 `


export {GET_TODOS, GET_TODO, ADD_TODO, DELETE_TODO, UPDATE_TODO}
