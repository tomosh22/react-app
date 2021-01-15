import React, {Component, useContext} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import style from "../assets/css/homePageStyle.module.css";
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
import {Logout} from "./Logout";
import {ErrorPage} from "./Error"
import {Switch} from "react-router";

export const context = React.createContext()

export class Account{

    constructor(name,type,balance,currency,accNumber){
        this.name = name;
        this.type = type;
        this.balance = balance;
        this.currency = currency;
        this.accNumber = accNumber;
    }
}

export class App extends Component{
    pageLook =()=>{
        const pathname = window.location.pathname
        if (pathname === "/admin"){
            return(
                <div>
                    <Router>
                        <div>
                            <Route exact path={"/admin"}><AdminLogin /></Route>
                            <Route exact path={"/service"}><AdminPage /></Route>
                        </div>
                    </Router>
                </div>
            );
        }
        else{
            return(
                <context.Provider value={this.state}>
                    <Router>
                        <Header />
                        <div className={style.main}>
                            <Switch>
                                <Route exact path={"/"}> <Home /> </Route>
                                <Route exact path={"/dashboard"}> <Dashboard /> </Route>
                                <Route exact path={"/login"}> <Login /> </Route>
                                <Route exact path={"/create_account"}> <CreateAccount /> </Route>
                                <Route exact path={"/register"}> <SignUp /> </Route>
                                <Route exact path={"/transfer"}> <TransferToAccount /> </Route>
                                <Route exact path={"/move_money"}> <MoveMoney /> </Route>
                                <Route exact path={"/signup"}> <SignUp /> </Route>
                                <Route exact path={"/logout"}><Logout /></Route>
                                <Route exact path={"*"}><ErrorPage /></Route>
                            </Switch>
                        </div>
                    </Router>
                </context.Provider>
            );
        }
    }

    state = {
        resetState:() => this.resetState(),
        //resetState:()=>console.log("dfsingdsoi"),
        username:"usr",
        setUsername:(usr) => this.setState({userName:usr}),
        firstName:"bob",
        setFirstName:(name) => this.setState({firstName:name}),
        lastName:null,
        setLastName:(name) => this.setState({lastName:name}),
        loggedIn:false,
        setLoggedIn:(bool) => this.setState({loggedIn:bool}),
        accounts:[],
        addAccount:(acc) => this.addAccount(acc),
        removeAccount:(accNumber) => this.removeAccount(accNumber)
    }
    removeAccount(accNumber){
        for(var x = 0; x<this.state.accounts.length;x++){
            if(this.state.accounts[x].accNumber == accNumber){
                var accountsCopy = JSON.parse(JSON.stringify(this.state.accounts))
                accountsCopy.splice(x,1)
                this.setState({accounts:accountsCopy})
            }
        }
    }
    addAccount(acc){
        console.log("adding account",acc)
        var accountsCopy = JSON.parse(JSON.stringify(this.state.accounts))
        accountsCopy.push(acc)
        this.setState({accounts:accountsCopy})
    }
    resetState(){
        console.log("resetting")
        this.setState({firstName:null})
        this.setState({lastName:null})
        this.setState({loggedIn:false})
    }

    render(){
        return this.pageLook();
    }
}
