import React, { Component} from 'react'
import '../../../assets/vendors4/jquery-toggles/css/toggles.css'
import '../../../assets/vendors4/jquery-toggles/css/themes/toggles-light.css'
import '../../../assets/dist/css/style.css'

class NavigationTop extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-xl navbar-dark fixed-top hk-navbar">
                    <a className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" href="javascript:void(0);"><span className="feather-icon"><i data-feather="more-vertical"></i></span></a>
                    <a id="navbar_toggle_btn" className="navbar-toggle-btn nav-link-hover" href="javascript:void(0);"><span className="feather-icon"><i data-feather="menu"></i></span></a>
                    <a className="navbar-brand" href="dashboard1.html">
                        <img className="brand-img d-inline-block"  alt="brand" />
                    </a>
                    <ul className="navbar-nav hk-navbar-content order-xl-2">
                        <li className="nav-item">
                            <a id="navbar_search_btn" className="nav-link nav-link-hover" href="javascript:void(0);"><span className="feather-icon"><i data-feather="search"></i></span></a>
                        </li>
                        <li className="nav-item">
                            <a id="settings_toggle_btn" className="nav-link nav-link-hover" href="javascript:void(0);"><span className="feather-icon"><i data-feather="settings"></i></span></a>
                        </li>
                        <li className="nav-item dropdown dropdown-notifications">
                            <a className="nav-link dropdown-toggle no-caret" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="feather-icon bell"><i data-feather="bell"></i></span></a>
                            <div className="dropdown-menu dropdown-menu-right" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                                <h6 className="dropdown-header">Notifications <a href="javascript:void(0);" className="">View all</a></h6>
                            </div>
                        </li>
                        <li className="nav-item dropdown dropdown-authentication">
                            <a className="nav-link dropdown-toggle no-caret" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="media">
                                    <div className="media-img-wrap">
                                        <div className="avatar">
                                            <img  alt="user" className="avatar-img rounded-circle"/>
                                        </div>
                                        <span className="badge badge-success badge-indicator"></span>
                                    </div>
                                    <div className="media-body">
                                        <span>Madelyn Shane<i className="zmdi zmdi-chevron-down"></i></span>
                                    </div>
                                </div>
                            </a>

                        </li>
                    </ul>
                   
                    
                </nav>
                {/* <form role="search" className="navbar-search">
                    <div className="position-relative">
                        <a href="javascript:void(0);" className="navbar-search-icon"><span className="feather-icon"><i data-feather="search"></i></span></a>
                        <input type="text" name="example-input1-group2" className="form-control" placeholder="Type here to Search"/>
                        <a id="navbar_search_close" className="navbar-search-close" href="#"><span className="feather-icon"><i data-feather="x"></i></span></a>
                    </div>
                </form> */}
            </React.Fragment>
        );
    }
}

NavigationTop.propTypes = {};
export default NavigationTop
