import React from "react";
import {CreateAccount} from "./CreateAccount";
import {MoveMoney} from "./MoveMoney";
import {Dashboard} from "./Dashboard";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import logo from './IMG-STUBANK-LOGO.jpg'

export class Home extends React.Component{
    render(){
        return(
            <div>
                <Router>
                    <Link to={"/dashboard"}><button>Dashboard</button></Link>
                    <Link to={"/create_account"}><button>Create account</button></Link>
                    <Link to={"/move_money"}><button>Move Money</button></Link>
                    <Route path={"/dashboard"}> <Dashboard /> </Route>
                    <Route path={"/create_account"}> <CreateAccount /> </Route>
                    <Route path={"/move_money"}> <MoveMoney /> </Route>
                </Router>
                <img src={logo} alt={"StuBank logo"} height={200} width={200}/>
            </div>
        );
    }
}