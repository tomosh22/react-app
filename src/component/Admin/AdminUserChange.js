import React from "react";
import {Account} from "../App";

const crypto = require("crypto");

export class AdminUserChange extends React.Component{
    state = {
        username: this.props.match.params.username,
        password: "",
        email: this.props.location.state.email,
        firstName: this.props.location.state.firstname,
        lastName: this.props.location.state.surname,
        usernameError: "",
        passwordError: "",
        emailError: "",
        firstNameError: "",
        lastNameError: "",
    };

    handleInputChange = (event) =>{
        // stores what user types in form in React
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event, setFirstName, addAccount, setUsername) {
        this.state.lastName = this.state.lastName.replace("\'", "");
        // validates the user's input
        event.preventDefault();
        this.validate();
        if (
            this.state.usernameError === "" &&
            this.state.passwordError === "" &&
            this.state.emailError === "" &&
            this.state.firstNameError === "" &&
            this.state.lastNameError === ""
        ) {
            var abort = false;
            await fetch("http://localhost:3000/selectUsername/" + this.state.username, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                if (data[0]) {
                    alert("username already exists");
                    abort = true
                }
            })
            if (abort) return;
            //generate salt and hashed password without ascii code 39 (')
            var found;
            while (true) {
                var salt = crypto.randomBytes(16);
                found = false;
                for (var x of salt) {
                    console.log(x)
                    if (x == 39) {
                        found = true;
                    }
                }
                if (!found) {
                    break;
                }
                ;
            }
            salt = salt.toString("utf8")
            var hash = crypto.createHmac("sha512", salt)
            hash.update(this.state.password + salt)
            hash = hash.digest("hex")
            await fetch("http://localhost:3000/updateUserInformation/" + this.state.username + "/" + hash + "/" + salt + "/" + this.state.firstName + "/" + this.state.lastName + "/" + this.state.email,
                {
                    method: "POST"
                })
        }
    }

    validate = event => {
        let usernameError = "";
        let passwordError = "";
        let emailError = "";
        let firstNameError = "";
        let lastNameError = "";
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");

        if (!this.state.username) {
            usernameError = "Username is required"
        }

        if (!this.state.password) {
            passwordError = "Password is required"
        } else if (!(passwordRegex.test(this.state.password))) {
            passwordError = "Password must contain at least one digit, one uppercase and one lowercase letter," +
                " and be at least 8 characters"
        }

        if (!this.state.email) {
            emailError = "Email is required"
        } else if (!(emailRegex.test(this.state.email))) {
            emailError = "Email must be valid"
        }

        if (!this.state.firstName) {
            firstNameError = "First name is required"
        }
        if (!this.state.lastName) {
            lastNameError = "Last name is required"
        }

        this.setState({
            usernameError, passwordError, emailError, firstNameError, lastNameError
        })
    };

    render(){
        return(
            <div>
                <form action="changeUserData" id="changeUserForm" method="post">
                    <label htmlFor="username">Username: </label><br/>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        style={{textAlign: "center"}}
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                    <div style={{color: "red"}}>{this.state.usernameError}</div>
                    <br/>

                    <label htmlFor="password">Password: </label><br/>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        style={{textAlign: "center"}}
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <div style={{color: "red"}}>{this.state.passwordError}</div>
                    <br/>

                    <label htmlFor="email">Email: </label><br/>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        style={{textAlign: "center"}}
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <div style={{color: "red"}}>{this.state.emailError}</div>
                    <br/>

                    <label htmlFor="firstName">First Name: </label><br/>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        style={{textAlign: "center"}}
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                    />
                    <div style={{color: "red"}}>{this.state.firstNameError}</div>
                    <br/>

                    <label htmlFor="lastName">Last Name: </label><br/>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        style={{textAlign: "center"}}
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                    />
                    <div style={{color: "red"}}>{this.state.lastNameError}</div>
                    <br/>
                    <br/>
                    <button type="submit">Submit</button>

                </form>
            </div>
        )
    }
}
