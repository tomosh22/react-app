import React from "react";
import {CreateAccount} from "./CreateAccount";
import {MoveMoney} from "./MoveMoney";
import {Dashboard} from "./Dashboard";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import logo from '../assets/IMG-STUBANK-LOGO.jpg';
import favicon from '../assets/favicon.ico';
import style from "../Style/newStyles.module.css";

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
                                <Link to={"/create_account"}><button className={style.nav_link}>Create account</button></Link>
                                <Link to={"/move_money"}><button className={style.nav_link}>Move Money</button></Link>
                            </nav>
                        </div>
                    </div>
                </header>
                <div>
                    <Route path={"/dashboard"}> <Dashboard /> </Route>
                    <Route path={"/create_account"}> <CreateAccount /> </Route>
                    <Route path={"/move_money"}> <MoveMoney /> </Route>
                </div>
            </Router>
        );
    }
}
