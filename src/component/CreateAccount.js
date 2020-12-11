import React from "react";

export class CreateAccount extends React.Component{

    state= {
        type: "Current",
        currency: "£",
        //Set default values as will not update if user does not select a different option to the default option
        accountName: "",
        accountNameError: ""
    }

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
        let accountNameError= "";
        if (!this.state.accountName){
            accountNameError = "Account name is required"
        }
        this.setState({accountNameError})
    }


    render() {
        return (
            <div>
                <h1>Create Account</h1>
                <form action="CreateAccount" id="createAccountForm" method="post" onSubmit={this.handleSubmit}>
                    <label htmlFor="type">Type:</label><br></br>
                    <select id="type" name="type" value={this.state.type} onChange={this.handleChange}>
                        <option value="current">Current</option>
                        <option value="savings">Savings</option>
                    </select><br></br><br></br>


                    <label htmlFor="currency">Currency:</label><br></br>
                    <select id="currency" name="currency" value={this.state.currency} onChange={this.handleChange}>
                        <option value="£">£</option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                    </select><br></br><br></br>

                    <label htmlFor="accountName">Account Name:</label><br></br>
                    <input type="text" id="accountName" name="accountName" value={this.state.username}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.accountNameError}</div><br></br>

                    <button type="submit" >Submit</button>
                </form>
            </div>
        );
    }
}