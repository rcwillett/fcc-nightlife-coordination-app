import React from 'react';
import axios from 'axios';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loggedIn: false,
            userInfo: {}
        };
        this.isLoggedIn();
    }

    isLoggedIn() {
        axios.get('/loggedIn').then((resp) => {
            this.setLoginStatus(resp.data);
        })
    }

    logout() {
        axios.get('/logout').then((resp) => {
            if (resp.data.status) {
                this.setState(() => {
                    return {
                        loading: true,
                        loggedIn: false,
                        userInfo: {}
                    };
                });
            }
        })
    }

    setLoginStatus(data) {
        if (data.status) {
            this.setState({ loading: false, loggedIn: true, userInfo: {} });
        }
        else {
            this.setState({ loading: false, loggedIn: false, userInfo: data.user });
        }
    }

    render() {
        return (
            <div className="container">
            <div class="col-sm row reverse">
            {this.state.loggedIn ? <div>{this.state.user}<button className="primary" onClick={this.logout.bind(this)}>Log Out</button></div> : <a className="button primary" href="/auth/github">Log In</a>}
            </div>
            </div>
        );
    }
}
