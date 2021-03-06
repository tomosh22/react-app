//written by Tom O'Shaughnessy
import React, {useContext} from "react";
import {context, Account} from "./App"

const crypto = require("crypto");
const twofactor = require("node-2fa");

export class SignUp extends React.Component {
    //stores user input values, errors are used for input validation
    state = {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        postcode: "",
        usernameError: "",
        passwordError: "",
        emailError: "",
        firstNameError: "",
        lastNameError: "",
        address1Error: "",
        address2Error: "",
        address3Error: "",
        address4Error: "",
        postcodeError: "",
        newSecret: ""
    };
    //called every time a field changes value
    handleChange = event => {
        // stores what user types in form in React
        this.setState({[event.target.name]: event.target.value})
        if (event.target.name === "username") {
            this.setState({newSecret: twofactor.generateSecret({name: "Stubank", account: this.state.username})})

        }

    }

    //inputs user data into database and logs the user in with their new account
    async handleSubmit(event, setFirstName, setLoggedIn, addAccount, setUsername) {
        //removes apostrophes from last name
        this.state.lastName = this.state.lastName.replace("\'", "");
        // validates the user's input
        event.preventDefault();
        this.validate();
        if (
            this.state.usernameError === "" &&
            this.state.passwordError === "" &&
            this.state.emailError === "" &&
            this.state.firstNameError === "" &&
            this.state.lastNameError === "" &&
            this.state.address1Error === "" &&
            this.state.address2Error === "" &&
            this.state.postcodeError === ""
        ) {
            //checks if desired username already exists
            var abort = false;
            await fetch("http://localhost:3000/selectUsername/" + this.state.username, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                if (data[0]) {
                    alert("username already exists");
                    abort = true
                }
            })
            //aborts if username exists
            if (abort) return;
            //generate salt and hashed password without ascii code 39 (')
            var found;
            while (true) {
                var salt = crypto.randomBytes(16);
                found = false;
                for (var x of salt) {

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

            //hashes user's password
            var hash = crypto.createHmac("sha512", salt)
            hash.update(this.state.password + salt)
            hash = hash.digest("hex")

            //checks if address is already in database
            var AddressId = -1;
            await fetch("http://localhost:3000/selectAddress/" + this.state.address1 + "/" + this.state.address2 + "/" + this.state.address3 + "/" + this.state.address1 + "/" + this.state.postcode, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                if (data[0]) {
                    AddressId = data[0].AddressId
                }
            })
            //if address doesnt exist create it
            if (AddressId === -1) {
                await fetch("http://localhost:3000/insertAddress/" + this.state.address1 + "/" + this.state.address2 + "/" + this.state.address3 + "/" + this.state.address4 + "/" + this.state.postcode,
                    {
                        method: "POST"
                    })
                await fetch("http://localhost:3000/selectAddress/" + this.state.address1 + "/" + this.state.address2 + "/" + this.state.address3 + "/" + this.state.address4 + "/" + this.state.postcode, {
                    method: "GET"
                }).then(response => response.json()).then(data => {
                    AddressId = data[0].AddressId;
                    this.data = data[0]
                })
            }
            //adds user data to database
            await fetch("http://localhost:3000/insertUser/" + this.state.username + "/" + hash + "/" + salt + "/" + this.state.firstName + "/" + this.state.lastName + "/" + this.state.email + "/" + AddressId + "/" + this.state.newSecret.secret,
                {
                    method: "POST"
                })
            //gets all user accounts for login
            await fetch("http://localhost:3000/getUserAccounts/" + this.state.username, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                for (x of data) {
                    addAccount(new Account(data.Name, data.Type, data.Balance, data.Currency, data.AccNumber))
                }
            })
            //logs in
            setUsername(this.state.username);
            setFirstName(this.state.firstName);
            setLoggedIn(true);
            //redirects to dashboard
            this.props.history.push("/dashboard");
        }
    }
    //checks all user input against regex
    validate = event => {
        let usernameError = "";
        let passwordError = "";
        let emailError = "";
        let firstNameError = "";
        let lastNameError = "";
        let address1Error = "";
        let address2Error = "";
        let address3Error = "";
        let address4Error = "";
        let postcodeError = "";
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
        const postcodeRegex = new RegExp("^[A-Z]{1,2}[0-9]{1,2}[A-Z]?(\\s*[0-9][A-Z]{1,2})?$");

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
        if (!this.state.address1) {
            address1Error = "Address line 1 is required"
        }
        if (!this.state.address2) {
            address2Error = "Address line 2 is required"
        }
        if (!this.state.address3) {
            address3Error = "Address line 3 is required"
        }
        if (!this.state.address4) {
            address4Error = "Address line 4 is required"
        }
        if (!this.state.postcode) {
            postcodeError = "Postcode is required"
        } else if (!(postcodeRegex.test(this.state.postcode))) {
            postcodeError = "Postcode must be valid"
        }

        this.setState({
            usernameError, passwordError, emailError, firstNameError, lastNameError, address1Error,
            address2Error, address3Error, address4Error, postcodeError
        })
    };

    render() {

        return (
            <context.Consumer>{({setFirstName, setLoggedIn, addAccount, setUsername}) => (
                <div>
                    <h1>Sign up</h1>
                    <form action="SignUp" id="signUpForm" method="post"
                          onSubmit={e => this.handleSubmit(e, setFirstName, setLoggedIn, addAccount, setUsername)}>
                        <label htmlFor="username">Username: </label><br/>
                        <input type="text" id="username" name="username" value={this.state.username}
                               onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.usernameError}</div>
                        <br/>

                        <label htmlFor="password">Password: </label><br/>
                        <input type="password" id="password" name="password" value={this.state.password}
                               onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.passwordError}</div>
                        <br/>

                        <label htmlFor="email">Email: </label><br/>
                        <input type="text" id="email" name="email" value={this.state.email}
                               onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.emailError}</div>
                        <br/>

                        <label htmlFor="firstName">First Name: </label><br/>
                        <input type="text" id="firstName" name="firstName" value={this.state.firstName}
                               onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.firstNameError}</div>
                        <br/>

                        <label htmlFor="lastName">Last Name: </label><br/>
                        <input type="text" id="lastName" name="lastName" value={this.state.lastName}
                               onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.lastNameError}</div>
                        <br/>

                        <label htmlFor="address1">House or Building Number: </label><br/>
                        <input type="text" id="address1" name="address1" value={this.state.address1}
                               onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.address1Error}</div>
                        <br/>

                        <label htmlFor="address2">Street: </label><br/>
                        <input type="text" id="address2" name="address2" value={this.state.address2}
                               onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.address2Error}</div>
                        <br/>

                        <label htmlFor="address3">Town/City: </label><br/>
                        <input type="text" id="address3" name="address3" value={this.state.address3}
                               onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.address3Error}</div>
                        <br/>

                        <label htmlFor="address4">County: </label><br/>
                        <input type="text" id="address4" name="address4" value={this.state.address4}
                               onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.address4Error}</div>
                        <br/>

                        <label htmlFor="postcode">Postcode: </label><br/>
                        <input type="text" id="postcode" name="postcode" value={this.state.postcode}
                               onChange={this.handleChange}/>
                        <div style={{color: "red"}}>{this.state.postcodeError}</div>
                        <br/>

                        <label htmlFor="qr">Google Authenticator QR Code</label><br/>
                        <div>
                            {this.state.newSecret === ""
                                ? <div></div>

                                : <div>
                                    <img src={this.state.newSecret.qr} id="qr"/>
                                    <p>On mobile devices, copy and paste key into Google Authenticator</p>
                                    <p>{this.state.newSecret.secret}</p>
                                    <br/>
                                </div>
                            }
                        </div>


                        <button type="submit">Submit</button>

                    </form>
                </div>
            )}
            </context.Consumer>
        );
    }
}
