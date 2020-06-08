import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import SimpleLoader from '../loaders/SpinnerLoader'
import { withRouter } from 'react-router-dom'
import {edituser} from '../../../functions/Users'

class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password2: '',
            loading: null,
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }


    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const userObject = decoded.user[0]
        console.log(decoded.user[0]);

        this.setState({
            firstname: userObject.first_name,
            lastname: userObject.last_name,
            email: userObject.email
        })
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({ loading: true })
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        
        edituser(user).then(res => {
            if (res) {
                console.log(res);
                
               // {window.location.reload(false)}
            }
        })
    }


    render() {
        if (this.state.loading) {
            return (
                <SimpleLoader />
            )
        }

        return (
            <React.Fragment>
                <div className="hk-wrapper hk-vertical-nav" style={{ marginTop: "10vh", marginLeft: "240px" }}>
                    <div className="hk-pg-">
                        
                        <div className="container-fluid px-xxl-65 px-xl-20" style={{backgroundColor: "#fff"}}>
                        <h3  style={{padding:"3% 5%"}}>Edit</h3>
                            <div className="row">
                                
                                <div className="col-sm-6 c0l-md-6 col-lg-6" style={{padding:"0 5%"}}>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="form-row">
                                        <div className="col-md-6 form-group">
                                            <input className="form-control" placeholder="First name" value={this.state.first_name} onChange={this.onChange} type="text" name="first_name" required />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <input className="form-control" placeholder="Last name" value={this.state.last_name} onChange={this.onChange} type="text" name="last_name" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Email" value={this.state.email} onChange={this.onChange} type="email" name="email" required />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChange} type="password" name="password" required />
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input className="form-control" placeholder="Confirm Password" type="password" />
                                            <div className="input-group-append">
                                                <span className="input-group-text"><span className="feather-icon"><i data-feather="eye-off"></i></span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-block" type="submit">Update Profile</button>
                                </form>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

EditProfile.propTypes = {};
export default withRouter(EditProfile)