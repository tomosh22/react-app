import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {TransferToUser} from "./TransferToUser";
import {TransferToAccount} from "./TransferToAccount";
import styled from "styled-components";

const Button = styled.button`
    background-color: #78bc55;
    border: none;
    color: white;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 6px;
`

export class MoveMoney extends React.Component{

    render() {
        return (
            <div>
                <h1>Move Money</h1>
                <Router>
                    <Link to={"/transfer_to_user"}><Button>To someone else</Button></Link>
                    <Link to={"/transfer_account"}><Button>To one of your accounts</Button></Link>
                    <Route path={"/transfer_to_user"}> <TransferToUser /> </Route>
                    <Route path={"/transfer_account"}> <TransferToAccount /> </Route>
                </Router>
            </div>

        );
    }
}