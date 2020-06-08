import React, { Component } from 'react';
import Cards from './ui/dashboard/Cards';
import { Link } from 'react-router-dom';
import {notifications} from '../functions/Users';
import GenericError from './ui/errorviews/GenericError';
import '../assets/vendors4/jquery-toast-plugin/dist/jquery.toast.min.css';

class Dashboard extends Component {
    constructor(props, ...rest){
        super(props, ...rest);

        this.state = {
            noData: null
        }
    }

    componentDidMount() {
        // notifications().then(res => {
        //     if(res) {
        //         if (!res.error) {
        //             // console.log(res.users);
        //              let pending = res.users.length;
        //          }
        //     } else {
        //         this.setState({noData: true});
        //     }
        // })
    }


    render(props) {
        if(this.state.noData) {
            return(
                <GenericError />
            )
        }

        return(
            <React.Fragment>
              <div className="hk-wrapper hk-vertical-nav"  style={{marginTop:"120px", marginLeft:"240px"}}>
              
               <div className="row">
                <Link to="/view-members" className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-30">
                    <Cards title="View Members" iconClass="ion ion-md-person-add" />
                </Link>
        
                <Link to="/addmember" className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-30">
                    <Cards title="New Member" iconClass="ion ion-md-person-add" /> 
                </Link>

                <Link to="/territories" className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-30">
                    <Cards title="Territories" iconClass="ion ion-md-globe" /> 
                </Link>

                <Link to="/active" className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-30">
                    <Cards title="Active" iconClass="ion ion-md-checkbox" /> 
                </Link>

                <Link to="/inactive" className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-30">
                    <Cards title="Inactive" iconClass="ion ion-md-close-circle" />
                </Link>

                <Link to="/reports" className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-30">
                    <Cards title="Reports" iconClass="ion ion-md-analytics" /> 
                </Link>

                <Link to="/settings" className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-30">
                    <Cards title="Settings" iconClass="ion ion-md-settings" />
                </Link>

                <Link to="/events" className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-30">
                    <Cards title="Events" iconClass="ion ion-md-calendar" />
                </Link>

                <Link to="/import" className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-30">
                    <Cards title="Import" iconClass="ion ion-md-download" />
                </Link>

                <Link to="/users" className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-30">
                    <Cards title="Systems Users" iconClass="ion ion-md-person" />
                </Link>
               </div>
            </div>
            </React.Fragment>
        )
    }
}
export default Dashboard