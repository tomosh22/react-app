import React from "react";

function createAccount() {
    return(
        <div>
            <h1>Create New Account</h1>
            <label for="type">Type:</label>
            <select id="type" name="type">
                <option value="current">Current</option>
                <option value="savings">Savings</option>
            </select>
            <br></br>
            <br></br>
            <label for="currency">Currency:</label>
            <select id="currency" name="currency">
                <option value="£">£</option>
                <option value="$">$</option>
                <option value="€">€</option>
            </select>
            <br></br>
            <br></br>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name"></input>
            <br></br>
            <br></br>
            <label for="balance">Balance:</label>
            <input type="number" step="0.01" id="balance" name="balance"></input>
            <br></br>
            <br></br>
            <button type="button" onClick="Create()" formAction="">Submit</button>
        </div>
    );
}

export default createAccount;