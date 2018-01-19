import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DestinationSearchComponent } from './destination-search/destination-search.component';


@NgModule({
  declarations: [
    AppComponent,
    DestinationSearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
