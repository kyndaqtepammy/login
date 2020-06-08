import React, { Component } from 'react'
import { ageReportMale } from '../../../functions/Users'
import { ageReportFemale } from '../../../functions/Users'
import '../../../assets/vendors4/jquery-toggles/css/toggles.css'
import '../../../assets/vendors4/jquery-toggles/css/themes/toggles-light.css'
import '../../../assets/dist/css/style.css'
import { Doughnut } from 'react-chartjs-2'
import { CSVLink } from "react-csv";
import GenericError from '../errorviews/GenericError'

var maleData = [];
var femaleData = [];
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


class ByAge extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            maleData: {},
            femaleData: {},
            noData: null
        };
    }

    componentDidMount() {
        ageReportFemale().then(res => {
            if (res) {
                femaleData = res.members[0]
                const data = res.members[0]
                const ageGroup = data.map(age => age.age)
                const total = data.map(t => t.total)

                this.setState({
                    femaleData: {
                        type: 'doughnut',
                        labels: ageGroup,
                        datasets: [{
                            label: 'Female',
                            data: total,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)'
                            ],
                        }]
                    }
                })
            } else {
                this.setState({ noData: true });
            }
        });

        //same data for male population
        ageReportMale().then(res => {
            if (res) {
                maleData = res.members[0]
                const data = res.members[0]
                const ageGroup = data.map(age => age.age)
                const total = data.map(t => t.total)

                this.setState({
                    maleData: {
                        type: 'doughnut',
                        labels: ageGroup,
                        datasets: [{
                            label: 'Male',
                            data: total,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)'
                            ],
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
                            <h4 className="hk-pg-title"><span className="pg-title-icon"><span className="feather-icon"><i data-feather="share-2"></i></span></span>Gender Analysis</h4>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <section className="hk-sec-wrapper">
                                    <div className="row" style={headings}>
                                        <h6 className="hk-sec-title">Number of Males by Territory</h6>
                                        <CSVLink data={maleData} style={exportButton}>Export as CSV</CSVLink>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm">
                                            <div id="m_chart_2" className="" style={{ height: "294px" }}>
                                                <Doughnut
                                                    data={this.state.maleData}
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
                                        <h6 className="hk-sec-title">Number of Females by Territory</h6>
                                        <CSVLink data={femaleData} style={exportButton}>Export as CSV</CSVLink>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm">
                                            <div id="m_chart_4" className="" style={{ height: "294px" }}>
                                                <Doughnut
                                                    data={this.state.femaleData}
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

export default ByAge
