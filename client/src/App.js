import React from 'react';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Footer from './Components/Footer'
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
      <Route exact path="/home" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path='/map' component={WebMapView} />
      <Route exact path="/map" component={WebMapView} />
      <Footer/>
    </Router>
  );
}

export default App;
