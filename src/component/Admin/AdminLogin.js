import React, {Component} from "react";
import style from "../../assets/css/admin.module.css";
import {Redirect} from "react-router";
import {context} from "./AdminPage"

const crypto = require("crypto");
/*
*       Created by Jevgenij Guzikovskij
*       This page provides ability to login for user with admin permissions
* */

export class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state ={
            username: "",
        }
    }

    handleInputChange = (event) =>{
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event, setUsername, setLoggedIn) {
        event.preventDefault();
        await this.validate();
        if (this.state.usernameError || this.state.passwordError) {
            return null;
        }

        let username, hash, salt;
        await fetch("http://localhost:3000/getAdminHashAndSalt/" + this.state.username, {
            method: "GET"
        }).then(response => response.json()).then(data => {
            if (data[0]) {
                hash = data[0].Password;
                salt = data[0].Salt;
            }
        })
        if (salt) {
            let hashCheck = crypto.createHmac("sha512", salt);
            hashCheck.update(this.state.password + salt)
            hashCheck = hashCheck.digest("hex")
            if (hash === hashCheck) {
                await fetch("http://localhost:3000/selectLoginAdmin/" + this.state.username, {
                    method: "GET"
                }).then(response => response.json()).then(data => {
                    if (data[0]) {
                        username = data[0].Username;
                        salt = data[0].Salt;
                    }
                })
                setUsername(this.state.username);
                setLoggedIn(true);
                this.props.history.push("/admin/service")
            }
        }
        else {
            alert("Incorrect login, please try again")
        }
    }

    async validate(event) {
        // validates the admins input
        let usernameError = "";
        let passwordError = "";

        if (!this.state.username) {
            usernameError = "Username is required"
        }
        if (!this.state.password) {
            passwordError = "Password is required"
        }

        this.setState({usernameError, passwordError})
    }

    render(){
        return(
            <context.Consumer>{({setUsername,setLoggedIn}) =>(
            <div>
                <div>
                    <form action="Login" className={style.admin_login} method="post"
                          onSubmit={e => this.handleSubmit(e, setUsername, setLoggedIn)}>
                        <h4>Admin login</h4>
                        <input
                            id="login"
                            type="text"
                            name="username"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            required/><br/>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required/><br/>
                        <button type={"submit"}>Login</button>
                    </form>
                    {
                        this.state.loggedIn && (
                            <Redirect to={'/admin/service'}/>
                        )
                    }
                </div>
            </div>
            )}
            </context.Consumer>
        )
    }
}
