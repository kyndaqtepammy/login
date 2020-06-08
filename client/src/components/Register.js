
import React, { Fragment, Component } from 'react'
import { Link, BrowserRouter, withRouter } from 'react-router-dom'
import { register } from '../functions/Auth'
import SimpleLoader from './ui/loaders/SimpleLoader'
import logo from '../assets/dist/img/transparent_logo.png';
import Pending from './Pending';


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

    componentDidMount() {
        const token = localStorage.usertoken;
        if(token) {
         this.props.history.push('/dashboard');
        }
        
     }

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
    } 
}



   onChange(e) {
       this.setState( {[e.target.name]: e.target.value} )
   }
   
   onSubmit(e){
       e.preventDefault()
       this.setState({loading: true})
       const user = {
           first_name: this.state.first_name,
           last_name: this.state.last_name,
           email: this.state.email,
           password: this.state.password,
           password2: this.state.password2
       }
   
      // this.props.registerUser(newUser, this.props.history)
       register(user).then(res => {
           if(res) {
               //console.log(res);
               
               this.setState({loading: false})
               this.props.history.push('/pending')
           }
       })
    }


    render() {
        if(this.state.loading) {
            return(
                <SimpleLoader/>
            )
        } 

        return (
            <React.Fragment>
                <div className="hk-wrapper">
                    <div className="hk-pg-wrapper hk-auth-wrapper">
                        <header className="d-flex justify-content-end align-items-center">
                        </header>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-12 pa-0">
                                    <div className="auth-form-wrap pt-xl-0 pt-70">
                                        <div className="col-md-4 col-lg-4 auth-form w-xl-35 w-lg-65 w-sm-85 w-100 card pa-25 shadow-lg">
                                        <a className="auth-brand text-center d-block mb-20" href="#">
                                                <img class="brand-img" src={logo} alt="logo" style={{width: "50px", height:"55px"}} />
                                            </a>
                                            <form noValidate onSubmit={this.onSubmit}>
                                                <h1 className="display-4 mb-10 text-center">Sign up for free</h1>
                                                <p className="mb-30 text-center">Create your account and start your free trial today</p>
                                                <div className="form-row">
                                                    <div className="col-md-6 form-group">
                                                        <input className="form-control" placeholder="First name" value={this.state.first_name} onChange={this.onChange} type="text" name="first_name" />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <input className="form-control" placeholder="Last name" value={this.state.last_name} onChange={this.onChange} type="text" name="last_name" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" placeholder="Email" value={this.state.email} onChange={this.onChange} type="email" name="email" />
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChange} type="password" name="password" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input className="form-control" placeholder="Confirm Password" type="password" />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text"><span className="feather-icon"><i data-feather="eye-off"></i></span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="custom-control custom-checkbox mb-25">
                                                    <input className="custom-control-input" id="same-address" type="checkbox" />
                                                    <label className="custom-control-label font-14" for="same-address">I have read and agree to the <a href="#"><u>term and conditions</u></a></label>
                                                </div>
                                                <button className="btn btn-primary btn-block" type="submit">Register</button>
                                                <div className="option-sep">or</div>

                                                <p className="text-center">Already have an account? <Link to="./">Sign In</Link></p>
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

Register.propTypes = {};
export default withRouter(Register)