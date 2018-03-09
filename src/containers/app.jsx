import React from 'react';
import axios from 'axios';
// import destinationSearch from '../components/destinationSearch';
import { Login } from '../components/login.jsx';
import { DestinationFinder } from './destinationFinder.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="destinationPage">
      <Login />
      <DestinationFinder />
      </div>
    );
  }

};
