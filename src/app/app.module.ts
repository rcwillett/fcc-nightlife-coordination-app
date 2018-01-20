import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DestinationSearchComponent } from './destination-search/destination-search.component';

import { DestinationService } from './destination.service';


@NgModule({
  declarations: [
    AppComponent,
    DestinationSearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DestinationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
