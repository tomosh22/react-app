import React,{useContext} from "react";
import {context} from "./App"
import {Link} from "react-router-dom";
import style from "../assets/css/homePageStyle.module.css";
import Chart from "react-google-charts"




export class Dashboard extends React.Component{
    getChartData(accounts){
        const data = [["Account Name","Balance"]]
        for(var x of accounts){
            data.push([x.name,x.balance])
        }
        console.log(data)
        return data
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
        return (

            <context.Consumer>{({accounts}) => (

                <div>
                <h1>Dashboard</h1>
                <Chart
                    //width={'500px'}
                    //height={'300px'}

                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={this.getChartData(accounts)}
                    options={{
                        title: 'Account Balances',
                        backgroundColor: {fill:"transparent"}
                    }}
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
