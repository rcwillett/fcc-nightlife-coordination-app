import React from 'react';
import axios from 'axios';
import destinationSearch from '../components/destinationSearch';
import destination from '../components/destination';

export default class App extends React.Component {
  
    constructor(){
      this.destinations = [];
    }
  
    render() {
      return (
      <div class="destinationPage">
        <destinationSearch getDestinations={this.getDestinations} />
        <desinationResults destinations={this.destinations} />
      </div>
      );
    }
    
    getDestinations(searchTerm) {
      console.log(searchTerm);
      axios.get("/search-destinations").then(function(resp){
        this.setState({destinations: resp});
      });
    }
    
};