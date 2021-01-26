import style from "../assets/css/homePageStyle.module.css";
import favicon from "../assets/images/favicon.ico";
import {Link, NavLink} from "react-router-dom";
import React, {useContext} from "react";
import {context} from "./App";

export class Header extends React.Component {
    render() {

        function LoginControl() {
            const data = useContext(context);
            if (!data.loggedIn) {
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

        return (
            <header>
                <div id={'head_container'} className={style.container}>
                    <div id={'inner_container'} className={style.header_inner}>
                        <div id={'logo_container'} className={style.logo}>
                            <a href={"/"} className={style.favicon_container}><img className={style.favicon}
                                                                                   src={favicon}
                                                                                   alt={"Transparent logo"}/></a>
                            <a href={"/"}>StuBank</a>
                        </div>
                        <nav id={'nav_container'} className={style.navigation_container}>
                            <NavLink to={"/dashboard"}>
                                <button className={style.nav_link}>Dashboard</button>
                            </NavLink>
                            <NavLink to={"/faq"}>
                                <button className={style.nav_link}>FAQ</button>
                            </NavLink>
                            <NavLink to={"/contactus"}>
                                <button className={style.nav_link}>Contact Us</button>
                            </NavLink>
                            <LoginControl/>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}
