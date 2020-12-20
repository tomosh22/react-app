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
        chosenPayee:"",
        accFromError: "",
        accToError:"",
        accNameError: "",
        accNumberError: "",
        sortCodeError: "",
        amountError: "",
        referenceError: "",

        userAccounts: ["Saving account", "Current account"],
        //example of what user accounts should look like

        recentPayees: [["Katie","1234567","11-11-11"], ["Sam","2345678","22-22-22"], ["James","3456789","33-33-33"],
            ["Sophie","4567890", "44-44-44"], ["Lucy","5678901","55-55-55"]],
        //example of what recent Payees should look like

        balance: 1000.00,
        //example of what balance should look like

        display: 0,
        // determines the display of the webpage
        // 0: main transaction page; 1: review details page; 2: new payee page; 3: recent payee page;

    };

    handleChange = event => {
        // stores what user types in form in React
        this.setState ({[event.target.name] : event.target.value})

    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.display==0){this.validateTransaction()}
        else if (this.state.display==3){this.setPayeeDetails(); this.state.display = 0;} //this.GetBalance() uncomment this when connected to database
        else{this.validateNewPayee()}
    }

    setPayeeDetails = event => {
        if (this.state.chosenPayee){
            let details = (this.state.chosenPayee).split(",");
            let accName = details[0];
            let accNumber = details[1];
            let sortCode = details[2];
            let chosenPayee = "";
            this.setState({accName, accNumber,sortCode, chosenPayee})
        }
    }

    validateTransaction = event =>{
        // validates the user's input for transaction form
        let accFromError="";
        let accToError="";
        let amountError = "";
        let referenceError = "";
        let display = 0;
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
            display = 1;
        }

        this.setState({accFromError,accToError, amountError, referenceError, display})
    }

    validateNewPayee = event =>{
        // validates the user's input for new payee
        let accNameError ="";
        let accNumberError ="";
        let sortCodeError ="";
        let display = 2;

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
            display=0;
        }

        this.setState({accNameError, accNumberError,sortCodeError, display})
    }


    ChangeDetails = event =>{
        let display =0;
        this.setState({display})
    }

    SelectNewPayee =  event =>{
        let display = 2;
        this.setState({display})
    }

    SelectRecentPayee =  event =>{
        let display = 3;
        this.setState({display})
        //this.GetRecentPayees();
        //uncomment these when connected to database
    }


    GetUserAccounts = event =>{
        //CODE TO MAKE ARRAY OF USER ACCOUNTS NAMES RATHER THAN DEFAULT ARRAY
        let userAccounts = [];
        fetch("http://localhost:3000/getUserAccounts/", + this.props.state.username,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {if(data){ userAccounts = data.userAccounts}})
        this.setState({userAccounts})
    }

    GetRecentPayees = event =>{
        //CODE TO MAKE ARRAY OF USER RECENT PAYEES RATHER THAN DEFAULT ARRAY
        let recentPayees;
        fetch("http://localhost:3000/getAccountPayees/", + this.props.state.username,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {if(data){ recentPayees = data.recentPayees}})
            //recentPayees should be a 3d array [accName,accNumber,sortCode] of 5 most recent payees.
        this.setState({recentPayees})
    }


    ProcessPayment = async event =>{
        if (this.state.balance>this.state.amount){
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

    GetBalance = event =>{
        //CHECKS USER HAS ENOUGH MONEY IN THAT ACCOUNT TO PAY
        let balance=0;
        fetch("http://localhost:3000/getUserBalance/", + this.state.accFrom,
            {
                method:"GET"
            }).then(response => response.json()).then(data => balance = data.balance)
        this.setState({balance})
    }

    render() {
        //this.GetUserAccounts();
        //uncomment these when connected to database
        switch(this.state.display){
            case 0:
                return (
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
                        <button type="button" onClick={this.SelectNewPayee} disabled={!this.state.accFrom}>Add a new Payee</button>
                        <button type="button" onClick={this.SelectRecentPayee} disabled={!this.state.accFrom}>Select Recent Payee</button>
                        <div style={{color:"red"}}>{this.state.accToError}</div><br/>

                        <label htmlFor="amount">Amount</label><br/>
                        <select id="currency" name="currency" value={this.state.currency} onChange={this.handleChange}
                                disabled={!this.state.accName}>
                            <option value="£">£</option>
                            <option value="$">$</option>
                            <option value="€">€</option>
                        </select>
                        <input type="number" id="amount" name="amount" step=".01" value={this.state.amount}
                               onChange={this.handleChange} disabled={!this.state.accName} min={"0.00"} max={this.state.balance}/>
                        <div style={{color:"red"}}>{this.state.amountError}</div><br/>

                        <label htmlFor="reference">Reference</label><br/>
                        <input id="reference" name="reference" value={this.state.reference}
                               onChange={this.handleChange} disabled={!this.state.accName}/>
                        <div style={{color:"red"}}>{this.state.referenceError}</div><br/>

                        <button type="submit">Send Money</button>

                    </form>

                </div>
                )
                break;

            case 1:
                return(
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
                )
                break;

            case 2:
                return(
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
                        <button type="submit">Submit</button>
                        </form>
                    </div>
                )
                break;

            case 3:
                //SELECT A RECENT PAYEE PAGE
                return(
                    <div>
                        <br/>
                        <form action="SelectRecentPayee" id="SelectRecentPayee" method="post" onSubmit={this.handleSubmit}>
                        <select id="chosenPayee" name="chosenPayee"  value={this.state.chosenPayee} onChange={this.handleChange}
                                disabled={!this.state.accFrom}>
                            <option value="" disabled selected>Choose a recent payee</option>
                            {this.state.recentPayees.map(list =>(
                                <option key={list} value={list}>
                                    {list[0]}
                                </option>
                            )) }
                        </select><br/><br/>
                        <button type="submit">Submit</button>
                        </form>
                    </div>
                )
    };
}}
