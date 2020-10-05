import React from 'react';
import {Link} from 'react-router-dom';


export default function PageNotFound(){


    return (
        <div>
            <div className="jumbotron jumbotron-margin">
                    <h1 className="display-4">404 Page not Found </h1>
                    <hr className="my-4"/>
                    <Link to = '/' className="btn btn-outline-primary button-size"  role="button">Home</Link>
                </div>
        </div>
    )
}