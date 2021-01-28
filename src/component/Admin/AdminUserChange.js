import React from "react";

export class AdminUserChange extends React.Component{
    state = {
        username: this.props.match.params.username,
        password: this.props.match.params.password,
        email: this.props.match.params.email,
        firstName: "",
        lastName: "",
        postcode: "",
    };

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
            usernameError, passwordError, emailError, firstNameError, lastNameError, address1Error,
            address2Error, address3Error, address4Error, postcodeError
        })
    };

    render(){
        return(
            <div>
                <form action="changeUserData" id="changeUserForm" method="post">
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
                    <br/>
                    <button type="submit">Submit</button>

                </form>
            </div>
        )
    }
}
