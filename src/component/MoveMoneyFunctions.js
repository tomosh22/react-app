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
export {GetDate, GetDateAndMinutes};