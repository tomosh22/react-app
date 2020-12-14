import React from "react";

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
    }

    handleSubmit = event => {
        event.preventDefault();
        this.validate();
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
            <div>
                <h1>Login</h1>
                <form action="Login" id="LoginForm" method="post" onSubmit={this.handleSubmit}>

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

        );
    }
}
