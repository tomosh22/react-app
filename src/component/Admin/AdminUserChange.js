import React from "react";
import style from "../../assets/css/admin.module.css"

export class AdminUserChange extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            users: [
                { id: 1, username: 'joeb', password: 'password', salt: 'saltsaltsaltsalt',firstname: 'Joe', surname: 'Bloggs', email: 'joeb@gmail.com'},
            ]
        }
    }
    renderTableData = () =>{
        return this.state.users.map((user, index) => {
            const { id, username, password, salt, surname, firstname, email} = user //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{password}</td>
                    <td>{salt}</td>
                    <td>{firstname}</td>
                    <td>{surname}</td>
                    <td>{email}</td>
                    <td>
                        <button type={"submit"}>Submit</button>
                    </td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.users)
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render(){
        return(
            <div>
                    <h1 className={style.header}>Change User: {this.props.match.params.username}</h1>
                <div>
                    <table className={style.userTable}>
                        <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
