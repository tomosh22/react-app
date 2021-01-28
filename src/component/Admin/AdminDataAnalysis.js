import React from "react";
import style from "../../assets/css/admin.module.css"

export class AdminDataAnalysis extends React.Component{
    // todo: get `user amount` and `transaction count`
    constructor(props) {
        super(props);
        this.state = {
            operationCount: 21,
            userNumber: 1,
        };

    }

    render()
    {
        return(
            <div>
                <h1 className={style.header}>Data Analysis (There will appear statistics and analysis)</h1>

                <div className={style.dataHolder}>
                    <div className={style.data}>
                        <p>Operation count:</p><p>{this.state.operationCount}</p>
                    </div>
                    <div className={style.data}>
                        <p>User count:</p><p>{this.state.userNumber}</p>
                    </div>
                </div>
            </div>
        )
    }
}
