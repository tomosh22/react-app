import React from "react"
import {context} from "./App";

export class Logout extends React.Component {

    render() {
        function click(resetState, history) {
            resetState();
            history.push("/login")
        }

        return (
            <div>
                <context.Consumer>{({resetState, firstName}) => (
                    <div>
                        <p>Are you sure you want to logout, {firstName}?<br/><br/>
                            You will need to log back in using 2FA.</p>
                        <button onClick={()=>click(resetState,this.props.history)}>Logout</button>
                    </div>

                )}
                </context.Consumer>
            </div>
        )
    }


}
