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
        accToError:"",
        accNameError: "",
        accNumberError: "",
        sortCodeError: "",
        amountError: "",
        referenceError: "",

        userAccounts: ["Saving account", "Current account"],

        recentPayees: ["Katie", "Sam", "James", "Sophie", "Lucy"],

        valid: false,
        //States whether the user's input is valid or not
        NewPayee: false
        //States whether user is entering a new payee

    };

    handleChange = event => {
        // stores what user types in form in React
        this.setState ({[event.target.name] : event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.NewPayee){this.validateTransaction()}
        else{this.validateNewPayee()}
    }

    validateTransaction = event =>{
        // validates the user's input for transaction form
        let accFromError="";
        let accToError="";
        let amountError = "";
        let referenceError = "";
        let valid = false;
        const amountRegex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");

        if (!this.state.accFrom){
            accFromError = "Account name is required"
        }
        if (!this.state.accName || !this.state.accNumber || !this.state.sortCode){
            accToError = "Payee Details are required"
        }

        if (!this.state.amount){
            amountError = "Amount is required"
        }else if(!(amountRegex.test(this.state.amount))) {
            amountError = "Amount must be valid"
        }
        if (!this.state.reference){
            referenceError = "Reference is required"
        }

        if (!accFromError && !accToError && !amountError && !referenceError){
            valid = true;
        }

        this.setState({accFromError,accToError, amountError, referenceError, valid})
    }

    validateNewPayee = event =>{
        // validates the user's input for new payee
        let accNameError ="";
        let accNumberError ="";
        let sortCodeError ="";
        let NewPayee = true;

        const sortCodeRegex = new RegExp("^[0-9]{2}-[0-9]{2}-[0-9]{2}")

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


        if (!accNameError && !accNumberError && !sortCodeError ){
            NewPayee = false;
        }

        this.setState({accNameError, accNumberError,sortCodeError, NewPayee})
    }


    ChangeDetails = event =>{
        let valid = false;
        this.setState({valid})
    }

    AddNewPayee =  event =>{
        let NewPayee = true;
        this.setState({NewPayee})
    }


    GetUserAccounts = event =>{
        //CODE TO MAKE ARRAY OF USER ACCOUNTS NAMES RATHER THAN DEFAULT ARRAY

        fetch("http://localhost:3000/getUserAccounts/", + this.props.state.username,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {if(data){ this.state.userAccounts = data.userAccounts}})

    }

    GetRecentPayees = event =>{
        //CODE TO MAKE ARRAY OF USER RECENT PAYEES RATHER THAN DEFAULT ARRAY

        fetch("http://localhost:3000/getUserRecentPayees/", + this.props.state.username,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {if(data){ this.state.recentPayees = data.recentPayees}})

    }

    GetRecentPayeeDetails = async event =>{
        //CODE TO GET DETAILS OF RECENT PAYEE SELECTED

        await fetch("http://localhost:3000/getUserRecentPayeeDetails/",
            + this.props.state.username + "/" + this.state.accName,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {if(data){ this.state.accNumber = data.accNumber;
            this.state.sortCode=data.sortCode}})
    }



    ProcessPayment = async event =>{
        //CHECKS USER HAS ENOUGH MONEY IN THAT ACCOUNT TO PAY
        let balance=0;
        await fetch("http://localhost:3000/getUserBalance/", + this.state.accFrom,
            {
                method:"GET"
            }).then(response => response.json()).then(data => balance = data.balance)

        if (balance>this.state.amount){
            //PROCESSES TRANSACTION
            await fetch("http://localhost:3000/insertTransaction/",
                + this.state.accFrom + "/" + this.state.accName + "/" +
                this.state.accNumber + "/" + this.state.sortCode + "/" +this.state.currency + "/" + this.state.amount
                + "/" + this.state.reference,
                {
                    method:"POST"
                })
        }
    }

    render() {
        //this.GetRecentPayees();
        //this.GetUserAccounts();
        //uncomment these when connected to database
        if (!this.state.valid && !this.state.NewPayee) {return (
            //MAIN TRANSFER TO USER FORM PAGE
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
                    <div><b>{this.state.accName}</b> {this.state.accNumber} {this.state.sortCode}</div>
                    <select id="accName" name="accName"  value={this.state.accName} onChange={this.handleChange}>
                        <option value="" disabled selected>Choose a recent payee</option>
                        {this.state.recentPayees.map(list =>(
                            <option key={list} value={list}>
                                {list}
                            </option>
                        )) }
                    </select><br/>
                    <button type="button" onClick={this.AddNewPayee}>Add a new Payee</button>
                    <div style={{color:"red"}}>{this.state.accToError}</div><br/>

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
        )}
        else if (this.state.valid && !this.state.NewPayee){return(
            // REVIEW DETAILS PAGE
            <div>
                <h1>Review Details</h1>
                <p>From: <b>{this.state.accFrom}</b></p>
                <p>Payee: <b>{this.state.accName}</b></p>
                <p>Payee Details: <b>{this.state.sortCode}   {this.state.accNumber}</b></p>
                <p>Amount: <b>{this.state.currency}{this.state.amount}</b></p>
                <p>Reference: <b>{this.state.reference}</b></p>
                <button type="button" onClick={this.ProcessPayment}>Authorise payment</button><br />
                <button type="button" onClick={this.ChangeDetails}>Change details</button>
            </div>
        )}
        else{return(
            // ADD A NEW PAYEE PAGE
            <div>
                <br/>
                <form action="AddNewPayee" id="AddNewPayeeForm" method="post" onSubmit={this.handleSubmit}>
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
                <button type="submit">Add a new Payee</button>
                </form>
            </div>
        )}
    };
}
