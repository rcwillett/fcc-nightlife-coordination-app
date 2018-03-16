import React from 'react';
import axios from 'axios';
// import destinationSearch from '../components/destinationSearch';
import {Destination} from '../components/destination.jsx';
import {DestinationSearch} from '../components/destinationSearch.jsx';

export class DestinationFinder extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        destinations: []
      }
    }

    getDestinations(searchTerm) {
      axios.get("dest/search-destinations", {params: { search: searchTerm }}).then((resp) => {
        this.setState({destinations: resp.data.businesses});
      });
    }

    render() {
      return (
      <div className="destinationPage">
        <DestinationSearch getDestinations={this.getDestinations.bind(this)} />
        {this.state.destinations.map((destination) => (<Destination key={destination.id} {...destination} />))}
      </div>
      
      );
    }

};