import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container} from 'react-bootstrap';

import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import AddMovie from './Components/AddMovie/AddMovie';
import MoviePage from './Components/MoviePage/MoviePage';
import UpdateMovie from './Components/UpdateMovie/UpdateMovie';
import PageNotFound from './Components/PageNotFound/PageNotFound';

import './App.css';

function App() {
  
  return (
   
    <Router>
      <Navbar/>
      <Container fluid>
    <div className="App">
      <Switch>
      <Route path = "/" exact component = {Main}/>
      <Route path = '/login' component = {Login}/> 
      <Route path = '/register' component = {Register}/>
      <Route path = '/addmovie' component = {AddMovie}/>
      <Route path = '/movie/:id' exact component = {MoviePage}/>
      <Route path = '/movie/update/:id' component = {UpdateMovie}/>
      <Route path = '*' component={PageNotFound}/>
      </Switch>
    </div>
    </Container>
    </Router>
    
  );
}

export default App;
