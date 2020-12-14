import React from "react";

export class TransferToUserConfirm extends React.Component{

    render() {
        return (
            <div>
                <h1>Review Details</h1>
                <p>From:<b>{this.props.state.accFrom}</b></p>
                <p>Payee:<b>{this.props.state.accName}</b></p>
                <p>Payee Details: <b>{this.props.state.sortCode}   {this.props.state.accNumber}</b></p>
                <p>Amount:<b>{this.props.state.currency}{this.props.state.amount}</b></p>
                <p>Reference:<b>{this.props.state.reference}</b></p>
                <button type="submit">Authorise payment</button><br />
                <button type="submit">Change details</button>
            </div>

        );
    }
}
