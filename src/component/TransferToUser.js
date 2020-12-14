import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export class TransferToUser extends React.Component {
    state ={
        accFrom: "",
        accName: "",
        accNumber: "",
        sortCode: "",
        currency: "£",
        //Set default value as will not update if user does not select a different option to the default option
        amount: "",
        reference: "",
        accFromError: "",
        accNameError: "",
        accNumberError: "",
        sortCodeError: "",
        amountError: "",
        referenceError: "",

        userAccounts: ["My Saving Account", "My Current Account"]
        //INSERT CODE FOR MAKING ARRAY OF USER ACCOUNTS NAMES RATHER THAN DEFAULT ARRAY
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
        let accFromError="";
        let accNameError ="";
        let accNumberError ="";
        let sortCodeError ="";
        let amountError = "";
        let referenceError = "";
        const amountRegex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
        const sortCodeRegex = new RegExp("^[0-9]{2}-[0-9]{2}-[0-9]{2}")

        if (!this.state.accFrom){
            accFromError = "Account name is required"
        }
        if (!this.state.accName){
            accNameError = "Account name is required"
        }
        if (!this.state.accNumber){
            accNumberError = "Account number is required"
        }

        if (!this.state.sortCode){
            sortCodeError = "Sort code is required"
        }else if(!(sortCodeRegex.test(this.state.sortCode))) {
            sortCodeError = "Sort code must be in format xx-xx-xx"
        }

        if (!this.state.amount){
            amountError = "Amount is required"
        }else if(!(amountRegex.test(this.state.amount))) {
            amountError = "Amount must be valid"
        }
        if (!this.state.reference){
            referenceError = "Reference is required"
        }

        this.setState({accFromError,accNameError, accNumberError,sortCodeError, amountError, referenceError})
    }


    render() {
        return (
            <div>
                <br/>
                <form action="TransferMoneyToUser" id="TransferMoneyToUserForm" method="post" onSubmit={this.handleSubmit}>

                    <label htmlFor="accountFrom">From:</label><br/>
                    <select id="accFrom" name="accFrom"  value={this.state.accFrom} onChange={this.handleChange}>
                        <option value="" disabled selected>Choose an account</option>
                        {this.state.userAccounts.map(list =>(
                            <option key={list} value={list}>
                                {list}
                            </option>
                        )) }
                    </select>
                    <div style={{color:"red"}}>{this.state.accFromError}</div><br/>

                    <div>To:</div>
                    <label htmlFor="accName">Name on Account</label><br/>
                    <input id="accName" name="accName" value={this.state.accName} onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.accNameError}</div><br/>

                    <label htmlFor="accNumber">Account Number</label><br/>
                    <input type="number" id="accNumber" name="accNumber" value={this.state.accNumber}
                           onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.accNumberError}</div><br/>

                    <label htmlFor="sortCode">Sort Code</label><br/>
                    <input id="sortCode" name="sortCode" value={this.state.sortCode}
                           onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.sortCodeError}</div><br/><br/>

                    <label htmlFor="amount">Amount</label><br/>
                    <select id="currency" name="currency" value={this.state.currency} onChange={this.handleChange}>
                        <option value="£">£</option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                    </select>
                    <input type="number" id="amount" name="amount" step=".01" value={this.state.amount}
                           onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.amountError}</div><br/>

                    <label htmlFor="reference">Reference</label><br/>
                    <input id="reference" name="reference" value={this.state.reference}
                           onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.referenceError}</div><br/>

                    <button type="submit">Send Money</button>

                </form>
            </div>
        )
    };
}
