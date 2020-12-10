import React from "react";

export class CreateAccount extends React.Component{
    render() {
        return (
            <div>
                <h1>Create Account</h1>
                <form action="CreateAccount" id="createAccountForm" method="post">
                    <label htmlFor="type">Type:</label><br></br>
                    <select id="type" name="type">
                        <option value="current">Current</option>
                        <option value="savings">Savings</option>
                    </select><br></br><br></br>

                    <label htmlFor="currency">Currency:</label><br></br>
                    <select id="currency" name="currency">
                        <option value="£">£</option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                    </select><br></br><br></br>

                    <label htmlFor="accountName">Account Name:</label><br></br>
                    <input type="text" id="accountName" name="accountName"></input><br></br><br></br>


                    <button type="button" onClick="Create()" formAction="">Submit</button>
                </form>
            </div>
        );
    }
}