import React, { Component } from 'react'
import {withRouter, Link  } from 'react-router-dom'
import {login} from '../functions/Auth.js';
import logo from '../assets/dist/img/transparent_logo.png';
import SpinnerLoader from './ui/loaders/SpinnerLoader.js';
import swal from 'sweetalert'

class Login extends Component {
    constructor(props, ...rest) {
        super()
        this.state = {
            email: '',
            password: '',
            loading: false,  
            loggedIn: false, 
            error: null
        }
    
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    onChange(e) {
        this.setState( {[e.target.name]: e.target.value} )
    }
    
    onSubmit(e){ 
        this.setState({
            loading: true
        })
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password
        }
    
        login(user).then(res => {
            if(res) {
                this.setState({
                    loading: false
                })
               
                if(res.error) {
                    let loginfail =  "Login failed!"
                    switch(res.code) {
                        case 400: 
                            swal(res.message, {
                                title: loginfail,
                                icon: "error",
                            });
                            break;
                        case 204: 
                            swal(res.message, {
                                title: loginfail,
                                icon: "error",
                            });
                            break;
                        default:
                            swal(res.message, {
                                title: loginfail,
                                icon: "error",
                              });
                        }         
                            
                } else {
                    this.props.history.push('/dashboard');
                }

            }
        })
    }

    componentDidMount() {
       const token = localStorage.usertoken;
       if(token) {
        this.props.history.push('/dashboard');
       }
       
    }

    render() {
        if( this.state.loading ){
            return (
                <SpinnerLoader/>
            )
        }
        return (
            <React.Fragment>

                <div className="hk-wrapper">
                    <div className="hk-pg-wrapper hk-auth-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-12 pa-0">
                                    <div className="auth-form-wrap pt-xl-0 pt-70">
                                        <div className="col-md-4 col-lg-4 auth-form w-xl-100 w-lg-100 w-sm-100 w-100 card pa-25 shadow-lg">
                                            <a className="auth-brand text-center d-block mb-20" href="#">
                                                <img class="brand-img" src={logo} alt="logo" style={{width: "50px", height:"55px"}} />
                                            </a>
                                            <form noValidate onSubmit={this.onSubmit}>
                                                <h1 className="display-4 text-center mb-10">Sign In</h1>
                                                <p className="text-center mb-30">Sign in to your account.</p> 
                                                <div className="form-group">
                                                    <input className="form-control" placeholder="Email" name="email" type="email" value={this.state.email} onChange={this.onChange} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input className="form-control" placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.onChange} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text"><span className="feather-icon"><i data-feather="eye-off"></i></span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="custom-control custom-checkbox mb-25">
                                                    <input className="custom-control-input" id="same-address" type="checkbox" />
                                                    <label className="custom-control-label font-14" for="same-address">Keep me logged in</label>
                                                </div>
                                                <button className="btn btn-success btn-block">Login</button>
                                                <p className="font-14 text-center mt-15">Having trouble logging in?</p>
                                                <p className="text-center">Don't have an account yet? <Link to="/register">Sign Up</Link></p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>		
                </div>
            </React.Fragment>   
        );
    }
}

export default withRouter(Login)
  