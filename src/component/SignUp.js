import React from "react";
const crypto = require("crypto");

export class SignUp extends React.Component{

    state = {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        postcode: "",
        usernameError: "",
        passwordError: "",
        emailError: "",
        firstNameError: "",
        lastNameError: "",
        address1Error: "",
        address2Error: "",
        postcodeError: "",
    };

    handleChange = event => {
        // stores what user types in form in React
        this.setState ({[event.target.name] : event.target.value})
    }

    handleSubmit = async event => {
        // validates the user's input
        event.preventDefault();
        //this.validate();
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
            //generate salt and hashed password
            var salt = crypto.randomBytes(16);
            var hash = crypto.createHmac("sha512", salt)
            hash.update(this.state.password + salt)
            hash = hash.digest("hex")
            console.log(salt, hash)
            var AddressId = -1;
            await fetch("http://localhost:3000/selectAddress/" + this.state.address1 + "/" + this.state.address2 + "/" + this.state.postcode, {
                method: "GET"
            }).then(response => response.json()).then(data => {if(data[0]){ AddressId = data[0].AddressId}})
            if (AddressId === -1){
                await fetch("http://localhost:3000/insertAddress/"+this.state.address1+"/"+this.state.address2+"/"+this.state.postcode,
                    {
                        method:"POST"
                    })
                await fetch("http://localhost:3000/selectAddress/" + this.state.address1 + "/" + this.state.address2 + "/" + this.state.postcode, {
                    method: "GET"
                }).then(response => response.json()).then(data => AddressId = data[0].AddressId)
            }
            await fetch("http://localhost:3000/insertUser/"+this.state.username+"/"+hash+"/"+salt+"/"+this.state.firstName+"/"+this.state.lastName+"/"+this.state.email+"/"+AddressId,
                {
                    method:"POST"
                })


        }
    }

    validate = event =>{
        let usernameError = "";
        let passwordError = "";
        let emailError= "";
        let firstNameError= "";
        let lastNameError= "";
        let address1Error= "";
        let address2Error= "";
        let postcodeError= "";
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
        const postcodeRegex = new RegExp("^[A-Z]{1,2}[0-9]{1,2}[A-Z]?(\\s*[0-9][A-Z]{1,2})?$");

        if (!this.state.username){
            usernameError = "Username is required"
        }

        if (!this.state.password){
            passwordError= "Password is required"
        } else if(!(passwordRegex.test(this.state.password))) {
            passwordError = "Password must contain at least one digit, one uppercase and one lowercase letter," +
                " and be at least 8 characters"
        }

        if (!this.state.email){
            emailError = "Email is required"
        } else if(!(emailRegex.test(this.state.email))) {
            emailError = "Email must be valid"
        }

        if (!this.state.firstName){
            firstNameError = "First name is required"
        }
        if (!this.state.lastName){
            lastNameError = "Last name is required"
        }
        if (!this.state.address1){
            address1Error = "Address line 1 is required"
        }
        if (!this.state.address2){
            address2Error = "Address line 2 is required"
        }
        if (!this.state.postcode){
            postcodeError = "Postcode is required"
        } else if (!(postcodeRegex.test(this.state.postcode))) {
            postcodeError = "Postcode must be valid"
        }

        this.setState({usernameError, passwordError, emailError, firstNameError, lastNameError, address1Error,
            address2Error, postcodeError})
    }

    render(){
        return (
            <div>
                 <h1>Sign Up</h1>
                 <form action="SignUp" id="signUpForm" method="post" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username: </label><br/>
                    <input type="text" id="username" name="username" value={this.state.username}
    onChange={this.handleChange}/>
                     <div style={{color:"red"}}>{this.state.usernameError}</div><br/>

                    <label htmlFor="password">Password: </label><br/>
                    <input type="password" id="password" name="password" value={this.state.password}
    onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.passwordError}</div><br/>

                    <label htmlFor="email">Email: </label><br/>
                    <input type="text" id="email" name="email" value={this.state.email}
    onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.emailError}</div><br/>

                    <label htmlFor="firstName">First Name: </label><br/>
                    <input type="text" id="firstName" name="firstName" value={this.state.firstName}
    onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.firstNameError}</div><br/>

                    <label htmlFor="lastName">Last Name: </label><br/>
                    <input type="text" id="lastName" name="lastName" value={this.state.lastName}
    onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.lastNameError}</div><br/>

                    <label htmlFor="address1">Address Line 1: </label><br/>
                    <input type="text" id="address1" name="address1" value={this.state.address1}
    onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.address1Error}</div><br/>

                    <label htmlFor="address2">Address Line 2: </label><br/>
                    <input type="text" id="address2" name="address2" value={this.state.address2}
    onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.address2Error}</div><br/>

                    <label htmlFor="postcode">Postcode: </label><br/>
                    <input type="text" id="postcode" name="postcode" value={this.state.postcode}
    onChange={this.handleChange}/>
                    <div style={{color:"red"}}>{this.state.postcodeError}</div><br/>

                    <button type="submit">Submit</button>
                 </form>
            </div>

        );
    }
}
