import React from "react";

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
        this.setState ({[event.target.name] : event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.validate();
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
                    <label htmlFor="username">Username: </label><br></br>
                    <input type="text" id="username" name="username" value={this.state.username}
                           onChange={this.handleChange}></input>
                     <div style={{color:"red"}}>{this.state.usernameError}</div><br></br>

                    <label htmlFor="password">Password: </label><br></br>
                    <input type="password" id="password" name="password" value={this.state.password}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.passwordError}</div><br></br>

                    <label htmlFor="email">Email: </label><br></br>
                    <input type="text" id="email" name="email" value={this.state.email}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.emailError}</div><br></br>

                    <label htmlFor="firstName">First Name: </label><br></br>
                    <input type="text" id="firstName" name="firstName" value={this.state.firstName}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.firstNameError}</div><br></br>

                    <label htmlFor="lastName">Last Name: </label><br></br>
                    <input type="text" id="lastName" name="lastName" value={this.state.lastName}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.lastNameError}</div><br></br>

                    <label htmlFor="address1">Address Line 1: </label><br></br>
                    <input type="text" id="address1" name="address1" value={this.state.address1}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.address1Error}</div><br></br>

                    <label htmlFor="address2">Address Line 2: </label><br></br>
                    <input type="text" id="address2" name="address2" value={this.state.address2}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.address2Error}</div><br></br>

                    <label htmlFor="postcode">Postcode: </label><br></br>
                    <input type="text" id="postcode" name="postcode" value={this.state.postcode}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.postcodeError}</div><br></br>

                    <button type="submit">Submit</button>
                 </form>
            </div>

        );
    }
}
