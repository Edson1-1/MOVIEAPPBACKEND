import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import './Login.css'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
            error: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            err: '',
        });
        const {history} = this.props;

        const userLogin = {
            email: this.state.email,
            password: this.state.password
        }
        try{
            const data = await Axios.post(process.env.REACT_APP_BASE_URL+'user/login', userLogin);
            const token = data.data;
            localStorage.setItem('auth-token', token);
            history.push('/');
            window.location.reload(false);
        }catch(err) {
            const error = err.response.data;
            console.log('error is: ', error);
            this.setState({
                error: error+''
            });
        }

        this.setState({
            email: "",
            password: ""
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password : e.target.value
        });
    }

    render() {

        if(!localStorage.getItem('auth-token')){
        return (
            <div class="login-container">
                
                <form onSubmit={this.onSubmit}>
                <h1 className = "title-h1">Login</h1>
                <div className = "form-group">
                    <label for = "Email">Email</label>
                    <input type = "email" 
                    className = "form-control"
                    name = "Email" 
                    placeholder = "Email" 
                    value={this.state.email} 
                    onChange={this.onChangeEmail}
                    required/>
                </div>
                <div className = "form-group">
                    <label for = "Password">Password</label>
                    <input type = "password"
                    className = "form-control" 
                    name="Password" 
                    placeholder = "Password"
                    value = {this.state.password}
                    onChange = {this.onChangePassword}
                    required/>
                </div>
                <div className = "form-group">
                    <input className = "btn btn-primary" type = "submit" value="Login" onSubmit = {this.onSubmit}/>
                </div>
                </form>
                <div>
                    <p className = "error">{this.state.error} </p>
                </div>
            </div>
        )}
        else {
            return(
                
                <div className="jumbotron jumbotron-margin">
                    <h1 className="display-4">User already Logged In</h1>
                    <Link to = '/' className = "btn btn-outline-dark">Go Back to Home Page</Link>
                </div>
            )
        }
        
    }

}