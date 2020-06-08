import axios from 'axios'
import BASE_URL from './Constants'


export const editTerritory = territory => {
   return axios
   .post(BASE_URL + '/editTerritory', {
       name: territory.name,
       id: territory.id
   }) 
   .then(res => {
       return res.data;
   })
   .catch(err => {
       console.log(err);
   })
}

export const addterritory = territory=> {
    return axios
    .post(BASE_URL+'/addterritory', {
        territory: territory.name
    })
    .then(res =>{
        return res.data
    })
    .catch(err =>{
        console.log(err);
    })
}
// export const addmember = member => {
//     return axios
//         .post( BASE_URL+'/addmember', {
//             name: member.name,
//             id_number: member.id_number,
//             territory: member.territory,
//             contact: member.contact,
//             date_of_birth: member.date_of_birth,
//             gender: member.gender,
//             trade: member.trade,
//             email: member.email,
//             amount_paid: member.amount_paid, 
//         })
//         .then(res => {
//             //console.log(res.config)
//             return res.config
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }
export const deletemultiple = (members) => {
    return axios
    .post(BASE_URL+'/deletemultiple', {
        ids: members.ids
    })
    .then(res=> {
        //console.log(res);
       return res.data; 
    })
    .catch(err => {
        console.log(err);
        
    })
}


export const notifications = () => {
    return axios
    .get(BASE_URL + '/notifications')
    .then(res=>{
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}


export  const reports = () => {
    return axios
        .get(BASE_URL +'/reports')
        .then(res => {
            //console.log(res.data.members)
            return res.data
            
        })
        .catch(err => {
            console.log(err)
        })
}

export const edituser = member => {
    return axios
    .post(BASE_URL +'/edituser')
    .then(res => {
        //console.log(res.data.members)
        return res.data
        
    })
    .catch(err => {
        console.log(err)
    })
}


// export const editmember = (contentType, data) => {   
//     return axios.post( BASE_URL+'/editmember', {
//          data: data, 
//          headers: {'Content-Type': contentType}
//         ).then((res) => {
//         console.log("DATAAAA"+data.getAll("id"))
//           return res.data
//         }).catch((error) => {
//         console.log(error);
//     })

// }

export const deleteterritory = territory => {
    return axios
    .post(BASE_URL + '/deleteterritory', {
        id: territory.id
    })
    .then(res => {
        return res.data;
       // console.log(res);
        
    })
    .catch(err => {
        console.log(err);
        
    });
}


export const deletemember = member => {
    return axios
    .post(BASE_URL + '/deletemember', {
        id_number: member.id_number
    }).then(res => {
        console.log(res.data);
                
        return res.data
    })
    .catch(err => {
        console.log(err);
        
        return {
            "code": 400,
            "status": err,
            "message": "Network Error",
            "error": true
        } 
    })
}

export  const genderReportMale = () => {
    return axios
        .get(BASE_URL +'/genderReportMale')
        .then(res => {
            //console.log(res.data)
            return res.data
            
        })
        .catch(err => {
            console.log(err)
        })
}

export  const genderReportFemale = () => {
    return axios
        .get(BASE_URL +'/genderReportFemale')
        .then(res => {
            console.log(res.data)
            return res.data
            
        })
        .catch(err => {
            console.log(err)
        })
}

export const ageReportFemale = () => {
    return axios
        .get(BASE_URL + '/ageReportFemale')
        .then(res => {
            //console.log(res)
            return res.data
        })
        .catch(err=> {
            console.log(err);
        })
}

export const ageReportMale = () => {
    return axios
        .get(BASE_URL + '/ageReportMale')
        .then(res => {
            //console.log(res)
            return res.data
        })
        .catch(err=> {
            console.log(err);
        })
}

export const uploads = (contentType, data) => {
        return axios( BASE_URL+'/uploads', {
            method: 'POST',
            data: data,
            headers: {
            'Content-Type': contentType
            }
            }).then((res) => {
              return res.data
                
        
            }).catch((error) => {
            console.log(error);
        })

   }

export const totalMale = () => {
    return axios.get(BASE_URL + '/totalMale')
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
        
    })
}

export const territories = () => {
    return axios
    .get(BASE_URL + '/territories')
    .then(res => {
       // console.log(res);
        
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}



export const user = user => {
    return axios
    .post(BASE_URL +'/user', {
  
        userid: user.userid,
        
    })
    .then(res => {
       
        //console.log(res.data)
        return res.data
       
    })
    .catch(err => {
        console.log(err)
    })
}


export const active = () => {
    return axios.get(BASE_URL + '/active')
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}


export const inactive = () => {
    return axios.get(BASE_URL + '/inactive')
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}


export const systemusers = () => {
    return axios.get(BASE_URL + '/systemusers')
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}


export const sendterritory = (members)=> {
    return axios
    .post(BASE_URL + '/sendterritory', {
        territory: members.territory
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        return {
            "code": 400,
            "status": err,
            "message": "Network Error",
            "error": true
        }
    })
}