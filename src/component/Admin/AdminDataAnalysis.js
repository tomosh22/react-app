import React from "react";
import style from "../../assets/css/admin.module.css"

export class AdminDataAnalysis extends React.Component{

    async fillData() {
        await fetch("http://localhost:3000/getUserCount", {
            method: "GET"
        }).then(response => response.json()).then(data => {
            document.getElementById("users").innerText= data[0].userCount;
        })

        await fetch("http://localhost:3000/getTransactionCount", {
            method: "GET"
        }).then(response => response.json()).then(data => {
            document.getElementById("operations").innerText= data[0].transactionCount;
        })


    }

    render()
    {
        return(
            <div>
                <h1 className={style.header}>Data Analysis (There will appear statistics and analysis)</h1>

                <div className={style.dataHolder}>
                    <div className={style.data}>
                        <p>Operation count:</p><label id={"operations"}/>
                    </div>
                    <div className={style.data}>
                        <p>User count:</p><label id={"users"}/>
                    </div>
                    <br/>
                    <button style={{height: "2.8vh" }} onClick={() => this.fillData()}>Update Data</button>
                </div>
            </div>
        )
    }
}
