import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {TransferToUser} from "./TransferToUser";
import {TransferToAccount} from "./TransferToAccount";
import style from "../assets/css/homePageStyle.module.css";

export class MoveMoney extends React.Component {

    render() {
        return (
            <div>
                <h1>Move Money</h1>
                <Router>
                    <Link to={"/transfer_to_user"}>
                        <button className={style.navLink}>To someone else</button>
                    </Link>
                    <Link to={"/transfer_account"}>
                        <button className={style.navLink}>To one of your accounts</button>
                    </Link>
                    <Route path={"/transfer_to_user"}> <TransferToUser/> </Route>
                    <Route path={"/transfer_account"}> <TransferToAccount/> </Route>
                </Router>
            </div>

        );
    }
}
