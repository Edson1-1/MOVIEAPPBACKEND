import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import './Register.css'


export default class Register extends Component{

    constructor(props){
        super(props)

        this.state= {
            name: "",
            email: "",
            password: "",
            error : ''
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     }

     onChangeName(e){
         this.setState({
             name: e.target.value
         });
     }
     onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({
            error: ''
        })
            const {history} = this.props;
                        const userRegister = {
                            name: this.state.name,
                            email: this.state.email,
                            password: this.state.password
                        }
                        Axios.post(process.env.REACT_APP_BASE_URL+'user/register', userRegister)
                            .then( res => {
                                history.push("/login");
                            })
                            .catch( err => {
                                const errorMsg = err.response.data+". Please try again...";
                                console.log("error with register API : "+errorMsg);
                                this.setState({
                                    error: errorMsg
                                })
                            })
                        this.setState({
                            name: "",
                            email: "",
                            password: ""
                        });
    }




    render() {

        if(localStorage.getItem('auth-token') === '' || !localStorage.getItem('auth-token')){
        return(

            <div className="register-container">
               <form onSubmit = {this.onSubmit}>
                   <h1 className = "title-h1">Register</h1>
                   <div className = "form-group">
                   <label for = "Username">Username</label>
                   <input type="text"
                   className = "form-control"
                   name = "Username"
                   placeholder = "Username"
                   value = {this.state.name}
                   onChange = {this.onChangeName}
                   required/>
                   </div>
                   <div class= "form-group">
                   <label for = "Email">Email</label>
                   <input type="email"
                   className = "form-control"
                   name = "Email"
                   placeholder = "Email"
                   value = {this.state.email}
                   onChange = {this.onChangeEmail}
                   required/>
                   </div>
                   <div className = "form-group">
                   <label for = "Password">Password</label>
                   <input type="password"
                   className = "form-control"
                   name = "Password"
                   placeholder = "Password"
                   value = {this.state.password}
                   onChange = {this.onChangePassword}
                   required/>
                   </div>
                   <div className="from-group">
                   <input className = "btn btn-primary"
                   type="submit"
                   value = "Register"
                   onChange = {this.onSubmit}
                   required/>
                   </div>
               </form>
               <div className = "error">
                   {this.state.error}
               </div>
            </div>
        )}
        else {
            return (
                <div className="jumbotron jumbotron-margin">
                <h1 className="display-4">User already Logged In. Cannot Register new account while logged in.</h1>
                <Link to = '/' className = "btn btn-outline-dark">Go Back to Home Page</Link>
            </div>
            )
        }
    }
}