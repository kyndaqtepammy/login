import React, { Component } from 'react';
import { active, inactive } from '../../../functions/Users'
import '../../../assets/vendors4/jquery-toggles/css/toggles.css'
import '../../../assets/vendors4/jquery-toggles/css/themes/toggles-light.css'
import '../../../assets/dist/css/style.css'
import { HorizontalBar } from 'react-chartjs-2';
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";
import GenericError from '../errorviews/GenericError';

var activeArray = [];
var inactiveArray = [];

const exportButton = {
    float: "right",
    backgroundColor: "#22af47",
    padding: "8px",
    border: "#22af47 2px solid",
    borderRadius: "5px",
    color: "white"
}


const headings = {
    padding: "15%, 2%",
    justifyContent: "space-between"
}


class ActiveInactive extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            active: {},
            inactive: {}
        };
    }



    componentDidMount() {
        active().then(res => {
            if (res) {
                activeArray = res.members
                const territories = res.members.map(t => t.territory);
                const active = res.members.map(p => p.active);

                this.setState({
                    active: {
                        type: 'bar',
                        labels: territories,
                        datasets: [{
                            label: 'Active Members',
                            data: active,
                            backgroundColor: 'rgb(105, 201, 130, 1)'
                        }]
                    }
                })
            } else {
                this.setState({ noData: true })
            }

        })


        inactive().then(res => {
            if (res) {
                inactiveArray = res.members
                const territories = res.members.map(t => t.territory)
                const inactive = res.members.map(p => p.inactive)

                this.setState({
                    inactive: {
                        type: 'bar',
                        labels: territories,
                        datasets: [{
                            label: 'Inactive Members',
                            data: inactive,
                            backgroundColor: 'rgb(255, 100, 0)'
                        }]
                    }
                })
            } else {
                this.setState({ noData: true });
            }

        })

    }


    render() {
        if (this.state.noData) {
            return (
                <GenericError />
            )
        }

        return (
            <React.Fragment>
                <div className="hk-wrapper hk-vertical-nav" style={{ marginTop: "120px", marginLeft: "240px" }}>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="hk-pg-header">
                            <h4 className="hk-pg-title"><span className="pg-title-icon"><span className="feather-icon"><i data-feather="share-2"></i></span></span>Active Members Analysis</h4>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <section className="hk-sec-wrapper">
                                    <div className="row" style={headings}>
                                        <h6 className="hk-sec-title">Number of Inactive Members by Territory</h6>
                                        {/* <button style={exportButton} className="btn btn-success btn-md" onClick={this.exportActive.bind(this)}>Export as CSV</button> */}
                                        <CSVLink data={inactiveArray} style={exportButton}>Export as CSV</CSVLink>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm">
                                            <div id="m_chart_2" className="" style={{ height: "294px" }}>
                                                <HorizontalBar
                                                    data={this.state.inactive}
                                                    width={100}
                                                    height={50}
                                                    options={{
                                                        maintainAspectRatio: false
                                                    }}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="hk-sec-wrapper">
                                    <div className="row" style={headings}>
                                        <h6 className="hk-sec-title">Number of Active Members by Territory</h6>
                                        <CSVLink data={JSON.stringify(activeArray)} style={exportButton}>Export as CSV</CSVLink>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm">
                                            <div id="m_chart_4" className="" style={{ height: "294px" }}>
                                                <HorizontalBar
                                                    data={this.state.active}
                                                    width={100}
                                                    height={50}
                                                    options={{
                                                        maintainAspectRatio: false
                                                    }}
                                                />
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

ActiveInactive.propTypes = {};
export default ActiveInactive