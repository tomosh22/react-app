import React from "react";
import {context, Account} from "./App"

export class CreateAccount extends React.Component {

    state = {
        type: "current",
        currency: "£",
        balance: 0.00,
        //Set default values as will not update if user does not select a different option to the default option
        accountName: "",
        accountNameError: "",
        accountNumber: "",
    }

    handleChange = event => {
        // stores what user types in form in React
        this.setState({[event.target.name]: event.target.value})
    }

    async handleSubmit(event, userName) {
        // validates the user's input
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

        await fetch("http://localhost:3000/insertAccount/" + this.state.accountName + "/" + this.state.type + "/" + this.state.balance + "/" + this.state.currency + "/" + userName + "/" + this.state.accountNumber,
            {
                method: "POST"
            })
        this.props.history.push("/dashboard");
    }

    validate = event => {
        // validates the user's input
        let accountNameError = "";
        if (!this.state.accountName) {
            accountNameError = "Account name is required"
        }
        this.setState({accountNameError})
    }

    render() {
        return (
            <context.Consumer>{({userName}) => (
                <div>
                    <h1>Create Account</h1>
                    <form action="CreateAccount" id="createAccountForm" method="post"
                          onSubmit={e => this.handleSubmit(e, userName)}>
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

                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            </context.Consumer>
        );
    }
}