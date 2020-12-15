import React from "react";

export class TransferToAccountConfirm extends React.Component{

    render() {
        return (
            <div>
                <h1>Review Details</h1>
                <p>From: <b>{this.props.state.accountFrom}</b></p>
                <p>To: <b>{this.props.state.accountTo}</b></p>
                <p>Amount: <b>{this.props.state.currency}{this.props.state.amount}</b></p>
                <button type="submit">Authorise payment</button><br />
                <button type="submit">Change details</button>
            </div>

        );
    }
}