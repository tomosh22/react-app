import React from "react";
import {Redirect} from "react-router-dom";
import style from "../../assets/css/admin.module.css"


export class AdminUserList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            users: [
                { id: 1, username: 'Wasi', firstname: 21, email: 'wasif@email.com', change:'Edit'},
                { id: 2, username: 'Alih', firstname: 19, email: 'ali@email.com' ,  change:'Edit'},
                { id: 3, username: 'Saad', firstname: 16, email: 'saad@email.com' , change:'Edit'},
                { id: 4, username: 'Asad', firstname: 25, email: 'asad@email.com' , change:'Edit'}
                ]
        }
    }

    state = { redirect: null };

    renderTableData = () =>{
        return this.state.users.map((user, index) => {
            const { id, username, firstname, email, change} = user //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{firstname}</td>
                    <td>{email}</td>
                    <td>
                        <button onClick={() => this.setState({ redirect: `/service/userChange/${username}`})}>{change}</button>
                    </td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.users[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <div>
                <h1 className={style.header}>Table of Users</h1>
                <table className={style.userTable}>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}
