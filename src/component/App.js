import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import {Header} from "./Header";
import {Dashboard} from "./Dashboard";
import {Login} from "./Login";
import {CreateAccount} from "./CreateAccount";
import {SignUp} from "./SignUp";
import {TransferToAccount} from "./TransferToAccount";
import {MoveMoney} from "./MoveMoney";
import {AdminLogin} from './Admin/AdminLogin'
import {Home} from "./Home";
import {AdminPage} from "./Admin/AdminPage";

export class App extends Component{
    pageLook =()=>{
        const pathname = window.location.pathname
        if (pathname === "/admin"){
            return(
                <div>
                    <Router>
                        <div>
                            <Route path={"/admin"}><AdminLogin /></Route>
                            <Route path={"/service"}><AdminPage /></Route>
                        </div>
                    </Router>
                </div>
            );
        }
        else{
            return(
                <div>
                    <Router>
                        <Header />
                        <div>
                            <Route path={"/"} exact> <Home /> </Route>
                            <Route path={"/dashboard"}> <Dashboard /> </Route>
                            <Route path={"/login"}> <Login /> </Route>
                            <Route path={"/create_account"}> <CreateAccount /> </Route>
                            <Route path={"/register"}> <SignUp /> </Route>
                            <Route path={"/transfer"}> <TransferToAccount /> </Route>
                            <Route path={"/move_money"}> <MoveMoney /> </Route>
                            <Route path={"/signup"}> <SignUp /> </Route>
                        </div>
                    </Router>
                </div>
            );
        }
    }

    render(){
        return this.pageLook();
    }
}
