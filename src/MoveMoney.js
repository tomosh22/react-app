import React from "react";

function MoveMoney(){
    return(
        <div>
            <h1>Move Money</h1>
            <form action="MoveMoney" id="moveMoneyForm" method="post">

                <label htmlFor="accName">Name on Account</label><br></br>
                <input id="accName" name="accName"></input><br></br><br></br>

                <label htmlFor="accNumber">Account Number</label><br></br>
                <input type="number" id="accNumber" name="accNumber"></input><br></br><br></br>

                <label htmlFor="sortCode">Sort Code</label><br></br>
                <input id="sortCode" name="sortCode"></input><br></br><br></br>

                <label htmlFor="amount">Amount</label><br></br>
                <select id="currency" name="currency">
                    <option value="£">£</option>
                    <option value="$">$</option>
                    <option value="€">€</option>
                </select>
                <input type="number" id="amount" name="amount"></input><br></br><br></br>

                <button type="button" onClick="UserMoveMoney()" formAction="">Send Money</button>

            </form>
        </div>

    );
}

export default MoveMoney;