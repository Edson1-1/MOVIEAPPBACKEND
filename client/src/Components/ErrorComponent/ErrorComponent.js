import React from 'react';
import {Link} from 'react-router-dom';


export default function ErrorComponent() {

    return (

        <div className="jumbotron jumbotron-margin">
            <h1 className="display-4">Something went wrong! Please try again </h1>
            <Link to = '/' className = "btn btn-outline-dark">Go Back to Home Page</Link>
        </div>

    )
    
}