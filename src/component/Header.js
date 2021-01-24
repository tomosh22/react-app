import style from "../assets/css/homePageStyle.module.css";
import favicon from "../assets/images/favicon.ico";
import {Link} from "react-router-dom";
import React from "react";
import {useAuth0} from "@auth0/auth0-react";


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
                <div className={style.container}>
                    <div className={style.header_inner}>
                        <div className={style.logo}>
                            <a  href={"/"}><img className={style.favicon} src={favicon} alt={"Transparent logo"}/></a>
                            <a  href={"/"}>StuBank</a>
                        </div>
                        <nav>
                            <Link to={"/dashboard"}><button className={style.nav_link}>Dashboard</button></Link>
                            <LoginControl/>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}
