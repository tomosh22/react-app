import React,{useContext,useState} from "react";
import {context} from "./App"
import {Link} from "react-router-dom";
import style from "../assets/css/homePageStyle.module.css";
import Chart from "react-google-charts"




export class Dashboard extends React.Component{
    state = {
        chartType:"balances"
    }
    getBalances(accounts){
        const data = [["Account Name","Balance"]]
        for(var x of accounts){
            data.push([x.name.concat(": ",x.currency,x.balance),x.balance])
        }
        //console.log(data)
        return data
    }
    getExpenditure(transactions,vendors){
        console.log(transactions)
        console.log(vendors)
        let data = [["Category","Amount"]]

        for(var x of transactions){
            let found = false;
            //console.log("category: ",vendors[x.accNumberTo].category)
            console.log("hi")

            for (var y of data){

                if(y[0] === vendors[x.accNumberTo].category){
                    y[1] += x.amount
                    found = true
                    break;
                }
            }
            if(!found){
                data.push([vendors[x.accNumberTo].category,x.amount])
            }
        }
        console.log(data)
        return data
    }
    handleChange(event){
        //console.log("value",event.target.value)
        this.setState({chartType:event.target.value})
        console.log(this.state.chartType)
    }
    render() {


        function Accounts(){
            const data = useContext(context);
            var accsArray = [];
            for(var x = 0; x < data.accounts.length;x++){
                accsArray.push(<p key={x}>{data.accounts[x].name}</p>)
            }
            return <div>{accsArray}</div>
        }
        function DashBoardChart(props){
            const chartType = props.state.chartType

            console.log(chartType)
            if (chartType === "balances"){
                const data = props.getBalances(props.accounts);
                return <Chart
                    //width={'100%'}
                    //height={'300px'}

                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        backgroundColor: {fill:"transparent"},
                        fontSize:12,
                        legend: {position:"right",maxLines:99},
                        chartArea:{width:"100%",height:"50%"},
                        width:"100%",
                        height:"300px"

                    }}
                />
            }
            else if(chartType === "expenditure"){
                const data = props.getExpenditure(props.transactions,props.vendors);
                return <Chart
                    //width={'100%'}
                    //height={'300px'}

                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        backgroundColor: {fill:"transparent"},
                        fontSize:12,
                        legend: {position:"right",maxLines:99},
                        chartArea:{width:"100%",height:"50%"},
                        width:"100%",
                        height:"300px"

                    }}
                />
            }
        }

        return (

            <context.Consumer>{({accounts,transactions,vendors}) => (
                <div>
                <h1>Dashboard</h1>
                    <select onChange={event => this.handleChange(event)}>
                        <option value={"balances"}>Balances</option>
                        <option value={"expenditure"}>Expenditure</option>
                    </select>
                <DashBoardChart state = {this.state} accounts = {accounts}
                                getBalances={(accounts) => this.getBalances(accounts)}
                                transactions = {transactions}
                                getExpenditure = {((transactions,vendors) => this.getExpenditure(transactions,vendors))}
                                vendors = {vendors}
                />
                <Accounts/>
                <div>
                    <Link to={"/create_account"}><button className={style.nav_link}>Create Account</button></Link>
                    <Link to={"/move_money"}><button className={style.nav_link}>Make Payment</button></Link>
                </div>
            </div>
            )}
            </context.Consumer>
        )
    }
}
