import React from 'react';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import WebMapView from './Components/MapComponent';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {

  return (
    <Router>
      <NavBar/>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/map" component={WebMapView} />
    </Router>
  );
}

export default App;
