import React from 'react'


import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import Reports from './ui/reports/ByAge'
import NavigationTop from './ui/nav/NavigationTop'
import NavigationSide from './ui/nav/NavigationSide'


const routes = [ 
    {
        path: '/',
        exact: true,
        sidebar: () => <div>Home</div>, 
        main: () => <Reports/>
    },
    {
        path: '/bubblegum',
        exact: true,
        sidebar: () => <div>bubblegum!</div>, 
        main: () => <h2>bubblegum Content</h2>
    },
    {
        path: '/shoelaces',
        exact: true,
        sidebar: () => <div>shoelaces</div>, 
        main: () => <h2>shoelaces Content</h2>
    }
];

export default function Main() {
    return(
       
<Router>
    <NavigationTop/>
    <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "40%",
            background: "red"
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/bubblegum">Bubblegum</Link>
            </li>
            <li>
              <Link to="/shoelaces">Shoelaces</Link>
            </li>
          </ul>

          <Switch>
              {routes.map((route, index) =>(
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}children={<route.sidebar/>}
                />    
              ))}
          </Switch>
          </div>
          <div style={{ flex: 1, padding: "10px" }}>
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
      </div>
    </Router> 
    )
}