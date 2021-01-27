//Component and functions created by Maisie Eddleston

async function AddTag(tag, username) {
    /*
    Insert new tag into the Tags table in the database
     */

    await fetch("http://localhost:3000/insertTag/"
        + username + "/" + tag,
        {
            method: "POST"
        });
}

async function DeleteTag(tag, username) {
    /*
    Delete tag from the Tags table in the database
     */

    await fetch("http://localhost:3000/deleteTag/"
        + username + "/" + tag,
        {
            method: "POST"
        });
}

async function SetFavourite(username, accName, accNumber) {
    /*
    Insert new favourite into the Favourites Table in the database
     */

    await fetch("http://localhost:3000/insertFavouritePayees/" + username + "/" + accName + "/" + accNumber,
        {
            method: "POST"
        });
}

async function ProcessPayment(balance, amount, accFrom, accNumber, reference, tag, date, accName, payToday) {
    /*
    Insert new payment into the Transaction Table/ Future Transaction Table
    then update the payer and payees balances in the Account Table in the database
     */

    if (balance > amount) {
        if (payToday) {
            //Inserts new record into Transaction Table
            await fetch("http://localhost:3000/insertTransaction/"
                + accFrom + "/" + accNumber + "/" + amount + "/" + reference + "/" + tag + "/" + date + "/" + accName,
                {
                    method: "POST"
                });
            //Add amount to account to
            await fetch("http://localhost:3000/updateAccountBalance/" + accNumber + "/" + amount,
                {
                    method: "POST"
                });
            //Deduct amount from account from
            let amountToDeduct = (amount) * (-1);
            await fetch("http://localhost:3000/updateAccountBalance/" + accFrom + "/" + amountToDeduct,
                {
                    method: "POST"
                });
        }
        else{
            //Inserts new record into FutureTransaction Table
            await fetch("http://localhost:3000/insertFutureTransaction/"
                + accFrom + "/" + accNumber + "/" + amount + "/" + reference + "/" + tag + "/" + date + "/" + accName,
                {
                    method: "POST"
                });
        }
    }
}


export {AddTag, DeleteTag, SetFavourite, ProcessPayment};