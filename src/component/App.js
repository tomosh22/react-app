import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import style from "../assets/css/homePageStyle.module.css";

import {Header} from "./Header";
import {Dashboard} from "./Dashboard";
import {Login} from "./Login";
import {CreateAccount} from "./CreateAccount";
import {SignUp} from "./SignUp";
import {TransferToAccount} from "./TransferToAccount";
import {MoveMoney} from "./MoveMoney";
import {Admin} from './Admin'
import {Home} from "./Home";

export class App extends Component{
    render(){
        return(
            <div>
                <Router>
                    <Header />
                    <div className={style.main}>
                        <Route path={"/"} exact> <Home /> </Route>
                        <Route path={"/dashboard"}> <Dashboard /> </Route>
                        <Route path={"/login"}> <Login /> </Route>
                        <Route path={"/create_account"}> <CreateAccount /> </Route>
                        <Route path={"/register"}> <SignUp /> </Route>
                        <Route path={"/transfer"}> <TransferToAccount /> </Route>
                        <Route path={"/move_money"}> <MoveMoney /> </Route>
                        <Route path={"/signup"}> <SignUp /> </Route>
                        <Route path={"/admin"}><Admin /></Route>
                    </div>
                </Router>
            </div>
        );
    }
}
