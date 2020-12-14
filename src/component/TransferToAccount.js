import React from "react";

export class TransferToAccount extends React.Component {

    state ={
        accountFrom: "",
        accountTo: "",
        currency: "£",
        //Set default value as will not update if user does not select a different option to the default option
        amount: "",
        accountFromError: "",
        accountToError: "",
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
        let accountFromError ="";
        let accountToError="";
        let amountError = "";
        const amountRegex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");

        if (!this.state.accountTo){
            accountToError = "Account name is required"
        }
        if (!this.state.accountFrom){
            accountFromError = "Account name is required"
        }
        if (!this.state.amount){
            amountError = "Amount is required"
        }else if(!(amountRegex.test(this.state.amount))) {
            amountError = "Amount must be valid"
        }

        this.setState({accountFromError, accountToError, amountError})
    }

    render() {
        return (
            <div>
                <br></br>

                <form action="TransferMoneyToAccount" id="TransferMoneyToAccountForm" method="post" onSubmit={this.handleSubmit}>

                    <label htmlFor="accountFrom">From:</label><br></br>
                    <input id="accountFrom" name="accountFrom" placeholder={"Choose an account"}
                           value={this.state.accountFrom} onChange={this.handleChange}></input>

                    <div style={{color:"red"}}>{this.state.accountFromError}</div><br></br>

                    <label htmlFor="accountTo">To:</label><br></br>
                    <input id="accountTo" name="accountTo" placeholder={"Choose an account"}
                           value={this.state.accountTo} onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.accountToError}</div><br></br>

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