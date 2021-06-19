
import './App.css';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';


import Home from './components/home'
import SignUp from './components/signup'
import Login from './components/login'
import Dashboard from './components/dashboard'
import Enrolled from './components/EnrolledSchemes'
import Available from './components/AvailableSchemes'
function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/"         component=  {Home}  /> 
        <Route path="/login"    component=  {Login}  /> 
        <Route path="/sign-up"  component=  {SignUp}  /> 
        <Route path="/dashboard"  component=  {Dashboard}  /> 
        <Route path="/enrolled"  component=  {Enrolled}  /> 
        <Route path="/available"  component=  {Available}  /> 
      </Switch>
    </Router>

   
  );
}

export default App;
