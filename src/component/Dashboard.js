import React,{useContext} from "react";
import {context} from "./Home"
import {Link} from "react-router-dom";
import style from "../assets/css/homePageStyle.module.css";

export class Dashboard extends React.Component{
    render() {
        function Accounts(){
            const data = useContext(context);
            var accsArray = [];
            for(var x = 0; x < data.accounts.length;x++){
                accsArray.push(<p key={x}>{data.accounts[x].name}</p>)
            }
            return <div>{accsArray}</div>
        }
        return (
            <div>
                <h1>Dashboard</h1>
                <Accounts/>
                <div>
                    <Link to={"/create_account"}><button className={style.nav_link}>Create Account</button></Link>
                    <Link to={"/move_money"}><button className={style.nav_link}>Make Payment</button></Link>
                </div>
            </div>
        )
    }
}