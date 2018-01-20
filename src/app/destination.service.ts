import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IDestination } from './idestination';

@Injectable()
export class DestinationService {

  constructor(private http: HttpClient) { }
  
  searchDestinations(searchTerm): Observable<IDestination[]> {
      return this.http.get<IDestination[]>('dest/search-destinations',
      {
      params: {
         'search': searchTerm 
      }
      });
  }

}
