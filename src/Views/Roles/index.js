import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from "./List";
import Create from "./Create";
import Edit from "./Edit";
import View from "./View";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const styles = () => ({});

class RolesIndex extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/roles" exact component={List}/>
                    <Route path="/roles/create" component={Create}/>
                    <Route path="/roles/:id(\d+)/edit" component={Edit}/>
                    <Route path="/roles/:id(\d+)" component={View}/>
                </Switch>
            </Router>
        );
    }
}

RolesIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RolesIndex);