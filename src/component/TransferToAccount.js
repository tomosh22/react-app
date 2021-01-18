import React from "react";
import GetDate from "./MoveMoneyFunctions";
import styled from "styled-components";
import Icon from '@mdi/react';
import { mdiCalendar, mdiTag,mdiAccountArrowRight, mdiAccountArrowLeft,} from '@mdi/js';

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
    accountTo: "",
    currency: "£",
    //Set default value as will not update if user does not select a different option to the default option
    amount: "",
    reference: "",
    password:"",
    dateToday:"",
    payLater: false,
    payToday: false,
    accountFromError: "",
    accountToError: "",
    amountError: "",
    referenceError: "",
    passwordError: "",
    dateError:"",

    userAccounts: ["11111111", "22222222"],
    updatedUserAccounts: [],
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

    tagCategories: ["Shopping","Groceries","Eating Out","Bills","Transport","Entertainment"],
    tag:"",
    tagError:"",
    addTag:"",
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
                this.setState({payToday:false})
            }else{
                this.setState({payLater:false});
                let date= GetDate();
                this.setState({date});
            }
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.display===0){this.validate()}
        else if (this.state.display===3){this.validatePassword()}
        else{this.validateAccountTo()}
    }

    addTagCategory = () =>{
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
            this.setState({tagCategories, addTag, tag});
        }
    }

    deleteTagCategory = () =>{
        //deletes tag from the tag list
        let tagCategories= this.state.tagCategories;
        let i;
        let found=false;
        for(i=0; i<tagCategories.length; i++){
            if(tagCategories[i]===this.state.deleteTag){
                tagCategories.splice(i, 1);
                found=true;
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
        if(!this.state.date){
            dateError = "Date to pay is required"
        }
        if (!this.state.reference){
            referenceError = "Reference is required"
        }else if ((this.state.reference).length>20){
            referenceError = "Reference must be less than 20 characters"
        }

        if(!this.state.tag || this.state.tag==="Add tag..." || this.state.tag==="Delete tag..."){
            tagError="Tag is required"
        }

        if (!accountToError && !accountFromError && !amountError && !dateError && !tagError && !referenceError) {
            display = 1;
        }

        this.setState({accountFromError, accountToError, amountError, dateError, tagError, referenceError, display})
    }

    validateAccountTo = () =>{
        //validates the account to send to
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

    async validatePassword (){
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
                    this.ProcessPayment();
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
        this.setState({display})
    }

    authorisePayment = () =>{
        //displays authorise payment form
        let display = 3;
        this.setState({display})
    }

    resetState = () =>{
        //resets all details to their initial state
        this.setState(initialState);
    }

     SelectAccountTo = ()=>{
        //remove accountFrom from the list of accounts that can be sent to
        let display =2;
        let updatedUserAccounts=[]
        let i;
        this.GetBalance();
        //uncomment these when connected to database

        for (i = 0; i < (this.state.userAccounts).length; i++){
            // prevents the user sending a transaction to the same account
            if (this.state.userAccounts[i]!==this.state.accountFrom){
                updatedUserAccounts.push(this.state.userAccounts[i])
            }
        }

        this.setState({display, updatedUserAccounts})
    }


    //DATABASE FUNCTIONS


    async GetUserAccounts (){
        //CODE TO MAKE ARRAY OF USER ACCOUNTS NAMES RATHER THAN DEFAULT ARRAY
        let userAccounts = [];
        await fetch("http://localhost:3000/getUserAccounts/" + this.props.state.username,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {if(data[0]){ userAccounts = data[0].userAccounts}})
        this.setState({userAccounts})
    }

    async ProcessPayment (){
        if (this.state.balance>this.state.amount){
            //PROCESSES TRANSACTION
            await fetch("http://localhost:3002/insertTransaction/"
                + this.state.accountFrom + "/" + this.state.accountTo + "/" +this.state.currency + "/" +
                this.state.amount + "/" + this.state.reference+ "/" + this.state.tag + "/"  + this.state.date,
                {
                    method:"POST"
                })
        }
    }

    async GetBalance (){
        //CHECKS USER HAS ENOUGH MONEY IN THAT ACCOUNT TO PAY
        let balance=0;
        await fetch("http://localhost:3002/getUserBalance/" + this.state.accountFrom,
            {
                method:"GET"
            }).then(response => response.json()).then(data => balance = data[0].Balance)
        console.log(balance);
        this.setState({balance})
    }

    async GetPassword (){
        // GETS THE USER'S HASHED PASSWORD AND SALT
        let userPassword;
        let salt;
        await fetch("http://localhost:3000/selectHashAndSalt/" + this.props.state.username,
            {
                method:"GET"
            }).then(response => response.json()).then(data => (userPassword = data[0].hash, salt = data[0].salt))
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

                            <Icon path={mdiAccountArrowRight} title={"accountFrom"} size={0.75} />
                            <label htmlFor="accountFrom">From</label><br></br>
                            <div><b>{this.state.accountFrom}</b></div>
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

                            <Icon path={mdiAccountArrowLeft} title={"accountTo"} size={0.75} />
                            <label htmlFor="accountTo">To</label><br></br>
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
                            <button type={"button"} hidden={!(this.state.tag==="Add tag...")} onClick={this.addTagCategory}>Add</button>
                            <input id="deleteTag" name="deleteTag" value={this.state.deleteTag} onChange={this.handleChange}
                                   hidden={!(this.state.tag==="Delete tag...")} placeholder={"Tag name"}/>
                            <button type={"button"} hidden={!(this.state.tag==="Delete tag...")} onClick={this.deleteTagCategory}>Delete</button><br/>
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

                            <Button type="submit">Send Money</Button>
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
                        <p>Reference: <b>{this.state.reference}</b></p>
                        <p>Category: <b>{this.state.tag}</b></p>
                        <p>Date: <b>{this.state.date}</b></p>
                        <Button type="button" onClick={this.authorisePayment}>Confirm details</Button>
                        <br/>
                        <Button type="button" onClick={this.ChangeDetails}>Change details</Button>
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
        }
    }
}