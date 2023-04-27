export const currencies = {}
export const getSupportedCurrencies = (url) =>{
    fetch(url)
        .then((response) => response.json())
        .then((data)=>{
            parseCurrencies(data.currencies)
           // console.log(currencies)
        })
}
const parseCurrencies = (items) =>{
    items.forEach(item => {
        currencies[item.currency_code] = item.unit
    });
}
