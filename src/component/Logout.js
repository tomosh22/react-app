import React from "react"
import {context} from "./App";
import {LogoutButton} from "./AuthButtons";

export class Logout extends React.Component{
    render(){
        return(
            <div>
                <context.Consumer>{({resetState,firstName}) => (
                    <div>
                        <p>firstname,{firstName}</p>
                        <button onClick={resetState}>Logout</button>
                        <LogoutButton />
                    </div>

                )}
                </context.Consumer>
            </div>
        )
    }


}
