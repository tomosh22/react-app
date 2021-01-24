import React from 'react';
import ReactDOM from 'react-dom';

import {App} from "./component/App";
import {Auth0Provider} from "@auth0/auth0-react";

//If you are using a custom domain with Auth0, the value of the domain property is the value of your custom domain instead of the value reflected in the "Settings" tab.


ReactDOM.render(
    <Auth0Provider
        domain="stubank.eu.auth0.com"
        clientId="CcraZC8bm9LjsifsGXEBuI6FmSwYqOiv"
        redirectUri={window.location.origin}
        >

        <App />
    </Auth0Provider>,
    document.getElementById('root'));
