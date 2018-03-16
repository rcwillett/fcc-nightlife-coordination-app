import React from 'react';
import axios from 'axios';

class Destination extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userAttending: false
    }
  }
  render() {
    return (<div className="row">
      <div className="col-6">
        <img src={this.props.image_url || 'http://via.placeholder.com/200x200'} />
      </div>
      <div className="col-6">
        <div className="h5">{this.props.name}</div>
      </div>
      {this.state.userAttending ? (<div>You're Going!</div>) : (<button onClick={this.userGoing.bind(this)}>I'm Going!</button>)}
    </div>);
  }

  userGoing() {
    let time = new Date();
    axios.post('/dest/going', { destinationId: this.props.id, time: Date.now(), timeOffset: time.getTimezoneOffset()}).then(
      (resp) => {
        if(resp.data.status){
          this.setState({
            userAttending: true
          });
        }
      },
      (err) => {
        console.log(err);
      });
  }

}

export { Destination };
