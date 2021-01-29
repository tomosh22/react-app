import style from "../assets/css/homePageStyle.module.css";
import favicon from "../assets/images/favicon.ico";
import {Link, NavLink} from "react-router-dom";
import React, {useContext} from "react";
import {context} from "./App";

/*
*       Created by Jevgenij Guzikovskij
*       This component is a main header and navigation of the application across all the pages.
* */
export class Header extends React.Component {
    render() {

        function LoginControl() {
            const data = useContext(context);
            if (!data.loggedIn) {
                return <>
                    <Link to={"/login"}>
                        <button className={style.navLink}>Log in</button>
                    </Link>
                    <Link to={"/signup"}>
                        <button className={style.navLink}>Sign up</button>
                    </Link>
                </>
            } else {
                return <Link to={"/logout"}>
                    <button className={style.navLink}>Log out</button>
                </Link>
            }
        }

        return (
            <header>
                <div id={'head_container'} className={style.container}>
                    <div id={'inner_container'} className={style.headerInner}>
                        <div id={'logo_container'} className={style.logo}>
                            <a href={"/"} className={style.faviconContainer}><img className={style.favicon}
                                                                                  src={favicon}
                                                                                  alt={"Transparent logo"}/></a>
                            <a href={"/"}>StuBank</a>
                        </div>
                        <nav id={'nav_container'} className={style.navigationContainer}>
                            <NavLink to={"/dashboard"}>
                                <button className={style.navLink}>Dashboard</button>
                            </NavLink>
                            <NavLink to={"/faq"}>
                                <button className={style.navLink}>FAQ</button>
                            </NavLink>
                            <NavLink to={"/contactus"}>
                                <button className={style.navLink}>Contact Us</button>
                            </NavLink>
                            <LoginControl/>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}
