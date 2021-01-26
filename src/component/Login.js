import React from "react";
import {Account, context,Transaction} from "./App";
const crypto = require("crypto");
const twofactor = require("node-2fa")

export class Login extends React.Component{

    state = {
        username: "",
        password: "",
        usernameError: "",
        passwordError: "",
        secret: "",
        secretError:""
    };
    handleChange = event => {
        // stores what user types in form in React
        this.setState ({[event.target.name] : event.target.value})
    }
    async handleSubmit(event,setUsername,setFirstName,setLastName,setLoggedIn,addAccount,addTransaction){
        event.preventDefault();
        await this.validate();
        if (this.state.usernameError || this.state.passwordError || this.state.secretError){
            return null
        }
        var username,hash,salt,firstname,secondname,email,secret
        await fetch("http://localhost:3000/selectHashAndSaltAndSecret/" + this.state.username, {
            method: "GET"
        }).then(response => response.json()).then(data => {hash = data[0].Password;salt = data[0].Salt;secret = data[0].Secret})
        console.log(hash);
        console.log(salt);
        var hashCheck = crypto.createHmac("sha512",salt)
        hashCheck.update(this.state.password + salt)
        hashCheck = hashCheck.digest("hex")

        const newToken = twofactor.generateToken(secret)
        //if password is correct
        //if(true){
        if(hash == hashCheck && twofactor.verifyToken(secret,this.state.secret)){
            await fetch("http://localhost:3000/selectLoginUser/" + this.state.username, {
                method: "GET"
            }).then(response => response.json()).then(data => {username=data[0].Username;salt=data[0].Salt;firstname=data[0].FirstName;secondname=data[0].SecondName;email=data[0].Email})
            await fetch("http://localhost:3000/getUserAccounts/" + this.state.username, {
                method: "GET"
            }).then(response => response.json()).then(data => {for(var x of data){addAccount(new Account(x.Name,x.Type,x.Balance,x.Currency,x.AccNumber))}})
            await fetch("http://localhost:3000/getUserTransactions/" + this.state.username, {
                method: "GET"
            }).then(response => response.json()).then(data => {console.log(data);for(var x of data){addTransaction(new Transaction(x.TransactionId,x.Amount,x.DateTime,x.NameTo,x.AccNumberTo,x.AccNumberFrom,x.Currency,x.Reference,x.Tag))}})
            //}).then(response => response.json()).then(data => console.log(data))
            setUsername(this.state.username);
            setFirstName(firstname);
            setLastName(secondname);
            setLoggedIn(true);
            this.props.history.push("/dashboard");
        }
        //if password is incorrect
        else{
            alert("Incorrect login, please try again")
        }

    }

    async validate(event){
        // validates the user's input
       let usernameError = "";
       let passwordError = "";
       let secretError = "";

        if (!this.state.username){
            usernameError = "Username is required"
        }
        if (!this.state.password){
            passwordError= "Password is required"
        }
        if (!this.state.secret){
            secretError = "Google Authenticator code is required"
        }

       this.setState({usernameError, passwordError, secretError})
    }

    render() {
        return (
            <context.Consumer>{({setUsername,setFirstName,setLastName,setLoggedIn,addAccount,addTransaction}) => (
                <div>
                    <h1>Log in</h1>
                    <form action="Login" id="LoginForm" method="post" onSubmit={e => this.handleSubmit(e,setUsername,setFirstName,setLastName,setLoggedIn,addAccount,addTransaction)}>

                        <label htmlFor="username">Username: </label><br/>
                        <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
                        <div style={{color:"red"}}>{this.state.usernameError}</div><br/>

                        <label htmlFor="password">Password: </label><br/>
                        <input type="password" id="password" name="password" value={this.state.password}
                               onChange={this.handleChange}/>
                        <div style={{color:"red"}}>{this.state.passwordError}</div><br/>

                        <label htmlFor="secret">Google Authenticator Code: </label><br/>
                        <input id="secret" name="secret" value={this.state.secret}
                               onChange={this.handleChange}/>
                        <div style={{color:"red"}}>{this.state.secretError}</div><br/>
                        <br/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            </context.Consumer>


        );
    }
}
