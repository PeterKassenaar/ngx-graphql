import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { CountriesComponent } from './countries/countries.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    CountriesComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
