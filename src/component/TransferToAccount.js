import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export class TransferToAccount extends React.Component {

    state ={
        accountFrom: "",
        accountTo: "",
        currency: "£",
        //Set default value as will not update if user does not select a different option to the default option
        amount: "",
        accountFromError: "",
        accountToError: "",
        amountError: "",

        userAccounts: ["My Saving Account", "My Current Account"],
        //INSERT CODE FOR MAKING ARRAY OF USER ACCOUNTS NAMES RATHER THAN DEFAULT ARRAY

        valid: false
        //States whether the user's input is valid or not
    };


    handleChange = event => {
        // stores what user types in form in React
        this.setState ({[event.target.name] : event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.validate();
    }

    validate = event =>{
        // validates the user's input
        let accountFromError ="";
        let accountToError="";
        let amountError = "";
        let valid = false;
        const amountRegex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");

        if (!this.state.accountTo){
            accountToError = "Account name is required"
        }
        if (!this.state.accountFrom){
            accountFromError = "Account name is required"
        }
        if (!this.state.amount){
            amountError = "Amount is required"
        }else if(!(amountRegex.test(this.state.amount))) {
            amountError = "Amount must be valid"
        }

        if (!accountToError && !accountFromError && !amountError){
            valid = true;
        }

        this.setState({accountFromError, accountToError, amountError, valid})
    }

    ChangeDetails = event =>{
        let valid = false;
        this.setState({valid})
    }

    render() {
        if (!this.state.valid) {return (
            <div>
                <br></br>

                <form action="TransferMoneyToAccount" id="TransferMoneyToAccountForm" method="post" onSubmit={this.handleSubmit}>

                    <label htmlFor="accountFrom">From:</label><br></br>
                    <select id="accountFrom" name="accountFrom"  value={this.state.accountFrom}
                            onChange={this.handleChange}>
                        <option value="" disabled selected>Choose an account</option>
                        {this.state.userAccounts.map(list =>(
                            <option key={list} value={list}>
                                {list}
                            </option>
                        )) }
                    </select>
                    <div style={{color:"red"}}>{this.state.accountFromError}</div><br></br>

                    <label htmlFor="accountTo">To:</label><br></br>
                    <select id="accountTo" name="accountTo"  value={this.state.accountTo}
                            onChange={this.handleChange}>
                        <option value="" disabled selected>Choose an account</option>
                        {this.state.userAccounts.map(list =>(
                            <option key={list} value={list}>
                                {list}
                            </option>
                        )) }
                    </select>
                    <div style={{color:"red"}}>{this.state.accountToError}</div><br></br>

                    <label htmlFor="amount">Amount</label><br></br>
                    <select id="currency" name="currency" value={this.state.currency} onChange={this.handleChange}>
                        <option value="£">£</option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                    </select>
                    <input type="number" id="amount" name="amount" step=".01" value={this.state.amount}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.amountError}</div><br></br>

                    <button type="submit" >Send Money</button>
                </form>
            </div>
        )}
        else{return(
            <div>
                <h1>Review Details</h1>
                <p>From: <b>{this.state.accountFrom}</b></p>
                <p>To: <b>{this.state.accountTo}</b></p>
                <p>Amount: <b>{this.props.currency}{this.state.amount}</b></p>
                <button type="submit">Authorise payment</button><br />
                <button type="button" onClick={this.ChangeDetails}>Change details</button>
            </div>
        )}
    }
}