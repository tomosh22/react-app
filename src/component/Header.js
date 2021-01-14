import React from "react";
import {Link} from "react-router-dom";
import favicon from '../assets/images/favicon.ico';
import style from "../assets/css/homePageStyle.module.css";

export const context = React.createContext()
export class Header extends React.Component{
    render(){
        return(
            <div>
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
                                <Link to={"/login"}><button className={style.nav_link}>Log in</button></Link>
                                <Link to={"/signup"}><button className={style.nav_link}>Sign up</button></Link>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
