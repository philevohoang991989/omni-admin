import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from "./List";
import Create from "./Create";
import Edit from "./Edit";
import View from "./View";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const styles = () => ({});

class Index extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/accounts" exact component={List}/>
                    <Route path="/accounts/create" component={Create}/>
                    <Route path="/accounts/:id(\d+)/edit" component={Edit}/>
                    <Route path="/accounts/:id(\d+)" component={View}/>
                </Switch>
            </Router>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);