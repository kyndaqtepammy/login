import axios from "../../../server/node_modules/axios"
import BASE_URL from "./Constants"

export const byterritory = territory => {
    return axios
    .post(BASE_URL + '/byterritory', {
        territory: territory.name,
        message: territory.message
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}


export const targetsms = fields => {
    return axios 
    .post(BASE_URL + '/targetsms', {
        query: fields.query,
        param: fields.param,
        message: fields.message
    })
    .then(res=> {
        return res.data
    })
    .catch(err=> {
        console.log(err);
        
    })
}


export const trades = () =>{
    return axios
        .get(BASE_URL +'/trades')
        .then(res => {
            //console.log(res.data.members)
            return res.data
            
        })
        .catch(err => {
            console.log(err)
        })
}