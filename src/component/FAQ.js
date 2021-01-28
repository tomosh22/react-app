import React from "react";

/*
Created by Joel Tierney
React Component containing Frequency Asked Questions page.
*/
export class FAQ extends React.Component {
    render() {
        return (
            <div>
                <h1>Frequently Asked Questions</h1>

                <h3>How do I signup?</h3>
                <p>Use the navigation bar at the top of your screen. If you are on mobile,
                    scroll along the navigation bar to access the signup button. After
                    filling in all of the appropriate information, please use the Google
                    Authenticator app on your phone to scan the QR Code. Alternatively, if
                    on mobile, copy and paste the key provided into the app.
                </p>

                <h3>How do I log in?</h3>
                <p>Use the navigation bar at the top of your screen. If you are on mobile,
                    scroll along the navigation bar to access the log in button.
                    2 Factor Authentication (2FA) is used as an extra layer of security
                    for your StuBank banking account, and it is required at all times when logging in.
                    After filling in your username and password, please use the Google Authenticator
                    app on your phone to retrieve the 6 digit code in order to log in.
                </p>

                <h3>How do I create an account?</h3>
                <p>You first must signup for a StuBank account or login
                    to your existing one. Navigate to Dashboard > Create Account. Select your desired
                    account type, currency and name. You cannot have duplicate account names under a single user.
                </p>

                <h3>How do I move money?</h3>
                <p>You first must signup for a StuBank account or login
                    to your existing one. Navigate to Dashboard > Move Money. Select whether you would
                    like to transfer money to someone else or one of your accounts, and then fill in
                    the appropriate information. You must have created an account using
                    Dashboard > Create Account before attempting to move money.
                </p>

                <h3>Why can't I access my Dashboard?</h3>
                <p>Before accessing your dashboard, which enables you to move money, create
                    accounts and pay others, you first must signup for a StuBank account or login
                    to your existing one.
                </p>

                <h3>How do I edit my StuBank account information?</h3>
                <p>Please use the Contact Us form (accessible via the navigation bar
                    at the top of your screen) in order to notify the StuBank team
                    you would like to modify your information on record.
                    After verifying your identity, the changes you have requested will be
                    made within 24 hours.
                </p>

                <h3>How do I delete my StuBank account?</h3>
                <p>Please use the Contact Us form (accessible via the navigation bar
                    at the top of your screen) in order to notify the StuBank team
                    you would like to delete your information from our records.
                    After verifying your identity, any remaining funds will be transferred
                    to a third party banking account of your choosing.
                </p>

                <h3>What do I do if I have a question or issue that isn't addressed here?</h3>
                <p>Please use the Contact Us form (accessible via the navigation bar
                    at the top of your screen) at any time and the StuBank team will be happy to help!</p>
            </div>
        );
    }
}
