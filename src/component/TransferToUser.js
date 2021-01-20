import React from "react";
import styled from 'styled-components';
import {GetDate, GetDateAndMinutes} from "./MoveMoneyFunctions";
import { Checkbox } from 'pretty-checkbox-react';
import Icon from '@mdi/react';
import { mdiCalendar, mdiTag,mdiAccountArrowRight, mdiAccountArrowLeftOutline} from '@mdi/js';
import '@djthoms/pretty-checkbox';

const CirclePayeeButton = styled.button`
    background-color: #5FA9EF;
    border: none;
    padding: 15px;
    text-align: center;
    margin: 6px 4px;
    color: white;
    text-decoration: none;
    border-radius: 50%;
    font-size: 16px;
`
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


const initialState ={
    accFrom: "",
    accFromName:"",
    accName: "",
    accNumber: "",
    currency: "£",
    //Set default value as will not update if user does not select a different option to the default option
    amount: "",
    reference: "",
    date:"",
    dateAndMinutes: "",
    dateHold:"",
    payLater: false,
    payToday: false,
    chosenPayee:"",
    password:"",
    accFromError: "",
    accToError:"",
    accNameError: "",
    accNumberError: "",
    amountError: "",
    referenceError: "",
    passwordError:"",
    dateError:"",
    details:"",
    username: "bobg",

    userAccounts: [],
    //example of what user accounts should look like

    recentPayees: [["Katie","1234567"], ["Sam","2345678"], ["James","3456789"],
        ["Sophie","4567890"], ["Lucy","5678901"]],
    //example of what recent Payees should look like
    favourite: false,
    favouritePayees:[],

    tagCategories: ["Shopping","Groceries","Eating Out","Bills","Transport","Entertainment"],
    tag:"",
    tagError:"",
    addTag:"",
    deleteTag:"",

    balance: 0.00,
    //example of what balance should look like

    display: 0,
    // determines the display of the webpage
    // 0: main transaction page; 1: review details page; 2: new payee page; 3: recent payee page;

    passwordAttempts: 3,
    //number of attempts for the user to enter password
    userPassword: "",
    salt: "",
    //user's hashed password and salt from database

};


export class TransferToUser extends React.Component {

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
            }else if (event.target.name==="payToday"){
                this.setState({payLater:false});
                let dateAndMinutes= GetDateAndMinutes();
                let date=GetDate();
                let dateHold=date;
                this.setState({date, dateAndMinutes,dateHold});
            }
        }
    }

    handleDetails= event =>{
        //stores details of payees user mouse is hovering over
        this.setState({details: event.target.value})
    }

    resetDetails = () =>{
        this.setState({details: ""})
    }

     handleSubmit = (event) =>{
        event.preventDefault();
        if (this.state.display===0){this.validateTransaction()}
        else if (this.state.display===3){this.setPayeeDetails(); this.state.display = 0; this.GetBalance()}//uncomment this when connected to database
        else if (this.state.display===4){this.validatePassword();}
        else if (this.state.display===6){this.validateAccountFrom()}
        else{this.validateNewPayee()}
    }

    setPayeeDetails = () => {
        //put the payees details in the correct format
        if (this.state.chosenPayee){
            let details = (this.state.chosenPayee).split(",");
            let accName = details[0];
            let accNumber = details[1];
            let chosenPayee = "";
            this.setState({accName, accNumber, chosenPayee})
        }
    }

    validateAccountFrom = () =>{
        //validates the account to send from
        let details=(this.state.accFrom).split(",");
        let accFrom=details[0];
        let accFromName=details[1];
        this.setState({accFrom, accFromName});
        console.log((accFrom))
        let accFromError = "";
        let display = 5;
        if (!this.state.accFrom) {
            accFromError = "Account name is required"
        }
        if (!accFromError){
            display=0;
        }
        this.GetRecentPayees(accFrom)
        this.setState({accFromError, display})
    }

    addTagCategory = () =>{
        //add new tag to the tag list
        let tagCategories= this.state.tagCategories;
        let i;
        let suitable=true;
        if ((this.state.addTag).length>20){
            let tagError="Tag must be less than 20 characters";
            this.setState({tagError});
            suitable=false;
        }
        if (!(this.state.addTag)){
            let tagError="Please enter a tag name";
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

    validateTransaction = () =>{
        // validates the user's input for transaction form
        let accFromError="";
        let accToError="";
        let amountError = "";
        let referenceError = "";
        let dateError = "";
        let tagError="";
        let display = 0;
        let date= this.state.date;
        let dateHold= this.state.dateHold;
        const amountRegex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");

        if (!this.state.accFrom){
            accFromError = "Account name is required"
        }
        if (!this.state.accName || !this.state.accNumber){
            accToError = "Payee Details are required"
        }

        if (!this.state.amount){
            amountError = "Amount is required"
        }else if(!(amountRegex.test(this.state.amount))) {
            amountError = "Amount must be valid"
        }else if(this.state.amount>this.state.balance){
            amountError = "Amount must be less than your balance"
        }

        if (!this.state.reference){
            referenceError = "Reference is required"
        }else if ((this.state.reference).length>20){
            referenceError = "Reference must be less than 20 characters"
        }

        if(!this.state.date){
            dateError = "Date to pay is required"
        }

        if(!this.state.tag || this.state.tag==="Add tag..." || this.state.tag==="Delete tag..."){
            tagError="Tag is required"
        }

        if (!accFromError && !accToError && !amountError && !referenceError && !dateError && !tagError){
            if(!this.state.dateAndMinutes){
                dateHold=date;
                date=this.state.date + " 00:00:00";
            }
            else{
                date=this.state.dateAndMinutes;
            }
            display = 1;
        }

        this.setState({accFromError,accToError, amountError, referenceError, dateError, tagError, display,date,dateHold})
    }

    async validateNewPayee(){
        // validates the user's input for new payee
        let accNameError ="";
        let accNumberError ="";
        let display = 2;

        const sortCodeRegex = new RegExp("^[0-9]{2}-[0-9]{2}-[0-9]{2}")

        if (!this.state.accName){
            accNameError = "Account name is required"
        }
        if (!this.state.accNumber){
            accNumberError = "Account number is required"
        }


        if (!accNameError && !accNumberError){
            if (this.state.favourite){
                let favouritePayees= this.state.favouritePayees;
                let newFavourite= [this.state.accName,this.state.accNumber];
                let i;
                let found=false;
                for(i=0; i<favouritePayees.length; i++){
                    if(JSON.stringify(favouritePayees[i])=== JSON.stringify(newFavourite)){
                        found=true;
                    }
                }
                if (!found){
                    favouritePayees.push(newFavourite);
                    this.SetFavourite();
                    this.setState({favouritePayees})
                }
            }
            display=0;
        }

        this.setState({accNameError, accNumberError, display})
    }

    async validatePassword (){
        // validates user's password to authorise payment
        let passwordError = "";
        //change userPassword here!!
        let password = this.state.password;
        let passwordAttempts = this.state.passwordAttempts;
        let display = 4;

        let userPassword= this.state.userPassword;
        //var hash = crypto.createHmac("sha512", this.state.salt);
        //hash.update(password + this.state.salt);
        //hash = hash.digest("hex");
        //password = hash;
        //userPassword = this.state.userPassword;


        if (!this.state.password){
            passwordError = "Password is required"
        } else{
            if (passwordAttempts>0){
                if (password !== userPassword){
                    -- passwordAttempts;
                    passwordError = passwordAttempts + " login attempts remaining"
                }
                else{
                    this.ProcessPayment()
                    display = 5;
                }
            }
            else{passwordError= "0 login attempts remaining"}
        }
        this.setState({passwordError, passwordAttempts, display})
    }

    ChangeDetails = () =>{
        //displays main transaction form
        let display =0;
        let date=this.state.dateHold;
        this.setState({display,date})
    }

    SelectNewPayee = () =>{
        //displays add new payee form
        let display = 2;
        this.setState({display})
    }

    SelectRecentPayee = () =>{
        //displays select recent/favourite payee form
        let display = 3;
        this.setState({display});
    }

    SelectAccountFrom=()=>{
        //get the users accounts
        let display=6;
        this.GetUserAccounts()
        this.GetFavourite()
        this.setState({display})
    }

    authorisePayment = () =>{
        //displays authorise payment form
        let display = 4;
        this.GetPassword();
        this.setState({display})
    }

    resetState = () => {
        //resets all details to their initial state
        this.setState(initialState);
    }


    //DATABASE FUNCTIONS


    async GetUserAccounts () {
        //CODE TO MAKE ARRAY OF USER ACCOUNTS NAMES RATHER THAN DEFAULT ARRAY
        let userAccounts = [];
        let i;
        await fetch("http://localhost:3002/getUserAccounts/" + this.state.username,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {for(i=0; i<data.length; i++){userAccounts.push([data[i].AccNumber,data[i].Name])}})
        console.log(userAccounts)
        this.setState({userAccounts})
    }

    async GetRecentPayees (accFrom) {
        //CODE TO MAKE ARRAY OF USER RECENT PAYEES RATHER THAN DEFAULT ARRAY
        let recentPayees = [];
        let i=0;
        let j;
        let found= false;
        let numToDisplay=5;
        console.log(accFrom)
        await fetch("http://localhost:3002/getAccountPayees/" + accFrom,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {if (data.length<5){numToDisplay=data.length};
            let numOfPayees = data.length;
            while(numToDisplay>0 && numOfPayees>0){
                console.log("numPayees" + numOfPayees)
                console.log("numToDisplay" + numToDisplay)
                if(!(data[i].NameTo===this.state.username)){
                    //prevents the user appearing in the recent payees
                    for (j=0;j<recentPayees.length; j++){
                        //prevents the same payee appearing multiple times in recent payees
                        if (recentPayees[j][1]===data[i].AccNumberTo){
                            found=true;
                        }
                    }
                    if (found===false){
                        recentPayees.push([data[i].NameTo,data[i].AccNumberTo])
                        --numToDisplay}
                    }
                    i++
                    --numOfPayees
            }})
            //recentPayees should be a 2d array [accName,accNumber] of 5 most recent payees.
        console.log(recentPayees);
        this.setState({recentPayees})
    }


    async ProcessPayment (){
        if (this.state.balance>this.state.amount){
            //PROCESSES TRANSACTION
            await fetch("http://localhost:3002/insertTransaction/"
                + this.state.accFrom + "/" + this.state.accNumber + "/" + this.state.currency + "/" + this.state.amount
                + "/" + this.state.reference + "/" + this.state.tag + "/" + this.state.date + "/" + this.state.accName,
                {
                    method:"POST"
                })
            //ADD AMOUNT TO ACCOUNT TO
            await fetch("http://localhost:3002/updateAccountBalance/" + this.state.accNumber + "/" + this.state.amount,
                {
                    method:"POST"
                })
        }
    }

    async GetBalance (){
        //CHECKS USER HAS ENOUGH MONEY IN THAT ACCOUNT TO PAY
        let balance=0.00;
        await fetch("http://localhost:3002/getUserBalance/" + this.state.accFrom,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {balance = data[0].Balance})
        console.log(balance);
        this.setState({balance})
    }

    async GetPassword (){
        // GETS THE USER'S HASHED PASSWORD AND SALT
        let userPassword;
        let salt;
        await fetch("http://localhost:3002/selectHashAndSalt/" + this.state.username,
            {
                method:"GET"
            }).then(response => response.json()).then(data => (userPassword = data[0].Password, salt = data[0].Salt))
        console.log(userPassword);
        console.log(salt);
        this.setState({userPassword, salt})
    }

    async GetFavourite (){
        //GETS THE USER'S FAVOURITE PAYEES
        let favouritePayees=[];
        let i;
        await fetch("http://localhost:3002/getFavouritePayees/" + this.state.username,
            {
                method:"GET"
            }).then(response => response.json()).then(data => {for(i=0; i<data.length; i++){favouritePayees.push([data[i].Name, data[i].AccNumber])}})
        console.log(favouritePayees);
        this.setState({favouritePayees})
    }

    async SetFavourite (){
        // SETS THE USER'S FAVOURITE PAYEES
        await fetch("http://localhost:3002/setFavouritePayees/" + this.state.username + "/" + this.state.accName + "/" + this.state.accNumber,
            {
                method:"POST"
            })
    }


    render() {
        switch(this.state.display){
            case 0:
                return (
                //MAIN TRANSFER TO USER FORM PAGE
                <div>
                    <br/>
                    <form action="TransferMoneyToUser" id="TransferMoneyToUserForm" method="post" onSubmit={this.handleSubmit}>

                        <Icon path={mdiAccountArrowRight} title={"accountFrom"} size={0.75} />
                        <label htmlFor="accFrom">From</label><br/>
                        <div><b>{this.state.accFromName}  </b>{this.state.accFrom}</div>
                        <button type="button" onClick={this.SelectAccountFrom}>Choose an account</button>
                        <div style={{color:"red"}}>{this.state.accFromError}</div><br/>

                        <Icon path={mdiAccountArrowLeftOutline} title={"accountTo"} size={0.75} />
                        <label htmlFor={"accTo"}>To</label>
                        <div><b>{this.state.accName}</b> {this.state.accNumber}</div>
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
                               onChange={this.handleChange} disabled={!this.state.accName} min={"0.00"} max={this.state.balance} />
                        <div style={{color:"red"}}>{this.state.amountError}</div><br/>

                        <label htmlFor="reference">Reference</label><br/>
                        <input id="reference" name="reference" value={this.state.reference}
                               onChange={this.handleChange} disabled={!this.state.accName}/>
                        <div style={{color:"red"}}>{this.state.referenceError}</div><br/>

                        <Icon path={mdiTag} title={"tag"} size={0.6}/>
                        <label htmlFor="tag">Payment Category    </label><br/>
                        <select id="tag" name="tag"  value={this.state.tag} onChange={this.handleChange}
                                disabled={!this.state.accName}>
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

                        <Icon path={mdiCalendar} title={"calender"} size={0.6} />
                        <input type="checkbox" id="payToday" name="payToday" disabled={!this.state.accName}
                               checked={this.state.payToday} onChange={this.handleCheck}/>
                        <label htmlFor="payToday">Pay Today</label><t/>
                        <input type="checkbox" id="payLater" name="payLater" disabled={!this.state.accName}
                               checked={this.state.payLater} onChange={this.handleCheck}/>
                        <label htmlFor="payLater">Pay Later</label><br/>
                        <input type="date" id="date" name="date" disabled={!this.state.payLater}
                               value={this.state.date} onChange={this.handleChange} min={GetDate()}/>
                        <div style={{color:"red"}}>{this.state.dateError}</div>

                        <Button type="submit">Send Money</Button>

                    </form>

                </div>
                )
                break;

            case 1:
                return(
                // REVIEW DETAILS PAGE
                    <div>
                        <h1>Review Details</h1>
                        <p>From: <b>{this.state.accFromName}  </b>{this.state.accFrom}</p>
                        <p>Payee: <b>{this.state.accName}</b></p>
                        <p>Payee Details: <b>{this.state.accNumber}</b></p>
                        <p>Amount: <b>{this.state.currency}{this.state.amount}</b></p>
                        <p>Reference: <b>{this.state.reference}</b></p>
                        <p>Category: <b>{this.state.tag}</b></p>
                        <p>Date: <b>{this.state.date}</b></p>
                        <Button type="button" onClick={this.authorisePayment}>Confirm details</Button><br />
                        <Button type="button" onClick={this.ChangeDetails}>Change details</Button>
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
                        <>
                            <Checkbox animation="pulse" shape="round" id="favourite" name="favourite" checked={this.state.favourite} onChange={this.handleCheck}></Checkbox>
                        </>
                        <label htmlFor="favourite">Add payee to your favourite payees?</label>
                        <br/><br/>
                        <Button type="button" onClick={this.ChangeDetails}>Back</Button>
                        <Button type="submit">Submit</Button>
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
                            <label htmlFor="recentPayees" hidden={this.state.recentPayees.length===0}>Recent Payees:</label><br/>
                            {this.state.recentPayees.map(list =>(
                                <CirclePayeeButton name={"chosenPayee"} value={list} onClick={this.handleChange}
                                        onMouseOver={this.handleDetails} onMouseOut={this.resetDetails}>
                                    {list[0]}
                                </CirclePayeeButton>
                            )) }
                            <br/><br/>
                            <label htmlFor="favouritePayees" hidden={this.state.favouritePayees.length===0}>Favourite Payees:</label><br/>
                            {this.state.favouritePayees.map(list =>(
                                <CirclePayeeButton name={"chosenPayee"} value={list} onClick={this.handleChange}
                                        onMouseOver={this.handleDetails} onMouseOut={this.resetDetails}>
                                    {list[0]}
                                </CirclePayeeButton>
                            )) }
                            <p><b>{this.state.details}</b></p>
                            <br/>
                            <Button type="button" onClick={this.ChangeDetails}>Back</Button>
                        </form>
                    </div>
                )
                break;

            case 4:
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

            case 5:
                //CONFIRMATION PAYMENT HAS GONE THROUGH
                return(
                    <div>
                        <br/>
                        <p>Payment sent successfully</p>
                        <Button type={"button"} onClick={this.resetState}>Close</Button>
                    </div>
                )
            break;

            case 6:
                //SELECT ACCOUNT FROM PAGE
                return(
                    <div>
                        <br></br>
                        <form action="SelectAccount" id="SelectAccount" method="post" onSubmit={this.handleSubmit}>
                            <select id="accFrom" name="accFrom" value={this.state.accFrom}
                                    onChange={this.handleChange}>
                                <option value="" disabled selected>Choose an account</option>
                                {this.state.userAccounts.map(list => (
                                    <option key={list} value={list}>
                                        {list[1]}
                                    </option>
                                ))}
                            </select>
                            <div style={{color: "red"}}>{this.state.accFromError}</div>
                            <br></br>
                            <Button type="button" onClick={this.ChangeDetails}>Back</Button>
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                )
                break;

    };
}}
