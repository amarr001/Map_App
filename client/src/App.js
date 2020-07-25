import React from 'react';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Todos from './Components/Todos';
import WebMapView from './Components/MapComponent';
import PrivateRoute from './hocs/PrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {

  return (
    <Router>
      <NavBar/>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path='/todos' component={Todos} />
      <Route exact path="/todos" component={Todos} />
      <Route exact path="/map" component={WebMapView} />
    </Router>
  );
}

export default App;
