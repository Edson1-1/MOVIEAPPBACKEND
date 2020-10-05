import React, {Component} from 'react';
import jwt from 'jsonwebtoken';
import Axios from 'axios';

import './UpdateMovie.css'
import Jumpotron from '../Jumpotron/Jumpotron';


export default class UpdateMovie extends Component{

    
    constructor(props){
        super(props);

        this.state={
            title:'',
            description: '',
            file: null,
            user: "",
            APImsg: ""
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        try{
            const token = localStorage.getItem('auth-token');
            const user = jwt.verify(token, 'secretKey1234');
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
                'auth-token': localStorage.getItem('auth-token'),}}

        Axios.get(process.env.REACT_APP_BASE_URL+"movie/"+this.props.match.params.id, config)
            .then( data => {
                // console.log(data.data);
                this.setState({
                    title: data.data.title,
                    description: data.data.description,
                });
            })
            .catch(err => {
                console.log(err.response);
            }) 
    }
    
    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeFile(e){
        let files = e.target.files[0]
        this.setState({
            file: files
        })
    }

    onSubmit(e){
        e.preventDefault();
        let config = {
            headers: {
              'auth-token': localStorage.getItem('auth-token'),
            }}
        let formdata = new FormData();
        formdata.append('title', this.state.title);
        formdata.append('description', this.state.description);
        formdata.append('image', this.state.file);

        Axios.put(process.env.REACT_APP_BASE_URL+"movie/update/"+this.props.match.params.id, formdata, config)
            .then( data => {
                this.setState({
                    APImsg : data.data
                    });
                    this.setState({
                        title: "",
                        description: "",
                        file: null
        
                    })

                    this.props.history.push('/');
            })
            .catch(err => {
                // console.log(err);
                console.log(err.response.data);
                 this.setState({
                    APImsg : err.response.data
                    });
            })
    }
    
    
    render(){
        if(!localStorage.getItem('auth-token')){
            return (
                <div>
                    <Jumpotron/>
                    </div>
                )
            } else if(this.state.user !== ''){

            return(
                <form onSubmit = {this.onSubmit} className = "CustomContainer">
                    <h1>Update Movie</h1>
                    <div className = "form-group">
                        <label for = "title">Title</label>
                        <input type="text"
                    className = "form-control"
                    name = "title"
                    placeholder = "Title"
                    value = {this.state.title}
                    onChange = {this.onChangeTitle}
                    required/>
                    </div>
                    <div className = "form-group">
                        <label for = "description">Description</label>
                        <textarea type="text"
                    className = "form-control scrollbar-ripe-malinka"
                    rows = "10"
                    name = "description"
                    placeholder = "Description"
                    value = {this.state.description}
                    onChange = {this.onChangeDescription}
                    required/>
                    </div>
                    <div className = "form-group">
                        <label for = "Upload-image">Upload Image</label>
                        <br/>
                        <input type="file"
                    name = "Upload-image"
                    onChange = {this.onChangeFile}
                    />
                    </div>
                    <div className = "form-group">
                        <input type="submit"
                        className = "btn btn-primary btn-lg"
                    value="Submit"
                    onSubmit = {this.onSubmit}
                    required/>
                    </div>
                    <div> {this.state.APImsg}</div>
                </form>
            
        )
        }else {
            return(
                <h4> You are not authorized to access this page. Please login with valid id or Register a new account. </h4>
            )}
    }
}