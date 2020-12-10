import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import {Home} from "./component/Home";
import {SignUp} from "./component/SignUp";
import {MoveMoney} from "./component/MoveMoney";
import {CreateAccount} from "./component/CreateAccount";
import {Login} from "./component/Login";



class App extends React.Component{
    render(){
        return(
            <div>
                <Router>
                    <Switch>
                        <Link to={"/signup"}>Sign Up</Link>
                    </Switch>
                    <br></br>
                    <Switch>
                        <Link to={"/login"}>Log In</Link>
                    </Switch>

                    <Route path={"/signup"}> <SignUp /> </Route>
                    <Route path={"/login"}> <Login /> </Route>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));