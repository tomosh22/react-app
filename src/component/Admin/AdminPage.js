import React from "react";

import {NavLink, BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import {AdminDataAnalysis} from "./AdminDataAnalysis";
import {AdminUserList} from "./AdminUserList";
import style from "../../assets/css/admin.module.css"
import {AdminUserChange} from "./AdminUserChange";

export class AdminPage extends React.Component{

    state = {
        loggedIn: true
    }

    ifLogged = () =>{
        return(
            <Switch>
                <Route exact path={"/service"} component={AdminDataAnalysis}/>
                <Route exact path={"/service/userList"} component={AdminUserList}/>
                <Route path={'/service/userChange/:username'}
                       render={props => <AdminUserChange {...props}/>}/>
            </Switch>
        )
    }

    render(){
        return(
            <div>
                <Router>
                    <nav className={style.navigation}>
                        <NavLink classname={style.navButtonHolder} to={"/service"}>
                            <button className={style.navigationButton}>Data Analysis</button>
                        </NavLink>
                        <NavLink to={"/service/userList"}>
                            <button className={style.navigationButton}>List Of Users</button>
                        </NavLink>
                    </nav>
                    <div className={style.contentHolder}>
                        {this.state.loggedIn? this.ifLogged() : <Redirect to={'/admin'}/>}
                    </div>
                </Router>
            </div>
        )
    }
}
