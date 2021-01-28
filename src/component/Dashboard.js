//written by Tom O'Shaughnessy
import React, {useContext, useState} from "react";
import {context} from "./App"
import {Link} from "react-router-dom";
import style from "../assets/css/homePageStyle.module.css";
import Chart from "react-google-charts"


export class Dashboard extends React.Component {
    //chartType can be either balances or expenditure
    state = {
        chartType: "balances",

        //-1 if not displaying any given account
        // otherwise account number of displayed account
        display: -1
    }

    //returns data for chart of all the user's account's balances
    getBalances(accounts) {
        // chart headers
        const data = [["Account Name", "Balance"]]

        for (var x of accounts) {
            data.push([x.name.concat(": ", x.currency, x.balance), x.balance])
        }
        //console.log(data)
        return data
    }

    //returns data for chart of all the user's transactions
    getExpenditure(transactions, vendors) {
        //chart headers
        let data = [["Category", "Amount"]]

        for (var x of transactions) {
            let found = false;
            let vendorExists = false;
            if (vendors[x.accNumberTo]) {
                vendorExists = true
            }

            //deciding what to use for category of transaction
            //if a tag is provided that is used
            //if there is no tag but the recipient is in vendors table the category of that vendor is used
            //otherwise category is Unknown

            //if transaction has associated tag
            if (x.tag) {
                for (var y of data) {

                    if (y[0] == x.tag) {
                        y[1] += x.amount
                        found = true
                        break;
                    }
                }
                if (!found) {
                    data.push([x.tag, x.amount])
                }
            } else if (vendorExists) {
                for (var y of data) {

                    if (y[0] === vendors[x.accNumberTo].category) {
                        y[1] += x.amount
                        found = true
                        break;
                    }
                }
                if (!found) {
                    data.push([vendors[x.accNumberTo].category, x.amount])
                }
            } else {
                //unknown category
                for (var y of data) {

                    if (y[0] === "Unknown") {
                        y[1] += x.amount
                        found = true
                        break;
                    }
                }
                if (!found) {
                    data.push(["Unknown", x.amount])
                }
            }

        }

        return data
    }

    //called when user changes chart type from drowndown
    handleChange(event) {
        this.setState({chartType: event.target.value})

    }

    //gets all transactions from one specific account
    getAccountTransactions(accNumber, allTransactions) {
        const transactions = [];
        for (var x of allTransactions) {
            if (x.accNumberFrom == accNumber) {
                transactions.push(x)
            }
        }

        return transactions
    }

    render() {

        //renders all user accounts with onclick changing state.display
        function Accounts(props) {
            const data = useContext(context);
            var accsArray = [];
            for (var x = 0; x < data.accounts.length; x++) {
                //accsArray.push(<p key={data.accounts[x].accNumber}>{data.accounts[x].name}</p>)

                accsArray.push(<p onClick={(e) => props.setState({display: e.target.id})}
                                  key={data.accounts[x].accNumber}
                                  id={data.accounts[x].accNumber}>{data.accounts[x].name}</p>)
            }
            return <div>{accsArray}</div>
        }

        //renders chart on main dashboard page
        function DashBoardChart(props) {
            const chartType = props.state.chartType

            console.log(chartType)
            if (chartType === "balances") {
                const data = props.getBalances(props.accounts);
                return <Chart
                    //width={'100%'}
                    //height={'300px'}

                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        backgroundColor: {fill: "transparent"},
                        fontSize: 12,
                        legend: {position: "right", maxLines: 99},
                        chartArea: {width: "100%", height: "50%"},
                        width: "100%",
                        height: "300px"

                    }}
                />
            } else if (chartType === "expenditure") {
                const data = props.getExpenditure(props.transactions, props.vendors);
                return <Chart
                    //width={'100%'}
                    //height={'300px'}

                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        backgroundColor: {fill: "transparent"},
                        fontSize: 12,
                        legend: {position: "right", maxLines: 99},
                        chartArea: {width: "100%", height: "50%"},
                        width: "100%",
                        height: "300px"

                    }}
                />
            }
        }

        //main dashboard page
        if (this.state.display === -1) {
            return (

                <context.Consumer>{({accounts, transactions, vendors}) => (
                    <div>
                        <h1>Dashboard</h1>
                        <select onChange={event => this.handleChange(event)}>
                            <option value={"balances"}>Balances</option>
                            <option value={"expenditure"}>Expenditure</option>
                        </select>
                        <DashBoardChart state={this.state} accounts={accounts}
                                        getBalances={(accounts) => this.getBalances(accounts)}
                                        transactions={transactions}
                                        getExpenditure={((transactions, vendors) => this.getExpenditure(transactions, vendors))}
                                        vendors={vendors}
                        />
                        <Accounts setState={(state) => this.setState(state)}/>
                        <div>
                            <Link to={"/create_account"}>
                                <button className={style.main}>Create Account</button>
                            </Link>
                            <Link to={"/move_money"}>
                                <button className={style.main}>Make Payment</button>
                            </Link>
                        </div>
                    </div>
                )}
                </context.Consumer>
            )
        }
        //state.display is account number, account view instead of dashboard home page
        else {
            let account = null;
            const accounts = this.props.accounts

            for (var x of accounts) {
                if (x.accNumber == this.state.display) {
                    account = x;
                }
            }

            //generating table of account transactions
            let fields = []
            let tableRows = []
            fields.push(<td className={style.dashboardTable}>Amount</td>)
            fields.push(<td className={style.dashboardTable}>Time</td>)
            fields.push(<td className={style.dashboardTable}>Name of Recipient</td>)
            fields.push(<td className={style.dashboardTable}>Account Number of Recipient</td>)
            fields.push(<td className={style.dashboardTable}>Reference</td>)
            tableRows.push(<tr key={-1}>{fields}</tr>)

            for (var x of this.getAccountTransactions(account.accNumber, this.props.transactions)) {
                fields = []
                fields.push(<td className={style.dashboardTable}>{account.currency + x.amount}</td>)
                fields.push(<td className={style.dashboardTable}>{x.dateTime}</td>)
                fields.push(<td className={style.dashboardTable}>{x.nameTo}</td>)
                fields.push(<td className={style.dashboardTable}>{x.accNumberTo}</td>)
                fields.push(<td className={style.dashboardTable}>{x.reference}</td>)
                tableRows.push(<tr key={x.id}>{fields}</tr>)
            }


            return (
                <context.Consumer>{({vendors, transactions}) => (
                    <div>
                        <h1>Dashboard</h1>
                        <p>{account.name}</p>
                        <DashBoardChart
                            //manually overriding state so i dont have to change the chart component
                            state={{chartType: "expenditure"}}
                            transactions={this.getAccountTransactions(account.accNumber, transactions)}
                            vendors={vendors}
                            getExpenditure={(transactions, vendors) => this.getExpenditure(transactions, vendors)}
                        />
                        <table className={style.dashboardTable}>
                            <tbody className={style.dashboardTable}>{tableRows}</tbody>
                        </table>
                        <br/>
                        <button onClick={() => this.setState({display: -1})}>Back to Dashboard</button>
                        <div>
                            <Link to={"/create_account"}>
                                <button className={style.navLink}>Create Account</button>
                            </Link>
                            <Link to={"/move_money"}>
                                <button className={style.navLink}>Make Payment</button>
                            </Link>
                        </div>
                    </div>
                )}
                </context.Consumer>
            )
        }
    }
}
