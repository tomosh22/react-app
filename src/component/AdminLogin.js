import React, {Component} from "react";
import style from "../assets/css/admin.module.css";
import {Redirect} from "react-router";

export class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            logged: false
        };
    }
    handleInputChange = (event) =>{
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }
    // todo: Create `authentication/admin` on the express and integrate responses with different
    //  codes, to determine errors
    onSubmit = async (event) => {
        event.preventDefault();
        await fetch("http://localhost:3000/authentication/admin", {
            method: "POST",
            body: JSON.stringify(this.state)
        })
            .then(response => {
                if (response.status === 222) {
                    this.props.history.push('/');
                    this.state.logged = true;
                } else {
                    throw new Error(response.error());
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error appeared at the log in time. Please, try again!')
            })
    }

    render(){
        return(
            <div>
                <div>
                    <form className={style.admin_login} onSubmit={this.onSubmit}>
                        <h4>Admin login</h4>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            required/><br/>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required/><br/>
                        <button type={"submit"}>Login</button>
                    </form>
                    {
                        this.state.logged && (
                            <Redirect to={'/service'}/>
                        )
                    }
                </div>
            </div>
        )
    }
}
