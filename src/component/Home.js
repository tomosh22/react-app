import React from "react";
import {CreateAccount} from "./CreateAccount";
import {MoveMoney} from "./MoveMoney";
import {Dashboard} from "./Dashboard";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import logo from '../assets/IMG-STUBANK-LOGO.jpg';
import favicon from '../assets/favicon.ico';
import style from "../Style/styles.module.css";

export class Home extends React.Component{
    render(){
        return(
            <div>
                <Router>
                    <header>
                        <div className={style.stickyTop}>
                            <img className={style.favicon} src={favicon} alt={"Transparent logo"}/>
                            <a  href={"//localhost:3000"}>StuBank</a>
                            <div className={style.navigationLinks}>
                                <Link to={"/dashboard"}><button className={style.navLink}>Dashboard</button></Link>
                                <Link to={"/create_account"}><button className={style.navLink}>Create account</button></Link>
                                <Link to={"/move_money"}><button className={style.navLink}>Move Money</button></Link>
                            </div>
                        </div>
                    </header>
                    <Route path={"/dashboard"}> <Dashboard /> </Route>
                    <Route path={"/create_account"}> <CreateAccount /> </Route>
                    <Route path={"/move_money"}> <MoveMoney /> </Route>
                </Router>
                <footer>
                    <p>Contanct information: </p>
                    <p>Sitemap: </p>
                    <p>Related documents:</p>
                    <img src={logo} alt={"StuBank logo"} height={200} width={200}/>
                </footer>
            </div>
        );
    }
}
