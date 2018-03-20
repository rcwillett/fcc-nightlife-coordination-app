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
    return (
      <div className="row">
      <div className="col-sm col-md-8 col-md-offset-2">
      <div className="card-fluid">
      <div className="section row">
      <div className="col-sm">
      <a href={this.props.url}>
        <h3>{this.props.name}</h3>
        </a>
      </div>
      </div>
            <div className="section row">
      <div className="col-sm-6 col-md-4">
        <img className="media" src={this.props.image_url || 'http://via.placeholder.com/200x200'} />
      </div>
      <div className="col-sm-6 col-md-8">
      <div class="row">
      <div className="col-sm-12">
      {this.state.userAttending ? (<div>You're Going!</div>) : (<button onClick={this.userGoing.bind(this)}>I'm Going!</button>)}
      <div>{this.state.usersAttending} - going</div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
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
