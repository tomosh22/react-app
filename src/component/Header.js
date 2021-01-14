import style from "../assets/css/homePageStyle.module.css";
import favicon from "../assets/images/favicon.ico";
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {context} from "./App";

export class Header extends React.Component{
    render() {

        function LoginControl(){
            const data = useContext(context);
            if(!data.loggedIn){
                return <>
                    <Link to={"/login"}><button className={style.nav_link}>Log in</button></Link>
                    <Link to={"/signup"}><button className={style.nav_link}>Sign up</button></Link>
                </>
            }
            else{
                return <Link to={"/logout"}><button className={style.nav_link}>Log out</button></Link>
            }
        }

        return(
            <header>
                <div className={style.container}>
                    <div className={style.header_inner}>
                        <div className={style.logo}>
                            <img className={style.favicon} src={favicon} alt={"Transparent logo"}/>
                            <a  href={"/"}>StuBank</a>
                        </div>
                        <nav>
                            <Link to={"/dashboard"}><button className={style.nav_link}>Dashboard</button></Link>
                            <Link to={"/move_money"}><button className={style.nav_link}>Move Money</button></Link>
                            <LoginControl/>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}
