import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import {SignUp} from "./component/SignUp";
import {Login} from "./component/Login";
import {MoveMoney} from "./component/MoveMoney";


class App extends React.Component{

    render(){
        return(
            <div>
                <Router>
                    <h1>Welcome to Stubank</h1>
                    <Link to={"/signup"}><button>Sign Up</button></Link>
                    <Link to={"/login"}><button>Log In</button></Link>

                    <Route path={"/signup"}> <SignUp /> </Route>
                    <Route path={"/login"}> <Login /> </Route>
                </Router>

            </div>
        );
    }
}

ReactDOM.render(<MoveMoney />, document.getElementById('root'));