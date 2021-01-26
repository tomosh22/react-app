import React, {Component, useContext} from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
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
import {FAQ} from "./FAQ";
import {ContactUs} from "./ContactUs";
import {ErrorPage} from "./Error"
import {Switch} from "react-router";

import style from "../assets/css/homePageStyle.module.css";

export const context = React.createContext()

export class Account {

    constructor(name, type, balance, currency, accNumber) {
        this.name = name;
        this.type = type;
        this.balance = balance;
        this.currency = currency;
        this.accNumber = accNumber;
    }
}

export class Transaction {
    constructor(id, amount, dateTime, nameTo, accNumberTo, accNumberFrom, currency, reference = null, tag = null) {
        this.id = id;
        this.amount = amount;
        this.dateTime = dateTime;
        this.nameTo = nameTo;
        this.accNumberTo = accNumberTo;
        this.accNumberFrom = accNumberFrom;
        this.currency = currency;
        this.reference = reference;
        this.tag = tag
    }
}

const vendorCategories = {
    entertainment: "Entertainment",
    lifestyle: "Lifestyle",
    supermarkets: "Supermarkets",
    takeout: "Takeout",
    shopping: "Shopping"
}

export class Vendor {
    constructor(name, category) {
        this.name = name;
        this.category = category
    }
}

export class App extends Component {
    pageLook = () => {
        const pathname = window.location.pathname
        if (pathname === "/admin") {
            return (
                <div>
                    <Router>
                        <div>
                            <Route exact path={"/admin"}><AdminLogin/></Route>
                            <Route exact path={"/service"}><AdminPage/></Route>
                        </div>
                    </Router>
                </div>
            );
        } else {
            return (

                <context.Provider value={this.state}>
                    <Router>
                        <Header/>
                        <div className={style.main}>
                            <Switch>
                                <Route exact path={"/"}> <Home/> </Route>
                                <Route exact path={"/dashboard"}>
                                    {this.state.loggedIn
                                        ? <Dashboard transactions={this.state.transactions}
                                                     accounts={this.state.accounts}/>
                                        : <Redirect to="/login"/>
                                    }
                                </Route>
                                <Route exact path={"/login"} component={Login}/>
                                <Route exact path={"/create_account"} component={CreateAccount}/>
                                <Route exact path={"/register"}> <SignUp/> </Route>
                                <Route exact path={"/transfer"}> <TransferToAccount/> </Route>
                                <Route exact path={"/move_money"}> <MoveMoney/> </Route>
                                <Route exact path={"/faq"}><FAQ/></Route>
                                <Route exact path={"/contactus"} component={ContactUs}/>
                                <Route exact path={"/signup"} component={SignUp}/>
                                <Route exact path={"/logout"}><Logout/></Route>
                                <Route exact path={"*"}><ErrorPage/></Route>
                            </Switch>
                        </div>
                    </Router>
                </context.Provider>
            );
        }
    }

    state = {
        resetState: () => this.resetState(),
        //resetState:()=>console.log("dfsingdsoi"),
        userName: null,
        setUsername: (usr) => this.setState({userName: usr}),
        firstName: null,
        setFirstName: (name) => this.setState({firstName: name}),
        lastName: null,
        setLastName: (name) => this.setState({lastName: name}),
        loggedIn: false,
        setLoggedIn: (bool) => this.setState({loggedIn: bool}),
        accounts: [],
        addAccount: (acc) => this.addAccount(acc),
        removeAccount: (accNumber) => this.removeAccount(accNumber),
        transactions: [],
        addTransaction: (trans) => this.addTransaction(trans),
        removeTransaction: (id) => this.removeTransaction(id),
        vendors: {
            "11111111": new Vendor("Netflix", vendorCategories.entertainment),
            "22222222": new Vendor("Spotify", vendorCategories.entertainment),
            "33333333": new Vendor("Puregym", vendorCategories.lifestyle),
            "44444444": new Vendor("McDonalds", vendorCategories.takeout),
            "55555555": new Vendor("Uber Eats", vendorCategories.takeout),
            "66666666": new Vendor("Asda", vendorCategories.supermarkets),
            "77777777": new Vendor("Aldi", vendorCategories.supermarkets),
            "88888888": new Vendor("Amazon", vendorCategories.shopping)
        }
    }

    removeAccount(accNumber) {
        for (var x = 0; x < this.state.accounts.length; x++) {
            if (this.state.accounts[x].accNumber == accNumber) {
                var accountsCopy = JSON.parse(JSON.stringify(this.state.accounts))
                accountsCopy.splice(x, 1)
                this.setState({accounts: accountsCopy})
            }
        }
    }

    addAccount(acc) {
        console.log("adding account", acc)
        var accountsCopy = JSON.parse(JSON.stringify(this.state.accounts))
        accountsCopy.push(acc)
        this.setState({accounts: accountsCopy})
    }

    removeTransaction(id) {
        for (var x = 0; x < this.state.transactions.length; x++) {
            if (this.state.transactions[x].id == id) {
                var transactionsCopy = JSON.parse(JSON.stringify(this.state.transactions))
                transactionsCopy.splice(x, 1)
                this.setState({transactions: transactionsCopy})
            }
        }
    }

    addTransaction(trans) {
        //console.log("adding transaction",trans)
        var transactionsCopy = JSON.parse(JSON.stringify(this.state.transactions))
        transactionsCopy.push(trans)
        this.setState({transactions: transactionsCopy})
        console.log("transactions", this.state.transactions)
    }

    resetState() {
        console.log("resetting")
        this.setState({firstName: null})
        this.setState({lastName: null})
        this.setState({loggedIn: false})
        this.setState({accounts: []})
        this.setState({transactions: []})
    }

    render() {
        return this.pageLook();
    }
}
