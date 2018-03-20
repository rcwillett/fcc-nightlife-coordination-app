import React from 'react';
import axios from 'axios';

class Destination extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userAttending: props.attending,
      usersAttending: props.attendants
    }
  }
  render() {
    return (<div className="row">
      <div className="col-6">
        <img width='100px' src={this.props.image_url || 'http://via.placeholder.com/200x200'} />
      </div>
      <div className="col-6">
        <div className="h5">{this.props.name}</div>
      </div>
      {this.state.userAttending ? (<div>You're Going!</div>) : (<button onClick={this.userGoing.bind(this)}>I'm Going!</button>)}
      <div>
      {this.state.usersAttending} - going
      </div>
    </div>);
  }

  userGoing() {
    let time = new Date();
    axios.post('/dest/going', { destinationId: this.props.id, timeOffset: time.getTimezoneOffset() }).then(
      (resp) => {
        if (resp.data.status) {
          this.setState((prevState) => {
            return {
              userAttending: true,
              usersAttending: ++prevState.usersAttending
            };
          });
        }
      },
      (err) => {
        console.log(err);
      });
  }

}

export { Destination };
