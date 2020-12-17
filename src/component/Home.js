import React from "react";

export const context = React.createContext()
export class Home extends React.Component{
    render(){
        return(
            <div>
                <h1>Welcome to StuBank</h1>
            </div>
        );
    }
}
