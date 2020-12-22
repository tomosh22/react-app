import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export class TransferToAccount extends React.Component {

    state = {
        accountFrom: "",
        accountTo: "",
        currency: "£",
        //Set default value as will not update if user does not select a different option to the default option
        amount: "",
        password:"",
        accountFromError: "",
        accountToError: "",
        amountError: "",
        passwordError: "",

        userAccounts: ["My Saving Account", "My Current Account"],
        updatedUserAccounts: ["My Saving Account", "My Current Account"],
        //INSERT CODE FOR MAKING ARRAY OF USER ACCOUNTS NAMES RATHER THAN DEFAULT ARRAY
        //updatedUserAccounts is used to select account to

        display: 0,
        // determines the display of the webpage

        balance: 1000.00,
        //example of what balance should look like

        passwordAttempts: 3,
        //number of attempts for the user to enter password
        userPassword: "",
        salt: "",
        //user's hashed password and salt from database
    };


    handleChange = event => {
        // stores what user types in form in React
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.display==0){this.validate()}
        else if (this.state.display==3){this.validatePassword()}
        else{this.validateAccountTo()}
    }

    validate = event => {
        // validates the user's input
        let accountFromError = "";
        let accountToError = "";
        let amountError = "";
        let display = 0;
        const amountRegex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");

        if (!this.state.accountTo) {
            accountToError = "Account name is required"
        }
        if (!this.state.accountFrom) {
            accountFromError = "Account name is required"
        }
        if (!this.state.amount) {
            amountError = "Amount is required"
        } else if (!(amountRegex.test(this.state.amount))) {
            amountError = "Amount must be valid"
        }

        if (!accountToError && !accountFromError && !amountError) {
            display = 1;
        }

        this.setState({accountFromError, accountToError, amountError, display})
    }

    validateAccountTo = event =>{
        let accountToError = "";
        let display = 2;
        if (!this.state.accountTo) {
            accountToError = "Account name is required"
        }
        if (!accountToError){
            display=0;
        }
        this.setState({accountToError, display})
    }

    validatePassword = event =>{
        // validates user's password to authorise payment
        let passwordError = "";
        let userPassword = "password";
        //change userPassword here!!
        let password = this.state.password;
        let passwordAttempts = this.state.passwordAttempts;

        //this.GetPassword();
        //var hash = crypto.createHmac("sha512", this.state.salt);
        //hash.update(password + this.state.salt);
        //hash = hash.digest("hex");
        //password = hash;
        //userPassword = this.state.userPassword;


        if (!this.state.password){
            passwordError = "Password is required"
        } else{
            if (passwordAttempts>0){
                if (password != userPassword){
                    -- passwordAttempts
                    passwordError = passwordAttempts + " login attempts remaining"
                }
                else{
                    //this.ProcessPayment()
                    //uncomment when connected to database
                }
            }
            else{passwordError= "0 login attempts remaining"}
        }
        this.setState({passwordError, passwordAttempts})
    }


    ChangeDetails = event => {
        let display = 0;
        this.setState({display})
    }

    authorisePayment = event =>{
        let display = 3;
        this.setState({display})
    }

    SelectAccountTo = event =>{
        let display =2;
        let updatedUserAccounts=[]
        let i;
        //this.GetBalance()
        //uncomment these when connected to database
        for (i = 0; i < (this.state.userAccounts).length; i++){
            // prevents the user sending a transaction to the same account
            if (this.state.userAccounts[i]!=this.state.accountFrom){
                updatedUserAccounts.push(this.state.userAccounts[i])
            }
        }

        this.setState({display, updatedUserAccounts})
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

    ProcessPayment = async event =>{
        if (this.state.balance>this.state.amount){
            //PROCESSES TRANSACTION
            await fetch("http://localhost:3000/insertTransaction/",
                + this.state.accountFrom + "/" + this.state.accountTo + "/" +this.state.currency + "/" +
                this.state.amount,
                {
                    method:"POST"
                })
        }
    }

    GetBalance = event =>{
        //CHECKS USER HAS ENOUGH MONEY IN THAT ACCOUNT TO PAY
        let balance=0;
        fetch("http://localhost:3000/getUserBalance/", + this.state.accountFrom,
            {
                method:"GET"
            }).then(response => response.json()).then(data => balance = data.balance)
        this.setState({balance})
    }

    GetPassword = event =>{
        // GETS THE USER'S HASHED PASSWORD AND SALT
        let userPassword;
        let salt;
        fetch("http://localhost:3000/getUserBalance/", + this.props.state.username,
            {
                method:"GET"
            }).then(response => response.json()).then(data => (userPassword = data.hash, salt = data.salt))
        this.setState({userPassword, salt})
    }

    render() {
        //this.GetUserAccounts();
        //uncomment these when connected to database
        switch (this.state.display) {
            case 0:
                return (
                    <div>
                        <br></br>

                        <form action="TransferMoneyToAccount" id="TransferMoneyToAccountForm" method="post"
                              onSubmit={this.handleSubmit}>

                            <label htmlFor="accountFrom">From:</label><br></br>
                            <select id="accountFrom" name="accountFrom" value={this.state.accountFrom}
                                    onChange={this.handleChange}>
                                <option value="" disabled selected>Choose an account</option>
                                {this.state.userAccounts.map(list => (
                                    <option key={list} value={list}>
                                        {list}
                                    </option>
                                ))}
                            </select>
                            <div style={{color: "red"}}>{this.state.accountFromError}</div>
                            <br></br>

                            <label htmlFor="accountTo">To:</label><br></br>
                            <div><b>{this.state.accountTo}</b></div>
                            <button type="button" onClick={this.SelectAccountTo} disabled={!this.state.accountFrom}>Choose an account</button>
                            <div style={{color: "red"}}>{this.state.accountToError}</div>
                            <br></br>

                            <label htmlFor="amount">Amount</label><br></br>
                            <select id="currency" name="currency" value={this.state.currency}
                                    onChange={this.handleChange}
                                    disabled={!this.state.accountTo}>
                                <option value="£">£</option>
                                <option value="$">$</option>
                                <option value="€">€</option>
                            </select>
                            <input type="number" id="amount" name="amount" step=".01" value={this.state.amount}
                                   onChange={this.handleChange} disabled={!this.state.accountTo} min={"0.00"}
                                   max={this.state.balance}></input>
                            <div style={{color: "red"}}>{this.state.amountError}</div>
                            <br></br>

                            <button type="submit">Send Money</button>
                        </form>
                    </div>
                )
                break;

            case 1:
                return (
                    <div>
                        <h1>Review Details</h1>
                        <p>From: <b>{this.state.accountFrom}</b></p>
                        <p>To: <b>{this.state.accountTo}</b></p>
                        <p>Amount: <b>{this.state.currency}{this.state.amount}</b></p>
                        <button type="button" onClick={this.authorisePayment}>Confirm details</button>
                        <br/>
                        <button type="button" onClick={this.ChangeDetails}>Change details</button>
                    </div>
                )
                break;

            case 2:
                return(
                    <div>
                        <br></br>
                        <form action="SelectAccount" id="SelectAccount" method="post" onSubmit={this.handleSubmit}>
                            <select id="accountTo" name="accountTo" value={this.state.accountTo}
                                    onChange={this.handleChange}>
                                <option value="" disabled selected>Choose an account</option>
                                {this.state.updatedUserAccounts.map(list => (
                                    <option key={list} value={list}>
                                        {list}
                                    </option>
                                ))}
                            </select>
                            <div style={{color: "red"}}>{this.state.accountToError}</div>
                            <br></br>
                            <button type="button" onClick={this.ChangeDetails}>Back</button>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )
                break;

            case 3:
                //AUTHORISE PAYMENT BY ENTERING PASSWORD
                return(
                    <div>
                        <br/>
                        <form action="AuthorisePayment" id="AuthorisePayment" method="post" onSubmit={this.handleSubmit}>
                            <label htmlFor="password">Enter Password</label><br/>
                            <input type="password" id="password" name="password" value={this.state.password}
                                   onChange={this.handleChange} disabled={this.state.passwordAttempts==0}/>
                            <div style={{color:"red"}}>{this.state.passwordError}</div><br/>
                            <button type="submit">Authorise Payment</button>
                        </form>
                    </div>
                )
                break;
        }
    }
}