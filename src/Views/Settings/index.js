import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

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
    },
    chip: {
        marginRight: 8
    }
};

class Settings extends React.Component {

    data = [];

    constructor(props) {
        super(props);
        this.data.push({
            id: 1,
            username: 'Frozen yoghurt',
            roles: ['ROLE1', 'ROLE2', 'ROLE3']
        })
        this.data.push({
            id: 2,
            username: 'Ice cream sandwich',
            roles: ['ROLE2', 'ROLE3']
        })
        this.data.push({
            id: 3,
            username: 'Eclair',
            roles: ['ROLE1', 'ROLE3']
        })
        this.data.push({
            id: 4,
            username: 'Gingerbread',
            roles: ['ROLE1', 'ROLE2']
        })
    }

    render() {

        const {classes} = this.props;

        return (
            <Paper className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Thuộc tính</TableCell>
                            <TableCell align="right">Giá trị</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.data.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell align="right">
                                    {row.roles.map((role, i) => {
                                        return (<Chip label={role} className={classes.chip}/>)
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);