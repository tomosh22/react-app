async function AddTag(tag, username) {
    //Insert new tag into the Tags table in the database

    await fetch("http://localhost:3002/setTag/"
        + username + "/" + tag,
        {
            method: "POST"
        })
}

async function DeleteTag(tag, username) {
    //Delete tag from the Tags table in the database

    await fetch("http://localhost:3002/deleteTag/"
        + username + "/" + tag,
        {
            method: "POST"
        })
}

async function SetFavourite(username, accName, accNumber) {
    //Insert new favourite into the Favourites Table in the database

    await fetch("http://localhost:3002/setFavouritePayees/" + username + "/" + accName + "/" + accNumber,
        {
            method: "POST"
        })
}

async function ProcessPayment(balance, amount, accFrom, accNumber, reference, tag, date, accName, payToday) {
    //Insert new payment into the Transaction Table
    //then update the payer and payees balances in the Account Table in the database

    if (balance > amount) {
        await fetch("http://localhost:3000/insertTransaction/"
            + accFrom + "/" + accNumber + "/" + amount + "/" + reference + "/" + tag + "/" + date + "/" + accName,
            {
                method: "POST"
            })
        if (payToday) {
            //ADD AMOUNT TO ACCOUNT TO
            await fetch("http://localhost:3000/updateAccountBalance/" + accNumber + "/" + amount,
                {
                    method: "POST"
                })
            //DEDUCT AMOUNT FROM ACCOUNT FROM
            let amountToDeduct = (amount) * (-1);
            await fetch("http://localhost:3000/updateAccountBalance/" + accFrom + "/" + amountToDeduct,
                {
                    method: "POST"
                })
        }
    }
}


export {AddTag, DeleteTag, SetFavourite, ProcessPayment};