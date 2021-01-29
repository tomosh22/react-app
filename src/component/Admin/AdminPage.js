import React from "react";
import {NavLink, BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import {AdminDataAnalysis} from "./AdminDataAnalysis";
import {AdminUserList} from "./AdminUserList";
import style from "../../assets/css/admin.module.css"
import {AdminUserChange} from "./AdminUserChange";
import {AdminLogin} from "./AdminLogin";

export const context = React.createContext();

export class AdminPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            resetState: () => this.resetState(),
            //resetState:()=>console.log("dfsingdsoi"),
            username: null,
            setUsername: (usr) => this.setState({username: usr}),
            loggedIn: false,
            setLoggedIn: (bool) => this.setState({loggedIn: bool})
        }
    }

    pageHeader = () =>{
            return(
                <nav className={style.navigation}>
                    <NavLink classname={style.navButtonHolder} to={"/admin/service"}>
                        <button className={style.navigationButton}>Data Analysis</button>
                    </NavLink>
                    <NavLink to={"/admin/service/userList"}>
                        <button className={style.navigationButton}>List Of Users</button>
                    </NavLink>
                    <NavLink to={"/admin"}>
                        <button className={style.navigationButton} onClick={() => this.setState({loggedIn: false, username:""})}>Log Off</button>
                    </NavLink>
                </nav>
            )
    }

    render(){
        return(
            <div>
                <context.Provider value={this.state}>
                    <Router>
                        {this.state.loggedIn? this.pageHeader() : ''}
                        <div className={style.contentHolder}>
                            <Switch>
                                <Route exact path={"/admin"} component={AdminLogin}/>
                                <Route exact path={"/admin/service"}>
                                    {this.state.loggedIn? <AdminDataAnalysis/> : <Redirect to={'http://localhost:3001/admin'}/>}
                                </Route>>
                                <Route exact path={"/admin/service/userList"}>
                                    {
                                        this.state.loggedIn? <AdminUserList/> : <Redirect to={'http://localhost:3001/admin'}/>
                                    }
                                </Route>
                                <Route path={'/admin/service/userChange/:username'}
                                       render={(props) => <AdminUserChange {...props}/>}
                                />
                            </Switch>
                        </div>
                    </Router>
                </context.Provider>
            </div>
        )
    }
}
