function GetDateAndMinutes () {
    //Returns current date and time
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs =date.getSeconds();

    if(dd<10) {
        dd="0" +dd;
    }
    if(mm<10) {
        mm="0" +mm;
    }
    if(mins<10) {
        mins="0" +mins;
    }
    if(secs<10) {
        secs="0" +secs;
    }
    if(hours<10) {
        hours="0" +hours;
    }
    let time = hours+":"+mins+":"+secs;
    date = yyyy+"-"+mm+"-"+dd+" "+time;
    return(date);
}

function GetDate () {
    //Returns current date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();

    if(dd<10) {
        dd="0" +dd;
    }
    if(mm<10) {
        mm="0" +mm;
    }

    date = yyyy+"-"+mm+"-"+dd;
    return(date);
}

function currencyConverter(currencyFrom,currencyTo,amount){
    //Returns the new amount corresponding to the currency of the users account
    let GBRtoUSD=1.37;
    let GBRtoEUR=1.12;
    let USDtoEUR=0.82;
    let USDtoGBR=(1/GBRtoUSD);
    let EURtoGBR=(1/GBRtoEUR);
    let EURtoUSD=(1/USDtoEUR);

    let newAmount=0;

    if (currencyFrom!==currencyTo){
        if (currencyFrom==="£"){
            if (currencyTo==="$"){newAmount=(amount*GBRtoUSD).toFixed(2)}
            else if (currencyTo==="€"){newAmount=(amount*GBRtoEUR).toFixed(2)}
        }
        else if (currencyFrom==="$"){
            if (currencyTo==="£"){newAmount=(amount*USDtoGBR).toFixed(2)}
            else if (currencyTo==="€"){newAmount=(amount*USDtoEUR).toFixed(2)}
        }
        else if (currencyFrom==="€"){
            if (currencyTo==="$"){newAmount=(amount*EURtoUSD).toFixed(2)}
            else if (currencyTo==="£"){newAmount=(amount*EURtoGBR).toFixed(2)}
        }
    }
    return(newAmount);

}
export {GetDate, GetDateAndMinutes,currencyConverter};