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
import CreateRouteContainer from './routes/create_route_container';
import RouteShowContainer from './routes/show_route_container';


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

            <Switch>
                <AuthRoute exact path="/login" component={LogInFormContainer} />
                <AuthRoute exact path="/signup" component={SignUpFormContainer} />
                <ProtectedRoute exact path="/routes/create" component={CreateRouteContainer} />
                <Route exact path="/routes/show/:routeId" component={RouteShowContainer}/>
            </Switch>
            
            <Route exact path="/" component={Background}/>
        </div>
    )
}

export default App;