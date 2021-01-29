import React from "react";
import {Redirect} from "react-router-dom";
import style from "../../assets/css/admin.module.css";

/*
        Created by Jevgenij Guzikovskij.
        React Component containing StuBank Users list for Administrator.
*/

export class AdminUserList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            showTable: false,
            clickedId: null
        }
    }
    onClick() {
        this.wrapTable();
    }

    // In case user manually changes length of users list, it will not query database extra
    // Once user list is saved, we change state of the table, to render it and hide button
    async getUserList(){
        if (0 <! this.state.users.length) {
            await fetch("http://localhost:3000/getAllUsers", {
                method: "GET"
            }).then(response => response.json()).then(data => {
                if (data.length !== this.state.users.length || data.length < this.state.users.length) {
                    data.map((user) => {
                        this.state.users.push({
                            username: user.Username,
                            firstname: user.FirstName,
                            surname: user.SecondName,
                            email: user.Email
                        });
                    });
                    this.setState({showTable: true});
                }
            })
        }
    }

    // Maps user data into the table
    renderTableData = () =>{
        return this.state.users.map((user, index) => {
            const { username, firstname, surname, email} = user // Destructuring data
            return (
                <tr key={username}>
                    <td>{username}</td>
                    <td>{firstname}</td>
                    <td>{surname}</td>
                    <td>{email}</td>
                    <td>
                        <button onClick={() => this.redirection(username,firstname,surname,email)}>{'Edit'}</button>
                    </td>
                </tr>
            )
        })
    }

    // Redirects to the AdminUserChange page and passes necessary data
    redirection(username, firstname, surname, email){
        this.setState({redirectProps: {username: username, firstname: firstname, surname: surname, email: email} })
        this.setState({redirect: true});
    }

    renderTableHeader() {
        if (this.state.users.length > 0) {
            let header = Object.keys(this.state.users[0])
            return header.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            });
        }
    }

    // Wraps table header and its content as well as getting userList from the database
    wrapTable(){
        this.getUserList();
        return(
            <div>
                <h1 className={style.header}>Table of Users</h1>
                <table className={style.userTable}>
                    {this.renderTableHeader()}
                    <th key={5}>{"REDIRECT"}</th>
                    {this.renderTableData()}
                </table>
            </div>
        )
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: `/admin/service/userChange/${this.state.redirectProps.username}`,
                state: {
                    username: this.state.redirectProps.username,
                    firstname: this.state.redirectProps.firstname,
                    surname:this.state.redirectProps.surname,
                    email:  this.state.redirectProps.email
                }
            }}/>
        }
        return(
            <div>
                {
                    this.state.showTable ?
                        this.wrapTable() :
                        <button style={{height: "2.8vh"}} onClick={() => this.onClick()}>Show table</button>
                }
            </div>
        )
    }
}
