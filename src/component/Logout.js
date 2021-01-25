import React from "react"
import {context} from "./App";
export class Logout extends React.Component{
    render(){
        return(
            <div>
                <context.Consumer>{({resetState,firstName}) => (
                    <div>
                        <p>firstname,{firstName}</p>
                        <button onClick={resetState}>Logout</button>
                    </div>

                )}
                </context.Consumer>
            </div>
        )
    }


}
