import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {GET_COUNTRIES, GET_COUNTRY} from "../graphql/graphql.countries.queries";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html'
})
export class CountriesComponent implements OnInit {

  countries: any[] = [];
  countryDetail: any;
  countryFlag: any;
  error: any;

  constructor(private apollo: Apollo, private http:HttpClient) {
  }

  ngOnInit(): void {
    this.apollo.query({
      query: GET_COUNTRIES
    }).subscribe(({data, error}: any) => {
      this.countries = data.countries;
    })
  }

  getCountryDetails(country: any): void {
    this.apollo.query({
      query: GET_COUNTRY,
      variables: {
        code: country.code
      }
    }).subscribe({
      next: (({data}: any) => {
        console.log('Country details: ', data);
        this.countryDetail = data.country;
        this.countryFlag = 'https://countryflagsapi.com/png/' + this.countryDetail.code
      })
    })
  }
}
