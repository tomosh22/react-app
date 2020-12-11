import React from "react";

export class TransferToAccount extends React.Component {

    state ={
        accountName: "",
        currency: "£",
        //Set default value as will not update if user does not select a different option to the default option
        amount: "",
        accountNameError: "",
        amountError: "",
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
        let accountNameError ="";
        let amountError = "";
        const amountRegex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");

        if (!this.state.accountName){
            accountNameError = "Account name is required"
        }
        if (!this.state.amount){
            amountError = "Amount is required"
        }else if(!(amountRegex.test(this.state.amount))) {
            amountError = "Amount must be valid"
        }

        this.setState({accountNameError, amountError})
    }

    render() {
        return (
            <div>
                <br></br>

                <form action="TransferMoneyToAccount" id="TransferMoneyToAccountForm" method="post" onSubmit={this.handleSubmit}>

                    <label htmlFor="accountName">Account Name</label><br></br>
                    <input id="accountName" name="accountName" value={this.state.accountName}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.accountNameError}</div><br></br>

                    <label htmlFor="amount">Amount</label><br></br>
                    <select id="currency" name="currency" value={this.state.currency} onChange={this.handleChange}>
                        <option value="£">£</option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                    </select>
                    <input type="number" id="amount" name="amount" step=".01" value={this.state.amount}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.amountError}</div><br></br>

                    <button type="submit" >Send Money</button>
                </form>
            </div>
        )
    }
}