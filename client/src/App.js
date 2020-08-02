import React from 'react';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import WebMapView from './Components/MapComponent';
import PrivateRoute from './hocs/PrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {

  return (
    <Router>
      <NavBar/>
      <Route exact path="/Mapp-App" component={Register} />
      <Route exact path="/" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path='/map' component={WebMapView} />
      <Route exact path="/map" component={WebMapView} />
    </Router>
  );
}

export default App;
