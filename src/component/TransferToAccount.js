import React from "react";

export class TransferToAccount extends React.Component {
    render() {
        return (
            <div>
                <br></br>
                <label htmlFor="accountName">Account Name</label><br></br>
                <input id="accountName" name="accountName"></input><br></br><br></br>

                <label htmlFor="amount">Amount</label><br></br>
                <select id="currency" name="currency">
                    <option value="£">£</option>
                    <option value="$">$</option>
                    <option value="€">€</option>
                </select>
                <input type="number" id="amount" name="amount"></input><br></br><br></br>

                <button type="button" onClick="UserMoveMoney()" formAction="">Send Money</button>
            </div>
        )
    }
}