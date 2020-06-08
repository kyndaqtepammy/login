import React, { Component } from 'react';
import axios from 'axios';
import BASE_URL from '../functions/Constants';

class Profile extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            image: null
        };

        this.postImage = this.postImage.bind(this);
        this.fileInput = React.createRef();
       // this.onChange = this.onChange.bind(this);
    }

    onChange (e){
        this.setState({
            image:  e.target.files[0]
        });
        console.log(this.state.image);
        
    }

    postImage =e=> {
        e.preventDefault();
        let formData = new FormData();
        formData.append('data', 'Hello world');

        axios.post(`${BASE_URL}/editmember`, formData)
        .then(res=>{
            console.log(res);
            
        })
        .catch(err=> {
            console.log(err);
            
        })
    }
        
        


    render() {
        return (
            <div style={{marginTop: "200px", backgroundColor:"red", marginLeft:"400px"}}>
                <form onSubmit={this.postImage}>
                <input className="form-control" style={{ border: "none" }} type="file" name="myFile" ref={this.fileInput} onChange={this.onChange.bind(this)} />
                <button className="btn btn-success btn-lg">Post</button>+
                </form>
            </div>

        )
    }
}

export default Profile;
