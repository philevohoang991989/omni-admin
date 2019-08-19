import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "./List";
import Edit from "./Edit"
import Create from "./Create"

const styles = {
    tableContainer: {
        width: '100%',
        overflowX: 'auto',
        boxShadow: 'none'
    },
    table: {
        minWidth: 700,
    },
    avatar: {
        paddingRight: 0,
        width: 40
    }
};

let id = 0;

function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const data = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Promotions(props) {

    const { classes } = props;

    return (
        <Router>
            <Switch>
                <Route path="/promotions" exact component={List} />
                <Route path="/promotions/edit/:id" component={Edit} />
                <Route path="/promotions/create" component={Create} />
            </Switch>
        </Router>
    );
}

Promotions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Promotions);