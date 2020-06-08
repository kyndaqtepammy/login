import React, { Component } from 'react'
import { genderReportMale } from '../../../functions/Users'
import { genderReportFemale } from '../../../functions/Users'
import '../../../assets/vendors4/jquery-toggles/css/toggles.css'
import '../../../assets/vendors4/jquery-toggles/css/themes/toggles-light.css'
import '../../../assets/dist/css/style.css'
import { HorizontalBar } from 'react-chartjs-2'
import { CSVLink, CSVDownload } from "react-csv";

var males = [];
var females = [];

const exportButton = {
    float: "right",
    backgroundColor: "#22af47",
    padding: "8px",
    border:"#22af47 2px solid",
    borderRadius:"5px",
    color: "white"
}


const headings = {
    padding: "15%, 2%",
    justifyContent: "space-between"
}

class ByGender extends Component {
    constructor(props, ...rest) {
        super(props);
        this.state = {
            maleChart: { },
            femaleChart: {}
        };

    }

    componentDidMount() {
        genderReportMale().then(res => {
            males = res.members
            const territories = res.members.map(t => t.territory)
            const population = res.members.map(p => p.population)
            //console.log(population);

            this.setState({
                maleChart: {
                    type: 'bar', 
                    labels: territories,
                   datasets: [{
                       label: 'Male',
                       data: population,
                       backgroundColor: 'rgb(105, 201, 130, 1)'
                   }]
                }
            })
            
        })



        genderReportFemale().then(res => {
            females = res.members
            const territories = res.members.map(t => t.territory)
            const population = res.members.map(p => p.population)
            this.setState({
                femaleChart: {
                    type: 'bar', 
                    labels: territories,
                   datasets: [{
                       label: 'Female',
                       data: population,
                       backgroundColor: 'rgb(105, 201, 130, 1)'
                   }]
                }
            })
        })
    }

    render() {
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
                                        <CSVLink data={males} style={exportButton}>Export as CSV</CSVLink>
                                    </div> 
                                    <div className="row">
                                        <div className="col-sm">
                                            <div id="m_chart_2" className="" style={{height:"294px"}}>
                                                <HorizontalBar 
                                                data ={ this.state.maleChart} 
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
                                    <CSVLink data={females} style={exportButton}>Export as CSV</CSVLink>
                                    </div> 
                                    <div className="row">
                                        <div className="col-sm">
                                            <div id="m_chart_4" className="" style={{height:"294px"}}>
                                            <HorizontalBar 
                                                data ={ this.state.femaleChart} 
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

export default ByGender;
