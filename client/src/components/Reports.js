import React from 'react';
import {Link} from 'react-router-dom';


class Reports extends React.Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }


    render() {
        return (
            <React.Fragment>
                <div className="hk-wrapper hk-vertical-nav" style={{ marginTop: "120px", marginLeft: "240px" }}>
                    <div className="row">
                        {/* <!-- Main Content --> */}
                        <div className="col-sm-12 col-md-12 col-lg-12">

                            <nav className="hk-breadcrumb" aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-light bg-transparent">
                                    <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Reports</li>
                                </ol>
                            </nav>


                            <div className="container-fluid px-xxl-65 px-xl-20">

                                <div className="hk-pg-header">
                                    <h4 className="hk-pg-title"><span className="pg-title-icon"><i className="ion ion-md-clipboard"></i></span>  Reports</h4>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <section className="hk-sec-wrapper">
                                            <div class="row align-items-center">
                                            <Link to="/subscriptions"  style={{textDecoration: "none!important", color:"#324148", display
                  : "contents"}}>
                                                <h6 class="col-8">Active and Inactive members by Territory</h6>
                                                </Link>
                                            </div>
                                            <hr></hr>

                                            <div class="row align-items-center">
                                                <Link to="/by-age"  style={{textDecoration: "none!important", color:"#324148", display
                  : "contents"}}>
                                                    <h6 class="col-8">Gender Analysis by Age</h6>
                                                </Link>
                                            </div>
                                            <hr></hr>

                                            <div class="row align-items-center">
                                                <Link to="by-territory"  style={{textDecoration: "none!important", color:"#324148", display
                  : "contents"}}>
                                                    <h6 class="col-8">Gender Classification by Territory</h6>
                                                </Link>
                                            </div>
                                            <hr></hr>

                                            <div class="row align-items-center">
                                                <h6 class="col-8">Subscriptions by Territory</h6>
                                            </div>
                                            <hr></hr>

                                            <div class="row align-items-center">
                                                <Link to="/by-age"  style={{textDecoration: "none!important", color:"#324148", display
                  : "contents"}}>
                                                    <h6 class="col-8">Members By Territory</h6>
                                                </Link>
                                            </div>
                                            <hr></hr>
                                        </section>
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

Reports.propTypes = {};
export default Reports
