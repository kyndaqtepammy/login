import React, { Component } from 'react'
import {

    Link, withRouter, Redirect
} from 'react-router-dom';
import logo from '../assets/dist/img/transparent_logo.png';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

class Navigation extends Component {
    constructor(props, context, ...rest) {
        super(props, context, ...rest);

        this.state = {
            firstname: '',
            lastname: '', 
            logout: false
        }
        
    }

    componentDidMount() {        
       try {
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);
            const userObject = decoded.user[0];
            Cookies.set('name', userObject, { expires: 7 });
            console.log(Cookies.get('name'));
            

            this.setState({
                firstname: userObject.first_name,
                lastname: userObject.last_name,
                email: userObject.email
            })
       }catch(err){
           this.setState({logout: true})
           //console.log(err);
       }
    }

    handleLogout=() => {
       localStorage.clear()
        this.setState({ logout: true})
      }; 

    render() {
        const loggedOut= this.state.logout
        if(loggedOut) {
            return <Redirect to="/" push={true} />
        }


        return(
            <React.Fragment>
            <div className="hk-wrapper hk-vertical-nav">
                {/* <!-- Top Navbar --> */}
                <nav className="navbar navbar-expand-xl navbar-dark fixed-top hk-navbar">
                    <a className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="feather-icon"><i data-feather="more-vertical"></i></span></a>
                    <span>
                        <img src={logo} alt="ZCIEA" style={{width:"30px", height: "50px"}}  />
                    </span>

                    <ul className="navbar-nav hk-navbar-content order-xl-2">
                        <li className="nav-item dropdown dropdown-authentication">
                            <a className="nav-link dropdown-toggle no-caret" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="media">
                                    <div className="media-img-wrap">
                                        <div className="avatar">
                                        <i className="ion ion-md-person" style={{fontSize: "30px"}}></i>
                                        </div>
                                        <span className="badge badge-success badge-indicator"></span>
                                    </div>
                                    <div className="media-body">
                                        <span>{this.state.firstname + " "+ this.state.lastname}<i className="zmdi zmdi-chevron-down"></i></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    </div>

                </nav>
                {/* <!-- /Top Navbar --> */}

                {/* <!-- Vertical Nav --> */}
                <nav className="hk-nav hk-nav-light">
                    <a href="" id="hk_nav_close" className="hk-nav-close"><span className="feather-icon"><i data-feather="x"></i></span></a>
                    <div className="nicescroll-bar">
                        <div className="navbar-nav-wrap">

                            <ul className="navbar-nav flex-column">

                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        <i className="ion ion-md-analytics"></i>
                                        <span className="nav-link-text" id="dashboard">Dashboard</span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link  className="nav-link" to="/users">
                                            <i className="ion ion-md-appstore"></i>
                                            <span className="nav-link-text" id="users">Users</span>
                                    </Link>
                                </li>
                            </ul>

                            <hr className="nav-separator" />
                            <div className="nav-header">
                                <span>Membership</span>
                                <span>UI</span>
                            </div>
                            <ul className="navbar-nav flex-column">
                                <Link  className="nav-link" to="/members">
                                    <li className="nav-item">
                                        <span className="nav-link" id="members">
                                            <i className="ion ion-md-outlet"></i>
                                            <span className="nav-link-text">Members</span>
                                        </span>
                                    </li>
                                </Link>

                                <Link to="/territories">
                                    <li className="nav-item">
                                        <span className="nav-link" id="territories">
                                            <i className="ion ion-md-clipboard"></i>
                                            <span className="nav-link-text">Territories</span>
                                        </span>
                                    </li>
                                </Link>

                                <Link to="/reports">
                                    <li className="nav-item">
                                        <span className="nav-link" id="reports">
                                            <i className="ion ion-md-git-branch" data-toggle="collapse" data-target="#pages_drp"></i>
                                            <span className="nav-link-text" >Reports</span>
                                        </span>
                                    </li>
                                </Link>
                            </ul>
                            <hr className="nav-separator" />
                            <div className="nav-header">
                                <span>Profile</span>
                                <span>GS</span>
                            </div>
                            <ul className="navbar-nav flex-column">
                                <Link to="/profile">
                                    <li className="nav-item">
                                        <span className="nav-link" href="">
                                            <i className="ion ion-md-bookmarks"></i>
                                            <span className="nav-link-text" id="profile">My Profile</span>
                                        </span>
                                    </li>
                                </Link>

                                <li className="nav-item" style={{cursor:"pointer"}} onClick={this.handleLogout}>
                                    <span className="nav-link">
                                        <i className="ion ion-md-calculator"></i>
                                        <span className="nav-link-text">Logout</span>
                                    </span>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
                <div id="hk_nav_backdrop" className="hk-nav-backdrop"></div>
            </div>
        </React.Fragment>
        )
    }
}

Navigation.propTypes = {};

export default withRouter(Navigation)

