import React, {useContext} from "react";
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
import {Logout} from "./Logout";

export const context = React.createContext()

function LoginControl(){
    const data = useContext(context);
    if(!data.loggedIn){
        return <>
            <Link to={"/login"}><button className={style.nav_link}>Log in</button></Link>
            <Link to={"/signup"}><button className={style.nav_link}>Sign up</button></Link>
        </>
    }
    else{
        return <Link to={"/logout"}><button className={style.nav_link}>Log out</button></Link>
    }
}
export class Account{

    constructor(name,type,balance,currency,accNumber){
        this.name = name;
        this.type = type;
        this.balance = balance;
        this.currency = currency;
        this.accNumber = accNumber;
    }
}
export class Home extends React.Component{
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
        if(typeof(acc) != "Account"){
            console.log("not an account")
        }
        else{
            var accountsCopy = JSON.parse(JSON.stringify(this.state.accounts))
            accountsCopy.push(acc)
            this.setState({accounts:accountsCopy})
        }

    }
    resetState(){
        console.log("resetting")
        this.setState({firstName:null})
        this.setState({lastName:null})
        this.setState({loggedIn:false})
    }
    render(){
        return(
            <context.Provider value={this.state}>
                <Router>
                    <header>
                        <div className={style.container}>
                            <div className={style.header_inner}>
                                <div className={style.logo}>
                                    <img className={style.favicon} src={favicon} alt={"Transparent logo"}/>
                                    <a  href={"//localhost:3000"}>StuBank</a>
                                    <p>{this.state.firstName}</p>
                                </div>
                                <nav>
                                    <Link to={"/dashboard"}><button className={style.nav_link}>Dashboard</button></Link>
                                    <Link to={"/move_money"}><button className={style.nav_link}>Move Money</button></Link>
                                    <LoginControl/>

                                </nav>
                            </div>
                        </div>
                    </header>
                    <div className={style.main}>
                        <Route path={"/dashboard"}> <Dashboard /> </Route>
                        <Route path={"/"} exact> <Welcome /> </Route>
                        <Route path={"/login"} component={Login}/>
                        <Route path={"/create_account"}> <CreateAccount /> </Route>
                        <Route path={"/register"}> <SignUp /> </Route>
                        <Route path={"/transfer"}> <TransferToAccount /> </Route>
                        <Route path={"/move_money"}> <MoveMoney /> </Route>
                        <Route path={"/signup"} component={SignUp}/>
                        <Route path={"/logout"} component={Logout}/>
                    </div>
                </Router>
            </context.Provider>

        );
    }
}