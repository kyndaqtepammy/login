import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import Members from '../../Members';
import '../../../assets/vendors4/jquery-toggles/css/toggles.css'
import '../../../assets/vendors4/jquery-toggles/css/themes/toggles-light.css'
import '../../../assets/dist/css/style.css'

class NavigationSide extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }
    
    handleNavigationClick = e => {
        e.preventDefault()
        console.log(e.target)
    }

    render() {
        return (
            <div>
                <nav className="hk-nav hk-nav-light">
                    <a href="javascript:void(0);" id="hk_nav_close" className="hk-nav-close"><span className="feather-icon"><i data-feather="x"></i></span></a>
                    <div className="nicescroll-bar">
                        <div className="navbar-nav-wrap">
                            <ul className="navbar-nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link" href="dashboard1.html">
                                        <i className="ion ion-md-analytics"></i>
                                        <span className="nav-link-text">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-item" onClick={this.handleNavigationClick} id="users">
                                    <a className="nav-link link-with-badge"  data-toggle="collapse" data-target="#app_drp" >
                                        <i className="ion ion-md-appstore"></i>
                                        <span className="nav-link-text">Users</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <hr className="nav-separator"></hr>
                        <div className="nav-header">
                            <span>Membership</span>
                        </div>
                        <div classNameName="navbar-nav-wrap">
                            <ul className="navbar-nav flex-column">
                                <li className="nav-item">
                                    
                                        <i className="ion ion-md-analytics"></i>
                                        <span className="nav-link-text">Members</span>
                                    
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link link-with-badge" id="territory" onClick={this.handleNavigationClick} data-toggle="collapse" data-target="#app_drp">
                                        <i className="ion ion-md-appstore"></i>
                                        <span className="nav-link-text">Territories</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="reports"  onClick={this.handleNavigationClick} data-toggle="collapse" data-target="#auth_drp">
                                        <i className="ion ion-md-contact"></i>
                                        <span className="nav-link-text">Reports</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <hr class="nav-separator"></hr>
                        <div class="nav-header">
                            <span>User</span>
                        </div>
                        <hr class="nav-separator"></hr>
                        <div class="nav-header">
                            <span>User</span>
                        </div>
                        <div className="navbar-nav-wrap">
                            <ul class="navbar-nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link" href="">
                                        <i class="ion ion-md-analytics"></i>
                                        <span class="nav-link-text">My Profile</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link link-with-badge" href="javascript:void(0);" data-toggle="collapse" data-target="#app_drp">
                                        <i class="ion ion-md-appstore"></i>
                                        <span class="nav-link-text">Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div id="hk_nav_backdrop" className="hk-nav-backdrop"></div>
            </div>
        );
    }
}

NavigationSide.propTypes = {};
export default NavigationSide

