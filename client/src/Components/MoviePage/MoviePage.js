import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

import './MoviePage.css'
import ErrorComponent from '../ErrorComponent/ErrorComponent';

export default class MoviePage extends Component{

    constructor(props){
        super(props); 
        
        this.state = {
            title: "",
            description: "",
            img: "",
            jumpo: false
        
        }  
        
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    componentDidMount(){
        let config = {
            headers: {
              'auth-token': localStorage.getItem('auth-token'),
            }}

        Axios.get(process.env.REACT_APP_BASE_URL+"movie/"+this.props.match.params.id, config)
            .then( data => {
                // console.log(data.data);
                this.setState({
                    title: data.data.title,
                    description: data.data.description,
                    img: process.env.REACT_APP_IMGSRC+data.data.img.substring(8),
                    update: "Update",
                    delete: "Delete"
                });
            })
            .catch(err => {
                console.log(err.response.data);
                this.setState({
                    jumpo: true
                })
            })


    }

    onClickDelete(e){
        let config = {
            headers: {
              'auth-token': localStorage.getItem('auth-token'),
            }}


        Axios.delete(process.env.REACT_APP_BASE_URL+"movie/delete/"+this.props.match.params.id, config)
            .then( data => {
                console.log(data.data);
                this.props.history.push('/');
            })
            .catch(err=>{
                console.log(err)
                console.log(err.response.data)
            })
    }


    render(){

        if(this.state.title !== ''){
            return(
                <div className="details"> 
                    <div className = "media">
                        <img class="align-self-center mr-3 image" src = {this.state.img} alt = {this.state.title}/>
                        <div className = "media-body">
                        <h3 className="mt-0">{this.state.title}</h3>
                        <p className = "mb-0">{this.state.description}</p>
                        <Link to ={"/movie/update/"+this.props.match.params.id}><button className = "btn btn-outline-primary" >Update</button></Link>
                        <button className="btn btn-outline-danger" onClick = {this.onClickDelete}>Delete</button>  
                        </div>      
                    </div>   
                </div>
            )
        }
        else if(this.state.jumpo === true) {
            return(
               <ErrorComponent/>
            )
        }
        else {
            return( <div></div>)
        }
    }
}