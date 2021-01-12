import React,{useContext} from "react";
import {context} from "./Home"
function Accounts(){
    var accsArray;
    for(var x of useContext(context).accounts){
        accsArray.push(<p>x.name</p>)
    }
    return <div>{accsArray}</div>
}
export class Dashboard extends React.Component{
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <Accounts/>
            </div>
        )
    }
}