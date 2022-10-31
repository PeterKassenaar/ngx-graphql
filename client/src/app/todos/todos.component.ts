import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {ADD_TODO, GET_TODO, DELETE_TODO, GET_TODOS, UPDATE_TODO} from "../graphql/graphql.queries";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {

  // TODO: (haha!) create a Todo-interface or class, or the like.
  todos: any[] = [];
  error: any;
  result: any;
  resultHeader: string = 'Result:';
  btnText: 'Submit' | 'Update' = 'Submit'

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {

    // Set up apollo watcher on todos
    this.apollo.watchQuery({
      query: GET_TODOS,
      pollInterval: 500 // look every 0.5s if there are new todos
    }).valueChanges.subscribe({
      next: (({data, error}: any) => {
        this.todos = data.todos
        this.error = error
      })
    })
  }

  todoForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  // apollo graphql query to add todo
  addTodo() {
    if (this.btnText == 'Submit') {
      this.apollo.mutate({
        mutation: ADD_TODO,
        variables: {
          name: this.todoForm.value.name, // typed form, gives intellisense
          description: this.todoForm.value.description
        },
        refetchQueries: [{
          query: GET_TODOS
        }]
      }).subscribe({
        next: ({data}: any) => {
          console.log('TODO added: ', data.data);
          this.resultHeader = 'Result: added'
          this.result = data;
          this.todoForm.reset()
        },
        error: (err) => this.error = err
      })
    } else {
      this.updateTodo(this.todoForm.value.id as string)
    }
  }

  deleteTodo(id: string) {
    // apollo graphql query to delete todo
    this.apollo.mutate({
      mutation: DELETE_TODO,
      variables: {
        id: id,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe({
        next: ({data}: any) => {
          this.resultHeader = 'Result: deleted'
          this.result = data.deleteTodo
          console.log('TODO Deleted: ', data.deleteTodo);
        },
        error: (error) => this.error = error
      }
    );
  }

  getTodo(id: string) {
    this.apollo.query({
      query: GET_TODO,
      variables: {
        id: id,
      },
    }).subscribe({
      next: ({data}: any) => {
        console.log('Fetched single todo: ', data)
        this.todoForm.patchValue({
          id: data.todo.id,
          name: data.todo.name,
          description: data.todo.description
        })
        this.btnText = 'Update'
      },
      error: err => {
        console.log(' Error!', err)
      }
    })
  }

  updateTodo(id: string) {
    this.apollo.mutate({
      mutation: UPDATE_TODO,
      variables: {
        id: id,
        name: this.todoForm.value.name, // typed form, gives intellisense
        description: this.todoForm.value.description
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe({
      next: ({data}: any) => {
        console.log('Todo updated', data)
        this.resultHeader = 'Result: updated'
        this.result = data
        this.todoForm.reset()
        this.btnText = 'Submit'
      },
      error: err => console.log('Error!', err)
    })
  }
}
