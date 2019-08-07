import React from 'react';
import { Provider } from 'react-redux';

import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';


import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import WelcomeContainer from './welcome/welcome_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Background from './background/background';
// import CreateRouteContainer from './routes/create_route_container';
import CreateRoute from './routes/create_route';

const mapCenter = { lat: 40.783848, lng: -73.964573 };

const locations = [
    { lat: 40.754910, lng: -73.994100, name: "Empire State Building" },
    { lat: 40.744680, lng: -73.758070, name: "Queens" },
    { lat: 40.611700, lng: -73.909150, name: "Brooklyn" }
]

const App = () => {
    return (
        <div>
            <header>
                <div className="logo-div">
                    <nav className="main-nav">
                        <Link to="/" className="logo-link"> 
                            <img src={window.logo} id="logo"></img>
                        </Link>
                    </nav>
                </div>
            </header>
            
            <WelcomeContainer />

            {/* <CreateRoute center={mapCenter}/> */}

            <Switch>
                <AuthRoute exact path="/login" component={LogInFormContainer} />
                <AuthRoute exact path="/signup" component={SignUpFormContainer} />
                <Route exact path="/routes/create" component={CreateRoute} />
            </Switch>
            {/* <span>
                <Link to="sign"></Link>
            </span> */}
            <Route exact path="/" component={Background}/>
        </div>
    )
}

export default App;