// Small server application, running a GraphQL server.
// Based on https://signoz.io/blog/angular-graphql/
const express = require('express')
const cors = require('cors')
const uuid = require('uuid4') // for generating unique id's. In the form of (for instance) ef516174-872e-4b46-868e-286d91ec62cd

// GraphQL stuff
const {graphqlHTTP} = require('express-graphql')
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = require("graphql");


//************************
// Our data for a simple Todo application.
// In real life apps this would come from an external DB.
//************************
const Todos = [
    {id: uuid(), name: 'Have Coffee', description: 'Get some coffee after diner'},
    {id: uuid(), name: 'Go to Sleep', description: 'Sleep from 22:00 - 7:00'},
    {id: uuid(), name: 'Eat pizza', description: 'Go to NYP and fetch some pizzas'},
    {id: uuid(), name: 'Do Coding', description: 'Finish that project!'},
]

//*************************
//  CRUD methods
//*************************
// 1. Create the Type for one Todo, containing a unique id, name and description
const TodoType = new GraphQLObjectType({
    name: 'Todo',
    description: 'This is the type for a todo',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
    })
})

// 2. Create the root query for:
//  - the complete list of todos, or
//  - a single todo-item.
// A query contains the name, description, and the methods with which we can read the data.
// 2a. This is the 'R', for 'RETRIEVE' from the CRUD-acronym.
const RootQueryType = new GraphQLObjectType({
    name: 'query',
    description: 'This is the Root query',
    fields: () => ({ // Two fields in this QueryType, todos and todo
        todos: {
            type: new GraphQLList(TodoType), // type: A list of Todos
            description: 'List of all todos',
            resolve: () => Todos // Return the data defined above
        },
        todo: {
            type: TodoType, // Type: a single todo
            description: 'A single Todo item',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (root, args) => {
                return Todos.find(todo => todo.id === args.id)
            },
        }
    })
})

// 3. Create the mutation type for the todos
const RootMutationType = new GraphQLObjectType({
    name: 'mutation',
    description: 'Root mutation type',
    fields:() =>({
        // 3a. CREATE: Add a todo item
        addTodo:{
            type: TodoType,
            description: 'Add a new todo',
            args:{
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                description:{
                    type: new  GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (root, args) =>{
                const newTodo = {
                    id: uuid(),
                    name: args.name,
                    description: args.description
                }
                Todos.push(newTodo)
                console.log('debugging addTodo. Added:', newTodo)
                return newTodo
            }
        },
        // 3b. UPDATE: Update a todo
        updateTodo:{
            type: TodoType,
            description: 'Update an existing Todo',
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve:(root, args) =>{
                const todo = Todos.find(todo=> todo.id === args.id)
                if(todo){
                    todo.name = args.name;
                    todo.description = args.description;
                    console.log('debugging updatedTodo. New todo:',  todo)
                    return todo
                }
                return null
            }
        },
        // 3c. DELETE: Delete a todo
        deleteTodo: {
            type: TodoType,
            description: 'Delete a Todo',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: (root, args) => {
                const todo = Todos.find(todo => todo.id === args.id)
                if(todo){
                    Todos.splice(Todos.indexOf(todo), 1)
                    console.log('debugging deleteTodo. Deleted:',  todo)
                    return todo
                }
                return null
            }
        },
    })
})
//********************************
// 4. Create and configure the app
//********************************
const app = express();

const schema = new GraphQLSchema({
    query: RootQueryType, // The Root Query we defined above is passed in as a paramter for the schema
    mutation: RootMutationType // Don't forget to add the Mutation Type. Otherwise we can only query data, and not mutate or delete it.
})

// Use CORS
app.use(cors())

// See http://localhost:4000/graphql for the GraphiQL Visual User Interface where you can toy around with queries.
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
);

//********************************
// 5. Start the app.
//********************************
app.listen(4000, () =>
    console.log('Running GraphQL API Server at localhost:4000/graphql ')
)
