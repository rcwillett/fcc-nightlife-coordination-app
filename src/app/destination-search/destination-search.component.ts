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

  searchTerm: string;
  destinations: IDestination[];

  constructor(private destinationService: DestinationService) { }

  ngOnInit() {
    this.searchTerm = '';
    this.destinations = <IDestination[]>[];
  }
  
  searchForDestinations(): void {
    this.destinationService.searchDestinations(this.searchTerm).subscribe(resp => this.destinations = resp.businesses);
    return;
  }
  
}
