import { API_KEY } from "../Config"

const headers = {
    'Authorization' : 'Bearer '.concat(API_KEY),
    'Access-Control-Allow-Origin': '*',
}

export const getData = (url)=>{
   return  fetch(url,{
          headers:headers,
          method:'GET'
        })
        
}
