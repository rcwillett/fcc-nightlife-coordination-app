import React from 'react';

export class DestinationSearch extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        searchTerm : ""
      }
    }

    handleTextChange (e) {
      this.setState({
        searchTerm : e.target.value
      });
    }

    handleSubmit (e){
      e.preventDefault();
      this.props.getDestinations(this.state.searchTerm);
    }

    render() {
      return (
      <form className="searchDestinationForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" onChange={this.handleTextChange.bind(this)} value={this.state.searchTerm} />
        <input type="submit" value="Get Locations" />
      </form>
      );
    }
};
