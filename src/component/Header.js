import style from "../assets/css/homePageStyle.module.css";
import favicon from "../assets/images/favicon.ico";
import {useAuth0} from "@auth0/auth0-react";
import {Link, NavLink} from "react-router-dom";
import React, {useContext} from "react";
import {context} from "./App";


const LoginControl = () =>{

    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading){
        //todo: Add loading spinner
    }
    if (!isAuthenticated) {
        return <>
            <Link to={"/login"}>
                <button className={style.nav_link}>Log in</button>
            </Link>
            <Link to={"/signup"}>
                <button className={style.nav_link}>Sign up</button>
            </Link>
        </>
    } else {
        return <Link to={"/logout"}>
            <button className={style.nav_link}>Log out</button>
        </Link>
    }
}
export class Header extends React.Component{

    render() {
        return(
            <header>
                <div id={'head_container'} className={style.container}>
                    <div id={'inner_container'} className={style.header_inner}>
                        <div id={'logo_container'} className={style.logo}>
                            <a  href={"/"} className={style.favicon_container}><img className={style.favicon} src={favicon} alt={"Transparent logo"}/></a>
                            <a  href={"/"}>StuBank</a>
                        </div>
                        <nav id={'nav_container'} className={style.navigation_container}>
                            <NavLink to={"/dashboard"} ><button className={style.nav_link}>Dashboard</button></NavLink>
                            <LoginControl/>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}
