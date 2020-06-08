import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'
import { register } from '../../../functions/Auth'
import SpinnerLoader from '../loaders/SpinnerLoader'


class Register extends Component {
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


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
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

        // this.props.registerUser(newUser, this.props.history)
        register(user).then(res => {
            if (res) {
                //console.log(res);

                this.setState({ loading: false })
                {window.location.reload(false)}
               // this.props.history.push('/dashboard')
            }
        })
    }


    render() {
        if (this.state.loading) {
            return (
                <SpinnerLoader />
            )
        }

        return (
            <React.Fragment>
                <div className="hk-wrapper hk-vertical-nav" style={{ marginTop: "20vh", marginLeft: "240px" }}>
                    <div className="hk-pg-">


                        <div className="container-fluid px-xxl-65 px-xl-20" style={{backgroundColor: "#fff"}}>
                            <div className="row">
                                <div className="col-sm-6 c0l-md-6 col-lg-6" style={{padding:"0 5%", borderRight: "1px solid grey"}}>
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
                                    <button className="btn btn-primary btn-block" type="submit">Add User</button>
                                </form>
                                </div>

                                <div className="col-sm-6 c0l-md-6 col-lg-6" style={{padding:"0 5%"}}>
                                <h3 class="display-6 mb-10 text-center">Last 5 logged in users</h3>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

Register.propTypes = {};
export default withRouter(Register)