import React from "react";

export class SignUp extends React.Component{
    render(){
        return (
            <div>
                 <h1>Sign Up</h1>
                 <form action="SignUp" id="signUpForm" method="post">
                    <label htmlFor="username">Username: </label><br></br>
                    <input type="text" id="username" name="username"></input><br></br><br></br>

                    <label htmlFor="password">Password: </label><br></br>
                    <input type="text" id="password" name="password"></input><br></br><br></br>

                    <label htmlFor="email">Email: </label><br></br>
                    <input type="text" id="email" name="email"></input><br></br><br></br>

                    <label htmlFor="firstName">First Name: </label><br></br>
                    <input type="text" id="firstName" name="firstName"></input><br></br><br></br>

                    <label htmlFor="lastName">Last Name: </label><br></br>
                    <input type="text" id="lastName" name="lastName"></input><br></br><br></br>

                    <label htmlFor="address1">Address Line 1: </label><br></br>
                    <input type="text" id="address1" name="address1"></input><br></br><br></br>

                    <label htmlFor="address2">Address Line 2: </label><br></br>
                    <input type="text" id="address2" name="address2"></input><br></br><br></br>

                    <label htmlFor="postcode">Postcode: </label><br></br>
                    <input type="text" id="postcode" name="postcode"></input><br></br><br></br>

                    <button type="button" onClick="SignUpUser()" formAction="">Submit</button>
                 </form>
            </div>

        );
    }
}
