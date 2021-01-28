import React from "react";
import {Account, context} from "./App";
import styled from "styled-components";

/*
Styling for the submit button of the form using styled-components.
*/
const Button = styled.button`
    background-color: #78bc55;
    border: none;
    color: white;
    padding: 4px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 6px;
`

/*
Created by Joel Tierney
React Component to allow user to create an account.
*/
export class CreateAccount extends React.Component {
    /*
    Stores default values and gives the user a default balance of 1000.
    */
    state = {
        type: "current",
        currency: "£",
        balance: 1000,
        accountName: "",
        accountNameError: "",
        accountNumber: "",
    }

    /*
    Stores what the user inputs into the form, within React.
    */
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    /*
    Checks the user has entered an account name, checks this account name has not
    already been created by the same user within the database, and outputs an alert
    error if the account name already exists from that specific user.
    */
    async handleSubmit(event, userName, addAccount) {
        event.preventDefault();
        this.validate();
        if (
            this.state.accountNameError === ""
        ) {
            var abort = false;
            await fetch("http://localhost:3000/getAccountNames/" + userName + "/" + this.state.accountName, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                if (data[0]) {
                    alert("Account name already exists.");
                    abort = true
                }
            })
            if (abort) return;
        }

        /*
        Generates random 8 digit account number and checks against database to make sure
        it is not already stored in there.
        */
        let isUnique = false;
        while (isUnique === false) {
            this.state.accountNumber = Math.floor(10000000 + Math.random() * 90000000)
            await fetch("http://localhost:3000/getAccountNumbers/" + this.state.accountNumber, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                if (!data[0]) {
                    isUnique = true;
                }
            })
        }

        /*
        Inserts new account into the database using insertAccount in Express,
        uses addAccount to create a new account so that the dashboard immediately updates.
        Redirects user back to dashboard upon completion.
        */
        await fetch("http://localhost:3000/insertAccount/" + this.state.accountName + "/" + this.state.type + "/" + this.state.balance + "/" + this.state.currency + "/" + userName + "/" + this.state.accountNumber,
            {
                method: "POST"
            })
        addAccount(new Account(this.state.accountName, this.state.type, this.state.balance, this.state.currency, this.state.accountNumber))
        this.props.history.push("/dashboard");
    }

    /*
    If the user does not input an account name, outputs an error on screen.
    */
    validate = event => {
        let accountNameError = "";
        if (!this.state.accountName) {
            accountNameError = "Account name is required"
        }
        this.setState({accountNameError})
    }

    render() {
        return (
            /*
            Form which takes account type, currency and account name of the account the
            user wants to create. Passes all of this and the username they are currently
            logged into over to the handleSubmit function.
            */
            <context.Consumer>{({userName, addAccount}) => (
                <div>
                    <h1>Create Account</h1>
                    <form action="CreateAccount" id="createAccountForm" method="post"
                          onSubmit={e => this.handleSubmit(e, userName, addAccount)}>
                        <label htmlFor="type">Account Type:</label><br/>
                        <select id="type" name="type" value={this.state.type} onChange={this.handleChange}>
                            <option value="current">Current Account</option>
                            <option value="savings">Savings Account</option>
                        </select><br/><br/>

                        <label htmlFor="currency">Currency:</label><br/>
                        <select id="currency" name="currency" value={this.state.currency} onChange={this.handleChange}>
                            <option value="£">£</option>
                            <option value="$">$</option>
                            <option value="€">€</option>
                        </select><br/><br/>

                        <label htmlFor="accountName">Account Name:</label><br/>
                        <input type="text" id="accountName" name="accountName" onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.accountNameError}</div>
                        <br/>

                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            )}
            </context.Consumer>
        );
    }
}