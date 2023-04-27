import React,{useState} from 'react'
import './Month.css'
import Group from '../Group/Group'

function Month({monthly_expense}){
    const [toggle,setToggle] = useState(false)
    const [expand,setExpand] = useState("")
    let groups = []
    const handleToggle = () =>{
        setToggle(!toggle)
        setExpand((state)=> state == ""? "expand" : "")
    }
   
    for(const group in monthly_expense.groups){
        let g = {}
        g['name'] = group
        g['expenses'] = monthly_expense.groups[group].expenses
        g['amount'] =  monthly_expense.groups[group].group_expense
        groups.push(g)
    }
    return(
        <div className='month-container'>
            {
                <>
                <div onClick={handleToggle} className='month'>
                    {monthly_expense.month_year}
                    <span>${monthly_expense.month_expense}</span>
                </div>
                
                {toggle && (
                    <div style={{transition:"2s ease-in"}}>
                        {groups.map((group)=>{return (<Group key ={group.name} group = {group}/>)})}
                    </div>
                )}
              </>
            }
        </div>    
    )
}
export default Month