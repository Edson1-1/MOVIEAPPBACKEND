import React, {Component} from 'react';
import Axios from 'axios';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router-dom';
import Card from '../Card/CardComponent';
import './Main.css'
import Jumpotron from '../Jumpotron/Jumpotron';

export default class Main extends Component{
    constructor(props){
        super(props);

        this.state = {
            info: [],
            user : ""

        };
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    componentDidMount(){
        
        try{
        const token = localStorage.getItem('auth-token');
        const user = jwt.verify(token, process.env.REACT_APP_SECRET);
        this.setState({
            user: user
        });

        }catch(err){
            this.setState({
                user: ''
            })

        }
        let config = {
            headers: {
              'auth-token': localStorage.getItem('auth-token'),
            }}

        Axios.get(process.env.REACT_APP_BASE_URL+"movie/", config)
            .then( data => {
                // console.log(data.data);
                this.setState({
                    info: data.data
                });
            })
            .catch( err => {
                console.log(err.response.data);
            })
            
    }

    onClickLogout(e){
        if(localStorage.getItem('auth-token')){
        localStorage.removeItem('auth-token')}
        window.location.reload(false);
    }

    render(){
        if(!localStorage.getItem('auth-token')){
            return ( 
                <Jumpotron/>
            )
        }else if(this.state.user !== '') {
            return(
            
                <div>
                     <h2> MOVIE LIST</h2>
                
                    <Card info = {this.state.info} className = "grid"/>
                </div>

                
            )
        }
        else {
            return(
                <div className="jumbotron jumbotron-margin">
                <h1 className="display-4">Something went horribly wrong!</h1>
                <p>Please Logout and try again</p>
                    <Link to = '/' className = "btn btn-outline-warning" onClick = {this.onClickLogout}>Logout</Link>

                </div>
            )
        }
        
        
        }
            
    
}