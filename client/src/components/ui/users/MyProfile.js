import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'

class MyProfile extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            firstname: '',
            lastname: '',
            email: ''
        };
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

    render() {
        return (
            <React.Fragment>
                <div className="hk-wrapper hk-vertical-nav" style={{marginTop:"10px", marginLeft:"240px"}}>
                <div className="hk-pg-">
                    <nav className="hk-breadcrumb" aria-label="breadcrumb">
                        <ol className="breadcrumb breadcrumb-light bg-transparent">
                        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">My Profile</li>
                        </ol>
                    </nav>

                    <div className="container-fluid px-xxl-65 px-xl-20">
                        <div className="row">
                            
                                <section className="hk-sec-wrapper">
                                    
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">

                                            <h5 className="hk-sec-title">My Profile</h5>
                                            <Link to='/profile-edit'>
                                                <p style={{paddingBottom: "3%"}}>Edit Profile </p>
                                            </Link>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-12 col-lg-12">
                                                    <div className="media pa-20 border border-2 border-light rounded">
                                                       
                                                        <div className="media-body">
                                                            <ul className="list-group">
                                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                               <i class="ion ion-md-person" style={{fontSize: "50px"}}></i>
                                                            </li>

                                                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                                                    Name: {this.state.firstname} 
                                                                </li>

                                                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                                                    Surname: {this.state.lastname}
                                                                </li>

                                                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                                                    Email: {this.state.email}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                        
                                        </div>
                                    </div>
                                </section>
                        </div>
                    </div>
                </div>
                </div>
            </React.Fragment>
        );
    }
}




MyProfile.propTypes = {};
export default MyProfile
