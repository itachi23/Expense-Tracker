import React,{useEffect, useState} from 'react'
import './Dashboard.css'
import Month from '../Month/Month';
import { userExpensesURL, userURL,userGroupsURL,currenciesURL } from "../../Urls"
import { getData } from '../../Services/userInfoService';
import { parseUserData, parseGroupData, aggregateExpensesByMonthAndYear } from '../../Services/dataParsingService';
import { getSupportedCurrencies } from '../../Services/currencyService';
function Dashboard(){
    let [user,setUser] = useState({});
    let [text,setText] = useState();
    let [expensesByMonthAndYear, setExpensesByMonthAndYear] = useState({});
    const expenses = []
    let groups = {}
    let name = ""
    const getUserData = async () =>{

            getSupportedCurrencies(currenciesURL)

            await getData(userURL)
                        .then((response) =>{
                            console.log(response)
                            return response.json()} )
                        .then((data) => {
                                            let u = parseUserData(data.user)
                                            //console.log(u)
                                            setUser(u)
                                            
                                        })
                        .catch((error) => console.log(error))
                           
            await getData(userGroupsURL)
                        .then((response) => response.json())
                        .then((data) => {
                                            groups = parseGroupData(data.groups)
                                           // console.log(groups)
                                        })
                        .catch((error) => console.log(error))                      
            await getData(userExpensesURL)
                        .then((response) => response.json())
                        .then((data) => {
                                            let e = aggregateExpensesByMonthAndYear(data.expenses, groups)
                                            //console.log(e)
                                            setExpensesByMonthAndYear(e)
                                            
                                        })
                        .catch((error) => console.log(error))
    }
    
    useEffect( ()=>{getUserData()},[])

    const handleInputChange = (event) =>{
        setText(event.target.value)
    }
    
    for(const monthAndYear in expensesByMonthAndYear){
        expensesByMonthAndYear[monthAndYear]['month_year'] = monthAndYear
        expenses.push(expensesByMonthAndYear[monthAndYear])
    }
    return(
        <div className='dashboard'>
            <div className='user'>
                <div className='background'></div>
                <img src={user.image}/> 
                <div className='user-name'>
                    {user.first_name} {user.last_name}
                </div>
            </div> 
            <div className='expenses'>
                <div className='input'>
                    <input type="text" placeholder='please enter valid api key' className='textbox' onChange={handleInputChange}/>
                    <span>
                        <button className='submit-btn'>submit</button>
                    </span>
                </div>
                <div className='month-component'>
                {
                    expenses.map(expense => {
                        
                        return (<Month key={expense.month_year} monthly_expense={expense}/>)
                    })
                }
                </div>
            </div>
            <div className='stats'>
                <div className='group-averages'>
                    <div className='avg-heading'>
                        Group Averages
                    </div>
                    <div className='grp-item'>
                    </div>
                </div>
                <div className='group-totals'>
                    <div className='total-heading'>
                    </div>
                    <div className='total-item'>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard