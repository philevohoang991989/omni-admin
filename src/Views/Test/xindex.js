import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Button from '@material-ui/core/Button';

function Xindex() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <Button variant="contained" color="primary">
        Users
    </Button>;
}

const View = Xindex;

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about/">About</Link>
                            </li>
                            <li>
                                <Link to="/users/">Users</Link>
                            </li>
                            <li>
                                <Link to="/login/">Login</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={View}/>
                    <Route path="/about/" component={About}/>
                    <Route path="/users/" component={Users}/>
                </div>
            </Router>
        );
    }
}

export default App;
