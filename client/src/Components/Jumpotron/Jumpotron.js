import React from 'react';
import {Link} from 'react-router-dom';


export default function Jumpotron(){

    return(
        <div className="jumbotron jumbotron-margin">
                    <h1 className="display-4">Hello, Welcome to MovieBase </h1>
                    <p className="lead">You can add and view all your movies here</p>
                    <hr className="my-4"/>
                    <p>Its seems that you are not logged in.</p>
                    <p>Please Login:</p>
                    <Link to = '/login' className="btn btn-outline-primary button-size"  role="button">Login</Link>
                    <p>To Create an Account:</p>
                    <Link to = '/register' className="btn btn-outline-primary button-size"  role="button">Register</Link>
                </div>
    )
}
