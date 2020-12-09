import React from "react";

function CreateAccount() {
    return(
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

                <label htmlFor="accountName">Name:</label><br></br>
                <input type="text" id="accountName" name="accountName"></input><br></br><br></br>

                <label htmlFor="balance">Balance:</label><br></br>
                <input type="number" step="0.01" id="balance" name="balance"></input><br></br><br></br>


                <button type="button" onClick="Create()" formAction="">Submit</button>
            </form>
        </div>
    );
}

export default CreateAccount;