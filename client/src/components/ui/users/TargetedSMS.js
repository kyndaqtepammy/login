import React, { Component } from 'react';
import {territories} from '../../../functions/Users';
import {targetsms, trades} from '../../../functions/Messaging';
import swal from 'sweetalert';
import SpinnerLoader from '../loaders/SpinnerLoader';

class TargetedSMS extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            territories: [],
            territory: '', 
            gender: '',
            trades: [],
            contacts: [],
            message: '',
            userInputRefs: '',
            isLoading: false
        };
    }



    onChange =(e) => {
        this.setState({ [e.target.name]: e.target.value});
        this.setState({
            userInputRefs: this.refs.userData.value
          }); 
    }

    sendByTerritory() {
        this.setState({isLoading: true});
        const fields = {
            query: "territory",
            param: this.state.territory,
            message: this.state.message
        }        
        targetsms(fields)
        .then(res =>{
            this.setState({isLoading: false})
            if( res.error) {
                this.setState({isLoading: false})
                swal({
                    title: "Error!",
                    text: "There was an error sending messages. Please try again!",
                    icon: "error",
                  });
            }else{
                this.setState({isLoading: false})
                swal({
                    title: "Success!",
                    text: "Messages sent successfuly",
                    icon: "success",
                  });
                  {window.location.reload(false)}
            }
        })            
    }


    sendByGender() {
        this.setState({isLoading: true});
        const fields = {
            query: "gender",
            param: this.state.gender,
            message: this.state.message
        }        
        targetsms(fields)
        .then(res =>{
            if( res.error) {
                this.setState({isLoading: false})
                swal({
                    title: "Error!",
                    text: "There was an error sending messages. Please try again!",
                    icon: "error",
                  });
            }else{
                this.setState({isLoading: false});
                swal({
                    title: "Success!",
                    text: "Messages sent successfuly",
                    icon: "success",
                  });
                  {window.location.reload(false)}
            }
        })   
    }


    sendByTrade() {
        this.setState({isLoading: true});
        const fields = {
            query: "trade",
            param: this.state.trade,
            message: this.state.message
        }        
        targetsms(fields)
        .then(res =>{
            this.setState({isLoading: false})
            if( res.error) {
                this.setState({isLoading: false})
                swal({
                    title: "Error!",
                    text: "There was an error sending messages. Please try again!",
                    icon: "error",
                  });
            }else{
                this.setState({isLoading: false})
                swal({
                    title: "Success!",
                    text: "Messages sent successfuly",
                    icon: "success",
                  });
                  {window.location.reload(false)}
            }
        })   
        
    }




     componentDidMount() {
        territories().then(res => {
            if(res) {
                this.setState({
                    territories: res.members
                 })  
            }
        });


        trades().then(res => {
            if(res) {
                this.setState({trades: res.members})
            }
        })
       
    }

    render() {
        if( this.state.isLoading ){
            return (
                <SpinnerLoader/>
            )
        }
        return (
            <React.Fragment>
            <div className="hk-wrapper hk-vertical-nav" style={{marginTop:"10px", marginLeft:"240px"}}>
                <div className="hk-pg-">
                    <nav className="hk-breadcrumb" aria-label="breadcrumb">
                        <ol className="breadcrumb breadcrumb-light bg-transparent">
                            <li className="breadcrumb-item"><a href="#">System Users</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Targeted SMS</li>
                        </ol>
                    </nav>
    
                    <div className="container-fluid px-xxl-65 px-xl-20">
                        <div className="row">
                            <div className="col-xl-12">
                                <section className="hk-sec-wrapper">
                                    <h5 className="hk-sec-title">Targeted SMS</h5>
                                    <div className="card card-lg">
                                        <h6 className="card-header">
                                            Target Users by Territory
                                        </h6>							
                                        <div className="card-body">
                                            <div className="user-activity">
                                                <div className="media pb-0">
                                                    <div className="row media-body">
                                                        <div className="col-md-8 col-md-offset-2 form-group">
                                                            <label htmlFor="territory">Territory</label>
                                                            <select className="form-control custom-select d-block w-100" id="territory" name="territory" onChange={this.onChange.bind(this)}>
                                                                <option value="">Select Territory...</option>
                                                                {
                                                                    this.state.territories.map(territory=> (
                                                                        <option key={territory.id} value={territory.name}>
                                                                            {territory.name}
                                                                        </option>
                                                                    ))
                                                                    
                                                                }
                                                            </select>
                                                        </div>

                                                        <div className="col-md-8 col-md-offset-2 form-group">
                                                            <label htmlFor="address">Address</label>
                                                            <textarea className="form-control mt-15" type="text" placeholder="Type your message" name="message" ref="userData" value={this.state.message} onChange={this.onChange}></textarea>
                                                        </div>

                                                        <div className="col-md-6 form-group" style={{margin:"auto", paddingTop:"1%"}}>
                                                           <button type="submit" className="btn btn-success btn-lg" onClick={this.sendByTerritory.bind(this)}>Send</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card card-lg">
                                        <h6 className="card-header">
                                            Target Users by Gender
                                        </h6>							
                                        <div className="card-body">
                                            <div className="user-activity">
                                                <div className="media pb-0">
                                                    <div className="row media-body">
                                                        <div className="col-md-6 form-group">
                                                            <label htmlFor="territory">Gender</label>
                                                            <select className="form-control custom-select d-block w-100" id="gender" name="gender" onChange={this.onChange.bind(this)}>
                                                                <option value="">Select Gender...</option>
                                                                <option value="female">Female</option>
                                                                <option value="male">Male</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-8 col-md-offset-2 form-group">
                                                            <label htmlFor="message">Message</label>
                                                            <textarea className="form-control mt-15" type="text" placeholder="Type your message" name="message" ref="userData" value={this.state.message} onChange={this.onChange}></textarea>
                                                        </div>

                                                        <div className="col-md-6 form-group" style={{margin:"auto", paddingTop:"1%"}}>
                                                           <button type="submit" className="btn btn-success btn-lg" onClick={this.sendByGender.bind(this)}>Send</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="card card-lg">
                                        <h6 className="card-header">
                                            Target Users by Age Group
                                        </h6>							
                                        <div className="card-body">
                                            <div className="user-activity">
                                                <div className="media pb-0">
                                                    <div className="row media-body">
                                                        <div className="col-md-6 form-group">
                                                            <label htmlFor="territory">Age Group</label>
                                                            <select className="form-control custom-select d-block w-100" id="agegroup" name="agegroup" onChange={this.onChange.bind(this)}>
                                                                <option value="">Select Age Group...</option>
                                                                <option>0 - 25</option>
                                                                <option>26 - 35</option>
                                                                <option>36 - 40</option>
                                                                <option>41 - 50</option>
                                                                <option>51+</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-md-6 form-group" style={{margin:"auto", paddingTop:"1%"}}>
                                                           <button type="submit" className="btn btn-success btn-lg" onClick={this.sendByTerritory.bind(this)}>Send</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="card card-lg">
                                        <h6 className="card-header">
                                            Target Users by Trade
                                        </h6>							
                                        <div className="card-body">
                                            <div className="user-activity">
                                                <div className="media pb-0">
                                                    <div className="row media-body">
                                                        <div className="col-md-6 form-group">
                                                            <label htmlFor="trade">Trade</label>
                                                            <select className="form-control custom-select d-block w-100" id="trade" name="trade" onChange={this.onChange.bind(this)}>
                                                                <option>Select Trade...</option>
                                                            {
                                                                    this.state.trades.map(trade=> (
                                                                        <option key={trade.trade} value={trade.trade}>
                                                                            {trade.trade}
                                                                        </option>
                                                                    ))
                                                                    
                                                                }
                                                            </select>
                                                        </div>

                                                        <div className="col-md-8 col-md-offset-2 form-group">
                                                            <label htmlFor="message">Message</label>
                                                            <textarea className="form-control mt-15" type="text" placeholder="Type your message" name="message" ref="userData" value={this.state.message} onChange={this.onChange}></textarea>
                                                        </div>``

                                                        <div className="col-md-6 form-group" style={{margin:"auto", paddingTop:"1%"}}>
                                                           <button type="submit" className="btn btn-success btn-lg" onClick={this.sendByTrade.bind(this)}>Send</button>
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
            </div>
            </React.Fragment> 
        );
    }
}

TargetedSMS.propTypes = {};
export default TargetedSMS;
