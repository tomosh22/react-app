import React from "react";
import {Account, context} from "./App";
const crypto = require("crypto");

export class Login extends React.Component{

    state = {
        username: "",
        password: "",
        usernameError: "",
        passwordError: ""
    };
    handleChange = event => {
        // stores what user types in form in React
        this.setState ({[event.target.name] : event.target.value})
        console.log("username " + this.state.username)
    }
    async handleSubmit(event,setUsername,setFirstName,setLastName,setLoggedIn,addAccount){
        event.preventDefault();
        //this.validate();
        var username,hash,salt,firstname,secondname,email
        await fetch("http://localhost:3000/selectHashAndSalt/" + this.state.username, {
            method: "GET"
        }).then(response => response.json()).then(data => {hash = data[0].Password;salt = data[0].Salt})
        console.log(hash);
        console.log(salt);
        var hashCheck = crypto.createHmac("sha512",salt)
        hashCheck.update(this.state.password + salt)
        hashCheck = hashCheck.digest("hex")
        //if password is correct
        if(hash == hashCheck){
            await fetch("http://localhost:3000/selectLoginUser/" + this.state.username, {
                method: "GET"
            }).then(response => response.json()).then(data => {username=data[0].Username;salt=data[0].Salt;firstname=data[0].FirstName;secondname=data[0].SecondName;email=data[0].Email})
            await fetch("http://localhost:3000/getUserAccounts/" + this.state.username, {
                method: "GET"
            }).then(response => response.json()).then(data => {for(var x of data){addAccount(new Account(data[0].Name,data[0].Type,data[0].Balance,data[0].Currency,data[0].AccNumber))}})
            setUsername(username);
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

    validate = event =>{
        // validates the user's input
       let usernameError = "";
       let passwordError = "";

        if (!this.state.username){
            usernameError = "Username is required"
        }
        if (!this.state.password){
            passwordError= "Password is required"
        }

       this.setState({usernameError, passwordError})
    }

    render() {
        return (
            <context.Consumer>{({setUsername,setFirstName,setLastName,setLoggedIn,addAccount}) => (
                <div>
                    <h1>Log in</h1>
                    <form action="Login" id="LoginForm" method="post" onSubmit={e => this.handleSubmit(e,setUsername,setFirstName,setLastName,setLoggedIn,addAccount)}>

                        <label htmlFor="username">Username: </label><br/>
                        <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
                        <div style={{color:"red"}}>{this.state.usernameError}</div><br/>

                        <label htmlFor="password">Password: </label><br/>
                        <input type="password" id="password" name="password" value={this.state.password}
                               onChange={this.handleChange}/>
                        <div style={{color:"red"}}>{this.state.passwordError}</div><br/>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            </context.Consumer>


        );
    }
}
