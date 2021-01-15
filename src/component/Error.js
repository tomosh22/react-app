import React from "react";

export class ErrorPage extends React.Component{
    render(){
        return(
            <div>
                <h2>ERROR 404</h2>
                <p>You are trying to access page which you do not have access or does not exist at all :( </p>
            </div>
        );
    }
}
