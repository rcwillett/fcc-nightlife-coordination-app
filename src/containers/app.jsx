import React from 'react';
import axios from 'axios';
// import destinationSearch from '../components/destinationSearch';
import {Destination} from '../components/destination.jsx';

export default class App extends React.Component {

    constructor(props){
      super(props);
      this.destinations = [
        {
            "id": "pai-northern-thai-kitchen-toronto-5",
            "name": "Pai Northern Thai Kitchen",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/KzTHwCR9B_pITTngL-rsqQ/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/pai-northern-thai-kitchen-toronto-5?adjust_creative=Ym5lbVtpQ7CKVd68E5q5ow&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Ym5lbVtpQ7CKVd68E5q5ow",
            "review_count": 1616,
            "categories": [
                {
                    "alias": "thai",
                    "title": "Thai"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 43.647866,
                "longitude": -79.3886415
            },
            "transactions": [
                "restaurant_reservation"
            ],
            "price": "$$",
            "location": {
                "address1": "18 Duncan Street",
                "address2": "",
                "address3": "",
                "city": "Toronto",
                "zip_code": "M5H 3G8",
                "country": "CA",
                "state": "ON",
                "display_address": [
                    "18 Duncan Street",
                    "Toronto, ON M5H 3G8",
                    "Canada"
                ]
            },
            "phone": "+14169014724",
            "display_phone": "+1 416-901-4724",
            "distance": 3010.0958709331258
        },
        {
            "id": "seven-lives-tacos-y-mariscos-toronto",
            "name": "Seven Lives Tacos Y Mariscos",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/4vmIs9jTNYlK24wb2WrQLg/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/seven-lives-tacos-y-mariscos-toronto?adjust_creative=Ym5lbVtpQ7CKVd68E5q5ow&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Ym5lbVtpQ7CKVd68E5q5ow",
            "review_count": 977,
            "categories": [
                {
                    "alias": "mexican",
                    "title": "Mexican"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 43.6543411559068,
                "longitude": -79.4004796072841
            },
            "transactions": [],
            "price": "$",
            "location": {
                "address1": "69 Kensington Avenue",
                "address2": "",
                "address3": "",
                "city": "Toronto",
                "zip_code": "M5T 2K2",
                "country": "CA",
                "state": "ON",
                "display_address": [
                    "69 Kensington Avenue",
                    "Toronto, ON M5T 2K2",
                    "Canada"
                ]
            },
            "phone": "+14163934636",
            "display_phone": "+1 416-393-4636",
            "distance": 2236.769242876038
        }
      ];
    }

    render() {
      return (
      <div class="destinationPage">
        // <destinationSearch getDestinations={this.getDestinations} />
        {this.destinations.map((destination) => (<Destination {...destination} />))}
      </div>
      );
    }

    getDestinations(searchTerm) {
      console.log(searchTerm);
      // axios.get("/search-destinations").then(function(resp){
      //   this.setState({destinations: resp});
      // });
    }

};
