import React from "react";
import {CreateAccount} from "./CreateAccount";
import {MoveMoney} from "./MoveMoney";
import {Dashboard} from "./Dashboard";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import favicon from '../assets/images/favicon.ico';
import style from "../assets/css/homePageStyle.module.css";
import {Login} from "./Login";
import {SignUp} from "./SignUp";
import {TransferToAccount} from "./TransferToAccount";
import {Welcome} from "./Welcome";

export const context = React.createContext()
export class Home extends React.Component{
    render(){
        return(
            <Router>
                <header>
                    <div className={style.container}>
                        <div className={style.header_inner}>
                            <div className={style.logo}>
                                <img className={style.favicon} src={favicon} alt={"Transparent logo"}/>
                                <a  href={"//localhost:3000"}>StuBank</a>
                            </div>
                            <nav>
                                <Link to={"/dashboard"}><button className={style.nav_link}>Dashboard</button></Link>
                                <Link to={"/move_money"}><button className={style.nav_link}>Move Money</button></Link>
                                <Link to={"/login"}><button className={style.nav_link}>Log in</button></Link>
                                <Link to={"/signup"}><button className={style.nav_link}>Sign up</button></Link>
                            </nav>
                        </div>
                    </div>
                </header>
                <div className={style.main}>
                    <Route path={"/dashboard"}> <Dashboard /> </Route>
                    <Route path={"/"} exact> <Welcome /> </Route>
                    <Route path={"/login"}> <Login /> </Route>
                    <Route path={"/create_account"}> <CreateAccount /> </Route>
                    <Route path={"/register"}> <SignUp /> </Route>
                    <Route path={"/transfer"}> <TransferToAccount /> </Route>
                    <Route path={"/move_money"}> <MoveMoney /> </Route>
                    <Route path={"/signup"}> <SignUp /> </Route>
                </div>
            </Router>
        );
    }
}
