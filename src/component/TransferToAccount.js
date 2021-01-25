import React from "react";
import {GetDate, GetDateAndMinutes, currencyConverter} from "./MoveMoneyFunctions";
import {AddTag, DeleteTag, ProcessPayment} from "./MoveMoneyDatabaseFunctions";
import {context} from "./App"
import styled from "styled-components";
import Icon from '@mdi/react';
import { mdiCalendar, mdiTag,mdiAccountArrowRight, mdiAccountArrowLeft,} from '@mdi/js';
const crypto = require("crypto");

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

const initialState = {
    accountFrom: "",
    accountFromName:"",
    accountTo: "",
    accountToName:"",
    currency: "£",
    //Set default value as will not update if user does not select a different option to the default option
    amount: "",
    reference: "",
    password:"",
    date:"",
    dateAndMinutes:"",
    dateHold:"",
    payLater: false,
    payToday: false,
    accountFromError: "",
    accountToError: "",
    amountError: "",
    referenceError: "",
    passwordError: "",
    dateError:"",

    TagReferenceError:"",
    reconfirm:0,

    userAccounts: [],
    updatedUserAccounts: [],
    //INSERT CODE FOR MAKING ARRAY OF USER ACCOUNTS NAMES RATHER THAN DEFAULT ARRAY
    //updatedUserAccounts is used to select account to

    display: 0,
    // determines the display of the webpage

    accountCurrency:"",
    convertedAmount:"",
    convert:false,
    balance: 0.00,
    //example of what balance should look like

    passwordAttempts: 3,
    //number of attempts for the user to enter password
    userPassword: "",
    salt: "",
    //user's hashed password and salt from database
    tagCategories: [],
    tagError:"",
    addTag:"",
    tag:"",
    deleteTag:"",
};

export class TransferToAccount extends React.Component {

    state=initialState;

    handleChange = event => {
        // stores what user types in form in React
        this.setState({[event.target.name]: event.target.value})
    }

    handleCheck = event =>{
        // stores what user types in form in React
        this.setState({[event.target.name]: event.target.checked})
        if (event.target.checked===true){
            if (event.target.name==="payLater"){
                let dateAndMinutes="";
                this.setState({payToday:false, dateAndMinutes})
            }else{
                this.setState({payLater:false});
                let dateAndMinutes= GetDateAndMinutes();
                let date = GetDate();
                let dateHold= date;
                this.setState({date, dateAndMinutes,dateHold});
            }
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.display===0){this.validate()}
        else if (this.state.display===3){this.validatePassword()}
        else if (this.state.display===5){this.validateAccountFrom()}
        else{this.validateAccountTo()}
    }

    addTagCategory = (event,userName) =>{
        //add new tag to the tag list
        let tagCategories= this.state.tagCategories;
        let i;
        let suitable=true;

        if (!(this.state.addTag)){
            let tagError="Please enter a tag name";
            this.setState({tagError});
            suitable=false;
        }
        if ((this.state.addTag).length>20){
            let tagError="Tag must be less than 20 characters";
            this.setState({tagError});
            suitable=false;
        }

        for(i=0; i<tagCategories.length; i++){
            if(tagCategories[i]===this.state.addTag){
                suitable=false;
                let tagError="Tag already exists";
                this.setState({tagError})
            }
        }
        if (suitable) {
            tagCategories.push(this.state.addTag);
            let addTag = "";
            let tag = this.state.addTag;
            AddTag(tag,userName);
            this.setState({tagCategories, addTag});
        }
    }

    deleteTagCategory = (event,userName) =>{
        //deletes tag from the tag list
        let tagCategories= this.state.tagCategories;
        let i;
        let found=false;
        for(i=0; i<tagCategories.length; i++){
            if(tagCategories[i]===this.state.deleteTag){
                tagCategories.splice(i, 1);
                found=true;
                DeleteTag(this.state.deleteTag,userName);
                let deleteTag="";
                let tag="";
                this.setState({tagCategories,tag, deleteTag})
            }
        }
        if(!found){
            let tagError="Tag does not exists";
            this.setState({tagError})
        }
    }

    validate = () => {
        // validates the user's input
        let accountFromError = "";
        let accountToError = "";
        let amountError = "";
        let dateError = "";
        let tagError="";
        let referenceError="";
        let TagReferenceError="";
        let display = 0;
        let reconfirm=this.state.reconfirm;
        let date=this.state.date;
        let dateHold=this.state.dateHold;
        let convertedAmount=0;
        let convert=false;

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
        } else if(this.state.amount>this.state.balance){
            amountError = "Amount must be less than your balance"
        }

        if(!this.state.date){
            dateError = "Date to pay is required"
        }
        if ((this.state.reference).length>20){
            referenceError = "Reference must be less than 20 characters"
        }

        if (!accountToError && !accountFromError && !amountError && !dateError && !tagError && !referenceError) {

            if (!this.state.reference && (!this.state.tag || this.state.tag==="Add tag..." || this.state.tag==="Delete tag...")){
                TagReferenceError="You have not entered a tag or reference. Would you like to send anyway?"
                reconfirm++;
            }
            else if (!this.state.reference) {
                TagReferenceError = "You have not entered a reference. Would you like to send anyway?"
                reconfirm++;
            }
            else if(!this.state.tag || this.state.tag==="Add tag..." || this.state.tag==="Delete tag..."){
                TagReferenceError="You have not entered a tag. Would you like to send anyway?"
                reconfirm++;
            }
            if (!TagReferenceError||reconfirm==2) {
                if (!this.state.dateAndMinutes) {
                    dateHold = date;
                    date = this.state.date + " 00:00:00";
                } else {
                    date = this.state.dateAndMinutes;
                }
                if (this.state.currency!==this.state.accountCurrency){
                    convert=true;
                }
                convertedAmount = currencyConverter(this.state.currency, this.state.accountCurrency, this.state.amount);
                display = 1;
                reconfirm=0;
                TagReferenceError="";
            }
        }

        this.setState({accountFromError, accountToError, amountError, dateError, tagError, referenceError,
            TagReferenceError, display,date,dateHold,reconfirm, convertedAmount,convert})
    }

    validateAccountTo = () =>{
        //validates the account to send to
        let accountToError = "";
        let details=(this.state.accountTo).split(",");
        let accountTo=details[0];
        let accountToName=details[1];
        let display = 2;
        if (!this.state.accountTo) {
            accountToError = "Account name is required"
        }
        if (!accountToError){
            display=0;
        }
        this.setState({accountTo, accountToName, accountToError, display})
    }

    validateAccountFrom = () =>{
        //validates the account to send from
        let display = 5;
        let details=(this.state.accountFrom).split(",");
        let accountFrom=details[0];
        let accountFromName=details[1];
        let accountFromError="";
        if (!this.state.accountFrom) {
            accountFromError = "Account name is required"
        }
        if (!accountFromError){
            display=0;
        }
        this.setState({accountFrom, accountFromName, accountFromError, display})
    }

    async validatePassword (){
        // validates user's password to authorise payment
        let passwordError = "";
        let password = this.state.password;
        let passwordAttempts = this.state.passwordAttempts;

        let userPassword= this.state.userPassword;
        var hash = crypto.createHmac("sha512", this.state.salt);
        hash.update(password + this.state.salt);
        hash = hash.digest("hex");
        password = hash;
        userPassword = this.state.userPassword;
        let display=3;


        if (!this.state.password){
            passwordError = "Password is required"
        } else{
            if (passwordAttempts>0){
                if (password !== userPassword){
                    -- passwordAttempts
                    passwordError = passwordAttempts + " login attempts remaining"
                }
                else{
                    ProcessPayment(this.state.balance,this.state.amount,this.state.accountFrom,this.state.accountTo,
                        this.state.reference,this.state.tag,this.state.date,this.state.userName,this.state.payToday);
                    display=4;

                }
            }
            else{passwordError= "0 login attempts remaining"}
        }
        this.setState({passwordError, passwordAttempts,display})
    }


    ChangeDetails = () =>{
        //displays main transaction form
        let display = 0;
        let date=this.state.dateHold;
        this.setState({display,date})
    }

    authorisePayment = (event,userName) =>{
        //displays authorise payment form
        let display = 3;
        let amount=this.state.amount;
        if (this.state.convert){
            amount=this.state.convertedAmount
        }
        this.GetPassword(event,userName);
        this.setState({display, amount})
    }

    resetState = () =>{
        //resets all details to their initial state
        this.setState(initialState);
    }

    SelectAccountTo = ()=>{
        //remove accountFrom from the list of accounts that can be sent to
        let display =2;
        let updatedUserAccounts=[];
        let i;
        this.GetBalance();

        for (i = 0; i < (this.state.userAccounts).length; i++){
            // prevents the user sending a transaction to the same account
            if (this.state.userAccounts[i][0]!==this.state.accountFrom){
                updatedUserAccounts.push(this.state.userAccounts[i])
            }
        }

        this.setState({display, updatedUserAccounts})
    }

    SelectAccountFrom=(event,userName)=>{
        //get the users accounts
        let display=5;
        this.GetUserAccounts(event,userName);
        this.GetTag(event,userName);
        this.setState({display})
    }


    //DATABASE FUNCTIONS


    async GetUserAccounts (event,userName){
        //USES userName
        //CODE TO MAKE ARRAY OF USER ACCOUNTS NAMES RATHER THAN DEFAULT ARRAY
        let userAccounts = [];
        let i;
        await fetch("http://localhost:3000/getUserAccounts/" + userName,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {for(i=0; i<data.length; i++){userAccounts.push([data[i].AccNumber,data[i].Name])}})
        console.log(userAccounts);
        this.setState({userAccounts})
    }


    async GetBalance (){
        //CHECKS USER HAS ENOUGH MONEY IN THAT ACCOUNT TO PAY
        let balance=0;
        let accountCurrency="";
        await fetch("http://localhost:3000/getUserBalance/" + this.state.accountFrom,
            {
                method:"GET"
            }).then(response => response.json()).then(data => (balance = data[0].Balance, accountCurrency = data[0].Currency))
        console.log(balance,accountCurrency);
        this.setState({balance, accountCurrency})
    }

    async GetPassword (event,userName){
        //USES userName
        // GETS THE USER'S HASHED PASSWORD AND SALT
        let userPassword;
        let salt;
        await fetch("http://localhost:3000/selectHashAndSalt/" + userName,
            {
                method:"GET"
            }).then(response => response.json()).then(data => (userPassword = data[0].Password, salt = data[0].Salt))
        console.log(userPassword);
        console.log(salt);
        this.setState({userPassword, salt})
    }

    async GetTag(event,userName){
        //USES userName
        let i;
        let tagCategories=this.state.tagCategories;
        tagCategories.splice(0, tagCategories.length);
        tagCategories=["Shopping","Groceries","Eating Out","Bills","Transport","Entertainment"];
        await fetch("http://localhost:3000/getTag/" + userName,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {for(i=0; i<data.length; i++){tagCategories.push(data[i].Tag)}})
        this.setState({tagCategories});
    }

    render() {
        switch (this.state.display) {
            case 0:
                //MAIN TRANSFER TO ACCOUNT FORM PAGE
                return (
                    <context.Consumer>{({userName}) => (
                    <div>
                        <br></br>
                        <form action="TransferMoneyToAccount" id="TransferMoneyToAccountForm" method="post"
                              onSubmit={this.handleSubmit}>

                            <Icon path={mdiAccountArrowRight} title={"accountFrom"} size={0.75} />
                            <label htmlFor="accountFrom">From</label><br></br>
                            <div><b>{this.state.accountFromName}  </b>{this.state.accountFrom}</div>
                            <button type="button" onClick={e => this.SelectAccountFrom(e,userName)}>Choose an account</button>
                            <div style={{color: "red"}}>{this.state.accountFromError}</div>
                            <br></br>

                            <Icon path={mdiAccountArrowLeft} title={"accountTo"} size={0.75} />
                            <label htmlFor="accountTo">To</label><br></br>
                            <div><b>{this.state.accountToName}   </b>{this.state.accountTo}</div>
                            <button type="button" onClick={() => this.SelectAccountTo()} disabled={!this.state.accountFrom}>Choose an account</button>
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
                            <div style={{color: "red"}}>{this.state.amountError}</div><br/>

                            <label htmlFor="reference">Reference</label><br/>
                            <input id="reference" name="reference" value={this.state.reference}
                                   onChange={this.handleChange} disabled={!this.state.accountTo}/>
                            <div style={{color:"red"}}>{this.state.referenceError}</div><br/>

                            <Icon path={mdiTag} title={"Tag"} size={0.6} />
                            <label htmlFor="tag">Payment Category </label><br/>
                            <select id="tag" name="tag"  value={this.state.tag} onChange={this.handleChange}
                                    disabled={!this.state.accountTo}>
                                <option value="" disabled selected>Choose an tag</option>
                                {this.state.tagCategories.map(list =>(
                                    <option key={list} value={list}>
                                        {list}
                                    </option>
                                )) }
                                <option value={"Add tag..."}>Add tag...</option>
                                <option value={"Delete tag..."}>Delete tag...</option>
                            </select><br/>
                            <input id="addTag" name="addTag" value={this.state.addTag} onChange={this.handleChange}
                                   hidden={!(this.state.tag==="Add tag...")} placeholder={"New tag name"}/>
                            <button type={"button"} hidden={!(this.state.tag==="Add tag...")} onClick={e => this.addTagCategory(e,userName)}>Add</button>
                            <input id="deleteTag" name="deleteTag" value={this.state.deleteTag} onChange={this.handleChange}
                                   hidden={!(this.state.tag==="Delete tag...")} placeholder={"Tag name"}/>
                            <button type={"button"} hidden={!(this.state.tag==="Delete tag...")} onClick={e => this.deleteTagCategory(e,userName)}>Delete</button><br/>
                            <div style={{color:"red"}}>{this.state.tagError}</div><br/>

                            <Icon path={mdiCalendar} title={"calendar"} size={0.6} />
                            <input type="checkbox" id="payToday" name="payToday" disabled={!this.state.accountTo}
                                   checked={this.state.payToday} onChange={this.handleCheck}/>
                            <label htmlFor="payToday">Pay Today</label><t/>
                            <input type="checkbox" id="payLater" name="payLater" disabled={!this.state.accountTo}
                                   checked={this.state.payLater} onChange={this.handleCheck}/>
                            <label htmlFor="payLater">Pay Later</label><br/>
                            <input type="date" id="date" name="date" disabled={!this.state.payLater}
                                   value={this.state.date} onChange={this.handleChange} min={GetDate()}/>
                            <div style={{color:"red"}}>{this.state.dateError}</div>
                            <br></br>
                            <div style={{color:"red"}}>{this.state.TagReferenceError}</div>
                            <Button type="submit">Send Money</Button>
                        </form>
                    </div>
                    )}
                    </context.Consumer>
                )
                break;

            case 1:
                // REVIEW DETAILS PAGE
                return (
                    <context.Consumer>{({userName}) => (
                    <div>
                        <h1>Review Details</h1>
                        <p>From: <b>{this.state.accountFromName}   </b>{this.state.accountFrom}</p>
                        <p>To: <b>{this.state.accountToName}   </b>{this.state.accountTo}</p>
                        <p hidden={!this.state.convert}>Amount: <b>{this.state.currency}{this.state.amount}→ {this.state.accountCurrency}{this.state.convertedAmount}</b></p>
                        <p hidden={this.state.convert}>Amount: <b>{this.state.currency}{this.state.amount}</b></p>
                        <p>Reference: <b>{this.state.reference}</b></p>
                        <p>Category: <b>{this.state.tag}</b></p>
                        <p>Date: <b>{this.state.date}</b></p><br/>
                        <p hidden={!this.state.convert}>Before confirming, please make sure you are happy with the exchange rate</p>
                        <Button type="button" onClick={e=> this.authorisePayment(e,userName)}>Confirm details</Button>
                        <br/>
                        <Button type="button" onClick={this.ChangeDetails}>Change details</Button>
                    </div>
                    )}
                    </context.Consumer>
                )
                break;

            case 2:
                //SELECT ACCOUNT TO
                return(
                    <div>
                        <br></br>
                        <form action="SelectAccount" id="SelectAccount" method="post" onSubmit={this.handleSubmit}>
                            <select id="accountTo" name="accountTo" value={this.state.accountTo}
                                    onChange={this.handleChange}>
                                <option value="" disabled selected>Choose an account</option>
                                {this.state.updatedUserAccounts.map(list => (
                                    <option key={list} value={list}>
                                        {list[1]}
                                    </option>
                                ))}
                            </select>
                            <div style={{color: "red"}}>{this.state.accountToError}</div>
                            <br></br>
                            <Button type="button" onClick={this.ChangeDetails}>Back</Button>
                            <Button type="submit">Submit</Button>
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
                                   onChange={this.handleChange} disabled={this.state.passwordAttempts===0}/>
                            <div style={{color:"red"}}>{this.state.passwordError}</div><br/>
                            <Button type="submit">Authorise Payment</Button>
                        </form>
                    </div>
                )
                break;

            case 4:
                //CONFIRMATION PAYMENT HAS GONE THROUGH
                return(
                    <div>
                        <br/>
                        <p>Payment sent successfully</p>
                        <Button type={"button"} onClick={this.resetState}>Close</Button>
                    </div>
                )
                break;

            case 5:
                //SELECT ACCOUNT FROM
                return(
                    <div>
                        <br></br>
                        <form action="SelectAccount" id="SelectAccount" method="post" onSubmit={this.handleSubmit}>
                            <select id="accountFrom" name="accountFrom" value={this.state.accountFrom}
                                    onChange={this.handleChange}>
                                <option value="" disabled selected>Choose an account</option>
                                {this.state.userAccounts.map(list => (
                                    <option key={list} value={list}>
                                        {list[1]}
                                    </option>
                                ))}
                            </select>
                            <div style={{color: "red"}}>{this.state.accountFromError}</div>
                            <br></br>
                            <Button type="button" onClick={this.ChangeDetails}>Back</Button>
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                )
                break;
        }
    }
}