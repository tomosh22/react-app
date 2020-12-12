import React from "react";

export class TransferToUser extends React.Component {
    state ={
        accName: "",
        accNumber: "",
        sortCode: "",
        currency: "£",
        //Set default value as will not update if user does not select a different option to the default option
        amount: "",
        accNameError: "",
        accNumberError: "",
        sortCodeError: "",
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
        let accNameError ="";
        let accNumberError ="";
        let sortCodeError ="";
        let amountError = "";
        const amountRegex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
        const sortCodeRegex = new RegExp("^[0-9]{2}-[0-9]{2}-[0-9]{2}")

        if (!this.state.accName){
            accNameError = "Account name is required"
        }
        if (!this.state.accNumber){
            accNumberError = "Account number is required"
        }

        if (!this.state.sortCode){
            sortCodeError = "Sort code is required"
        }else if(!(sortCodeRegex.test(this.state.sortCode))) {
            sortCodeError = "Sort code must be in format xx-xx-xx"
        }

        if (!this.state.amount){
            amountError = "Amount is required"
        }else if(!(amountRegex.test(this.state.amount))) {
            amountError = "Amount must be valid"
        }

        this.setState({accNameError, accNumberError,sortCodeError, amountError})
    }


    render() {
        return (
            <div>
                <br></br>
                <form action="TransferMoneyToUser" id="TransferMoneyToUserForm" method="post" onSubmit={this.handleSubmit}>

                    <label htmlFor="accName">Name on Account</label><br></br>
                    <input id="accName" name="accName" value={this.state.accName} onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.accNameError}</div><br></br>

                    <label htmlFor="accNumber">Account Number</label><br></br>
                    <input type="number" id="accNumber" name="accNumber" value={this.state.accNumber}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.accNumberError}</div><br></br>

                    <label htmlFor="sortCode">Sort Code</label><br></br>
                    <input id="sortCode" name="sortCode" value={this.state.sortCode}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.sortCodeError}</div><br></br>

                    <label htmlFor="amount">Amount</label><br></br>
                    <select id="currency" name="currency" value={this.state.currency} onChange={this.handleChange}>
                        <option value="£">£</option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                    </select>
                    <input type="number" id="amount" name="amount" step=".01" value={this.state.amount}
                           onChange={this.handleChange}></input>
                    <div style={{color:"red"}}>{this.state.amountError}</div><br></br>

                    <button type="submit">Send Money</button>

                </form>
            </div>
        )
    };
}