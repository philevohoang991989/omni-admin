import React, {Component} from 'react';
import Login from './Views/Layouts/Login';
import Home from './Views/Layouts/Home';
import authService from './Services/AuthService';
import {styles} from './Themes/OMNI';
import './App.css';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme(styles);

class App extends Component {

    state = {
        loggedIn: false
    };

    componentDidMount() {
        this.setState({
            loggedIn: authService.isLoggedIn()
        });
    }

    renderHome() {
        return (
            <MuiThemeProvider theme={theme}>
                <Home/>
            </MuiThemeProvider>
        );
    }

    renderLogin() {
        return (
            <MuiThemeProvider theme={theme}>
                <Login/>
            </MuiThemeProvider>);
    }

    render() {
        console.log('is login: ', this.state.loggedIn);
        if (this.state.loggedIn) {
            return this.renderHome();
        } else {
            return this.renderLogin();
        }

    }
}

export default App;
