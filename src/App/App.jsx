import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions, eventActions } from '../_actions';
import { PrivateRoute, Loading } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
            console.log(location, action)
        });
    }

    render() {
        return ( 
            <Router history={history}>
                <div className="h100">
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} refreshed={this.props.refreshed} />
                    <PrivateRoute exact path="/:id" component={HomePage} refreshed={this.props.refreshed} />
                    <Route exact path="/login" component={LoginPage} />
                </Switch>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { refreshed, loggedIn } = state.authentication;
    return {
        refreshed,
        loggedIn
    };
}


const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 