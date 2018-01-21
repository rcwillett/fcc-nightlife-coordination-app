import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IAPIResponse } from './iapiresponse';

@Injectable()
export class DestinationService {

  constructor(private http: HttpClient) { }
  
  searchDestinations(searchTerm): Observable<IAPIResponse> {
      return this.http.get<IAPIResponse>('dest/search-destinations',
      {
      params: {
         'search': searchTerm 
      }
      });
  }

}
