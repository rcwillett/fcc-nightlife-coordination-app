import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { IAPIResponse } from './iapiresponse';

@Injectable()
export class DestinationService {

  constructor(private _http: HttpClient) { }
  
  searchDestinations(searchTerm): Observable<IAPIResponse> {
      return this._http.get<IAPIResponse>('dest/search-destinations',
      {
      params: {
         'search': searchTerm 
      }
      }).catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse){
    return Observable.throw(err.message);
  }
}