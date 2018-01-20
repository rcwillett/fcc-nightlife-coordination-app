import { Component, OnInit } from '@angular/core';
import { IDestination } from '../idestination';
import { DestinationService } from '../destination.service';

@Component({
  selector: 'app-destination-search',
  templateUrl: './destination-search.component.html',
  styleUrls: ['./destination-search.component.css']
})
export class DestinationSearchComponent implements OnInit {

  searchTerm: string;
  destinations: IDestination;

  constructor(private destinationService: DestinationService) { }

  ngOnInit() {
    this.searchTerm = '';
    this.destinations = [];
  }
  
  searchForDestinations(): void {
    this.destinationService.searchDestinations(this.searchTerm).subscribe(destinationResults => this.destinations = destinationResults);
    return;
  }
  
}
