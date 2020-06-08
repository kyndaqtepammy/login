import React, { useState, forwardRef } from 'react';
import axios from 'axios';
import  BASE_URL from '../../../functions/Constants'

const AddMemberV2 = (props) => {
    let [ member, updateMember ] = useState({
        firstName: '',
            lastName: '', 
            id_number: '',
            disability: '',
            address: '',
            territory: '',
            date_of_birth: '',
            gender: '',
            trade: '',
            contact: '',
            email: '',
            amount_paid: '',
            selectedFile: null,
    });
    let [ loading, setLoading ] = useState(false);

    const handleChange = e => {
        let memberInfo = {...member};
        let { name, value } = e.target;
        memberInfo[name] = value;
        updateMember(memberInfo);
    }

    // if you want to refactor, you can add this code to handle change, considering your variables naming doesn't change 
    const selectFile = e => {
        let memberInfo = {...member}, files = e.target.files, file = file[0];
        memberInfo.selectedFile = file;
        updateMember(memberInfo);
    }

    const submitForm = () => {
        // you can do your validations here.. 
        // look for a library name formik and yup for form validations
        let fd = new FormData();
        // if you want to explicitly check selected file on submit you can use useRef.. learn that
        // however we are going to append values to form data
        let keys = Object.keys(member);
        for(const key of keys){
            if(key == 'selectedFile'){
                fd.append('myImage', member[key]);
            } else {
                fd.append(key, member[key])
            }
        }

        // now we upload content to the server
        setLoading(true);
        Apis.post('api/uploads', fd, null)
        .then(d =>console.log(d))
        .catch(e => console.log(e))
        .finally(()=> setLoading(false));

    }

    return(
        <div className="upload-form">
            <StyledInput name="selectedFile" value={member.selectedFile} onChange={selectFile}/>
        </div>
    )
}

const StyledInput = ({name, value, styles = null, error = null, ...rest}) => {
    let defaultStyles = {
        wrapper: {//... wrapper styles
        },
        input: { // ...input styles
            padding: ".75rem 1rem",
            border: "1px solid #3333",
            display:"block"
        },
        error: { // ...error styles

        }
    }

    if(styles){
        defaultStyles = {...defaultStyles, ...styles};
    }

    return (
        <div style={defaultStyles.wrapper}>
            <input style={defaultStyles.input} name={name} value={value} {...rest}/>
            {error && <p style={defaultStyles.error}>{error}</p>}
        </div>
    )
}

const setHeaders = (token = null, contentType = null) => {
    let headers = {
      Accept: "application/json"
    }
    if(contentType) headers["Content-Type"] = contentType;
    if(token) headers['Authorization'] = `Bearer ${token}`;
    
    return headers;
  }

const Apis = {
    get: () => {},
    post: (endpoint, fd, token = null) => {
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/${endpoint}`, fd, setHeaders(token, 'multipart/form-data'))
            .then((response) => {
                resolve(response.json());
            }).catch((error) => {
                reject(new Error(error))
            })
        })
    }
}

export default AddMemberV2