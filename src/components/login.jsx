import React from 'react';
import axios from 'axios';

export class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            loggedIn: false,
            userInfo: {}
        };
        this.isLoggedIn = () => {
            axios.get('/loggedIn').then((resp) => {
                this.setLoginStatus(resp.data);
            })
        };
        this.setLoginStatus = (data) => {
            if(data.status){
                this.setState({loading: false, loggedIn: false, userInfo: {} });
            }
            else{
                this.setState({loading: false, loggedIn: true, userInfo: data.user});
            }
        };
        this.isLoggedIn();
    }
    render() {
        return (
            <div>
            {this.state.loggedIn ? <div>{this.state.user}</div> : <a href="/auth/login"></a>}
            </div>
            );
    }
}
