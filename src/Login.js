import React from "react";

function Login(){
    return(
        <div>
            <h1>Login</h1>
            <form action="Login" id="LoginForm" method="post">
                <label htmlFor="username">Username: </label><br></br>
                <input type="text" id="username" name="username"></input><br></br><br></br>

                <label htmlFor="password">Password: </label><br></br>
                <input type="text" id="password" name="password"></input><br></br><br></br>

                <button type="button" onClick="LoginUser()" formAction="">Submit</button>
            </form>
        </div>

    );
}

export default Login;