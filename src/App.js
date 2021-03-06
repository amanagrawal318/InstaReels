import React, { useContext, useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./Components/Header";
import Feeds from "./Components/Feeds";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import { AuthContext, AuthProvider } from "./context/AuthProvider.jsx";

function App() {
  //let {currentUser} = useContext(AuthContext);
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/signup" component={Signup} exact></Route>
            <PrivateRoute path="/" comp={Feeds}></PrivateRoute>
            <PrivateRoute path="/profile" comp={Profile}></PrivateRoute>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

function HeaderUser(props){
  let { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return currentUser!=null?
   ( <Header></Header>)
  :(<div></div>);
}

function PrivateRoute(props) {
  let { comp: Component, path } = props;
  // Feeds ?? loggedIn and path="/"
  let { currentUser } = useContext(AuthContext);
   //currentUser = true;
  return currentUser ? (
    <Route path={path} component={Component}></Route>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}

export default App;