import React, { Component } from 'react';
import { active } from '../../../functions/Users'
import '../../../assets/vendors4/jquery-toggles/css/toggles.css'
import '../../../assets/vendors4/jquery-toggles/css/themes/toggles-light.css'
import '../../../assets/dist/css/style.css'
import { HorizontalBar } from 'react-chartjs-2'
import GenericError from '../errorviews/GenericError';

const exportButton = {
    float: "right"
}

class Active extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            active: {},
            inactive: {}, 
            noData: null
        };
    }
    


    componentDidMount() {
        active().then(res=>{
            if(res) {
                const data = res.members
                console.log(data);
                const territories = res.members.map(t => t.territory)
                const active = res.members.map(p => p.active)

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
                this.setState({noData: true});
            }
            
         })
    }

    render() {
        if(this.state.noData) {
            return(
                <GenericError/>
            )
        }

        return (
            <React.Fragment>
            <div className="hk-wrapper hk-vertical-nav" style={{ marginTop: "120px", marginLeft: "240px" }}>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="hk-pg-header">
                        <h4 className="hk-pg-title"><span className="pg-title-icon"><span className="feather-icon"><i data-feather="share-2"></i></span></span>Active Members</h4>
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                            <section className="hk-sec-wrapper">
                                <h6 className="hk-sec-title">Number of Active Members by Territory</h6>
                                
                                <div className="row">
                                    <div className="col-sm">
                                        <div id="m_chart_4" className="" style={{height:"80vh"}}>
                                        <HorizontalBar 
                                            data ={ this.state.active} 
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

Active.propTypes = {};

export default Active
