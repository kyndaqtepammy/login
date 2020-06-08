import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Dashboard from './Dashboard'
import Members from './Members'
import Reports from './Reports'
import AddMember from '../components/ui/users/AddMember'
import ByAge from '../components/ui/reports/ByAge'
import ByGender from '../components/ui/reports/ByGender'
import Navigation from './Navigation'
import UserID from './ui/users/UserID'
import Login from './Login'
import Register from './Register'
import ActiveInactive from './ui/reports/ActiveInactive'
import Active from './ui/reports/Active'
import Inactive from './ui/reports/Inactive'
import MyProfile from './ui/users/MyProfile'
import Territories from './ui/reports/AllTerritories'
import NoMatch from './NoMatch'
import AllMembers from './ui/users/AllMembers'
import ImportExcel from './ui/reports/ImportExcel'
import SystemUsers from './SystemUsers'
import EditProfile from './ui/users/EditProfile'
import EditMember from './ui/users/EditMember'
import Users from './Users'
import TargetedSMS from './ui/users/TargetedSMS'
import AddUser from './ui/users/AddUser';
import Pending from './Pending';
import Profile from './Profile';

const routes = [
    {
        path: '/',
        exact: true,
        sidebar: () => '',
        main: () => <Login/>
    },
    {
        path: '/register',
        exact: true,
        sidebar: () => '',
        main: () => <Register/>
    },
    {
        path: '/add-user',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <AddUser/>
    },
    {
        path: '/users',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <SystemUsers/>
    },
    {
        path: '/dashboard',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <Dashboard />
    },
    {
        path: '/members',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <Members />
    },
    {
        path: '/view-members',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <AllMembers />
    },
    {
        path: '/territories',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <Territories />
    },
    {
        path: '/reports',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <Reports />
    },
    {
        path: '/profile',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <MyProfile />
    },
    {
        path: '/addmember',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <AddMember />
    },
    {
        path: '/reports',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <Reports />
    },
    {
        path: '/by-age',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <ByAge />
    },
    {
        path: '/by-territory',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <ByGender />
    },
    {
        path: '/userid',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <UserID />
    },
    {
        path: '/import',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <ImportExcel />
    },
    {
        path: '/subscriptions',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <ActiveInactive />
    },
    {
        path: '/active',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <Active />
    },
    {
        path: '/inactive',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <Inactive />
    },
    {
        path: '/view-users',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <Users />
    },
    {
        path: '/profile-edit',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <EditProfile />
    },
    {
        path: '/edit-member',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <EditMember />
    },
    {
        path: '/targeted-sms',
        exact: true,
        sidebar: () => <Navigation/>,
        main: () => <TargetedSMS />
    },
    {
        path: '/pending', 
        sidebar: () => '',
        main: () => <Pending/>
    },
    {
        path: '/*', 
        sidebar: () => '',
        main: () => <NoMatch/>
    }

];




class Main extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            firstname: '',
            lastname: ''
        };
    }

    // componentDidMount() {
    //     const token = localStorage.usertoken
    //     const decoded = jwt_decode(token)
    //     const userObject = decoded.user[0]
    //     //console.log(decoded.user[0]);
    // }

    render() {
        return (
            <React.Fragment>
                <Router basename={process.env.PUBLIC_URL}>
                {/* <!-- HK Wrapper --> */}
                <Switch>
                    {routes.map((route, index) => (
                        // Render more <Route>s with the same paths as
                        // above, but different components this time.
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            children={<route.sidebar />}
                        />
                    ))}
                </Switch>
                  
                    <div id="hk_nav_backdrop" className="hk-nav-backdrop"></div>
                    {/* <!-- /Vertical Nav --> */}
                    {/* <!-- Main Content --> */}
                    <div className="hk">
                        {/* <!-- Container --> */}
                        <div className="container-fluid">
                            {/* DYNAMIC COMPONENT GOES HERE */}
                            <Switch>
                                {routes.map((route, index) => (
                                    // Render more <Route>s with the same paths as
                                    // above, but different components this time.
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        children={<route.main />}
                                    />
                                ))}
                            </Switch>

                        </div>
                        {/* <!-- /Container --> */}


                    </div>
                    {/* <!-- /Main Content --> */}

                
                {/* <!-- /HK Wrapper --> */}
                </Router>
            </React.Fragment>
        );
    }
}

Main.propTypes = {};
export default Main


