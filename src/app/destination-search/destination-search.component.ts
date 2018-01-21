import { Component, OnInit } from '@angular/core';
import { IAPIResponse } from '../iapiresponse';
import { IDestination } from '../idestination';
import { DestinationService } from '../destination.service';

@Component({
  selector: 'app-destination-search',
  templateUrl: './destination-search.component.html',
  styleUrls: ['./destination-search.component.css']
})
export class DestinationSearchComponent implements OnInit {

  searchTerm: String;
  error: any;
  destinations: IDestination[];

  constructor(private _destinationService: DestinationService) { }

  ngOnInit() {
    this.searchTerm = '';
    this.destinations = <IDestination[]>[];
  }
  
  searchForDestinations(): void {
    this._destinationService.searchDestinations(this.searchTerm).subscribe(
      resp => { this.destinations = resp.businesses.filter(business => !business.is_closed) },
      error => { this.error = <any>error }
      );
  }
  
}
