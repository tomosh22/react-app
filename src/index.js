import React from 'react';
import ReactDOM from 'react-dom';
import {Home} from "./component/Home"
import {SignUp} from "./component/SignUp"
import {MoveMoney} from "./component/MoveMoney"
import {CreateAccount} from "./component/CreateAccount";
import {Login} from "./component/Login";


class App extends React.Component{
    render(){
        return(
            <div>
                <Home/>
            </div>
        );
    }
}

ReactDOM.render(<Login />, document.getElementById('root'));