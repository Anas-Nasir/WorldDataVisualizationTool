import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CountryData {
  name: string;
  capitalCity: string;
  region: string;
  incomeLevel: string;
  longitude: number;
  latitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {
  private baseUrl = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) { }

  getCountryDetails(countryCode: string): Observable<any> {
    const url = `${this.baseUrl}/${countryCode}?format=json`;
    return this.http.get(url);
  }
}
