import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { DestinationSearchComponent } from './destination-search/destination-search.component';

import { DestinationService } from './destination.service';


@NgModule({
  declarations: [
    AppComponent,
    DestinationSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DestinationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
