const u = {}
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const creation_method = new Set(["payment"])

export const aggregateExpensesByMonthAndYear = (expenses, g) => {
    console.log(g)
    const expensesByMonthAndYear = {}
    expenses.sort((a,b)=>new Date(b.date) - new Date(a.date))
    expenses.forEach((expense)=>{
        if(!isValidExpense(expense)){
            return
        }
        const date = new Date(expense.date);
        const month_year = months[date.getMonth()] +" "+date.getFullYear();
        if(!(month_year in expensesByMonthAndYear)){
            expensesByMonthAndYear[month_year] = {}
            expensesByMonthAndYear[month_year]['groups'] = {}
            expensesByMonthAndYear[month_year]['month_expense'] = 0
        }
        if(expense.group_id == null){
            expense.group_id = 0
        }
        if(!(g[expense.group_id] in expensesByMonthAndYear[month_year]['groups'])){         
            expensesByMonthAndYear[month_year]['groups'][g[expense.group_id]] = {}
            expensesByMonthAndYear[month_year]['groups'][g[expense.group_id]]['expenses'] = []
            expensesByMonthAndYear[month_year]['groups'][g[expense.group_id]]['group_expense'] = 0
        }
        const expense_item = fetchExpenseInfo(expense);
        expensesByMonthAndYear[month_year]['groups'][g[expense.group_id]]['expenses'].push(expense_item);
        let curr_amount = expensesByMonthAndYear[month_year]['groups'][g[expense.group_id]]['group_expense']
        curr_amount = parseFloat((curr_amount + expense_item.amount).toFixed(2))
        expensesByMonthAndYear[month_year]['groups'][g[expense.group_id]]['group_expense'] = curr_amount
        expensesByMonthAndYear[month_year]['month_expense'] = updateMonthExpense(expensesByMonthAndYear[month_year]['groups']) 
    })
   // console.log(expensesByMonthAndYear)
    return expensesByMonthAndYear
}

const isValidExpense = (expense) =>{
    if(creation_method.has(expense.creation_method) || expense.deleted_at !=null){
        return false;
    } 
    const user_share = expense.users.filter((user) => user.user_id == u.id)
    if(user_share.length == 0){
        return false;
    }
    else if(user_share[0].owed_share == "0.0"){
        return false;
    }
    return true;
}

const fetchExpenseInfo = (expense) =>{
    const  e = {}
    const date = new Date(expense.date);
    const month_day = months[date.getMonth()] +" "+date.getDate();
    e["date"] = month_day
    e["description"] = expense.description
    e["amount"] = parseFloat(expense.users.filter((user) => user.user_id == u.id)[0].owed_share)
    e["currency_code"] = expense.currency_code
    return e;
}

const updateMonthExpense = (groups) =>{
    let month_expense = 0
    for(const group in groups){
        month_expense = parseFloat((month_expense + groups[group].group_expense).toFixed(2))
    }
    return month_expense
}

export const parseUserData = (user) =>{
    u.id = user.id;
    u.first_name = user.first_name;
    u.last_name = user.last_name;
    u.image = user.picture.small
   // console.log(u)
    return u; 
}

export const parseGroupData = (groups) =>{
    const g = {}
    groups.forEach(group => {
        g[group.id] = group.name
    })
   // console.log(g)
    return g
}

// export const getAverage = (expensesByMonthAndYear) =>{
//     let sum = 0
//     let average = {}
//     for(month in expensesByMonthAndYear){
        
//     }
// }