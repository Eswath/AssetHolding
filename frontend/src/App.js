import React, {Component} from 'react';
import './App.css';
import {Router, Route, browserHistory} from 'react-router';
import Login_Container from './container/login/Login_Container';
import Hr_Container from './container/hr/Hr_Container';
import Employee_Container from "./container/employee/Employee_Container";

class App extends Component {
    render() {
        return (
            <div>
                <Router history={browserHistory}>
                    <div>
                        <Route exact path="/" component={Login_Container}/>
                        <Route path="/hr" component={Hr_Container}/>
                        <Route path="/employee" component={Employee_Container}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
