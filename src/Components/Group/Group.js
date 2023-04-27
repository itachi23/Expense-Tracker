import React,{useState} from "react";
import { currencies } from "../../Services/currencyService";
import './Group.css'
function Group({group}){
    const [toggle,SetToggle] = useState(false)
    const handleToggle = () =>{
        SetToggle(!toggle)
    }
    return(
        <div className="group">
            <div onClick={handleToggle} className="group-header">
                {group.name}
                <span style={{float:"right"}}>{group.amount}</span>
            </div>
            {
                toggle? (
                <div className="group-body">
                    <div className="columns">
                        <div className="date-column">Date</div>
                        <div className="description-column">Description</div>
                        <div className="expense-column">Expense</div>
                    </div>
                    
                    {group.expenses.map((expense, index)=>{
                            return (<div className="expense" key = {index}>
                                <div className="expense-date">{expense.date}</div>
                                <div className="expense-description">{expense.description}</div>
                                <div className="expense-amount">{currencies[expense.currency_code]}{expense.amount}</div>
                            </div>)
                        })}
                    
                </div> ):null
            }
        </div>
    )
}
export default Group