import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Fab, Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import accountsService from '../../Services/AccountsService';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';
import {Link, Redirect} from "react-router-dom";
import OcbLoading from "../Core/OcbLoading"
import OcbAlert from "../Core/OcbAlert";

const styles = theme => ({
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
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
    },
    actionColumn: {
        width: "100px"
    },
    link: {
        color: "#0021d8",
        textDecoration: "underline",
        cursor: "pointer",
        '&:hover': {
            textDecoration: "none"
        }
    }
});

class Accounts extends React.Component {

    state = {
        items: [],
        loading: false,
        redirect: false
    };

    componentDidMount() {
        this.search()
    }

    redirect = (path) => {
        this.setState({
            redirect: path
        })
    }

    reload() {
        this.search();
    }

    search() {
        this.setState({
            loading: true
        });
        accountsService.search().then(response => {
            this.setState({
                items: response.content || []
            })

        }).catch(error => {
            console.error(error)
        }).then(() => {
            this.setState({
                loading: false
            });
        })
    }

    edit(id, e) {
        e.preventDefault();
        this.redirect('/accounts/' + id + '/edit');
    }

    delete(id, e) {
        e.preventDefault();
        const _ = this;
        const alert = _.alert;
        if (alert) {
            alert.show(() => {
                accountsService.delete(id).then(() => {
                    console.log('Deleted successfully!!!');
                    _.reload();
                    alert.hide();
                })
            });
        }
    }

    renderRedirect() {
        if (this.state.redirect !== false) {
            return <Redirect to={this.state.redirect}/>
        }
    }

    renderLoading() {
        if (this.state.loading) {
            return (
                <OcbLoading/>
            );
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>

                <OcbAlert
                    innerRef={alert => {
                        this.alert = alert;
                    }}
                    title="Bạn có chắt là muốn tiếp tục?"
                    content="Dữ liệu sẽ bị xóa vĩnh viễn, bạn không thể phục hồi lại."
                />

                {this.renderLoading()}
                {this.renderRedirect()}
                <Paper className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên đăng nhập</TableCell>
                                <TableCell>Tình trạng</TableCell>
                                <TableCell className={classes.actionColumn}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.items.map(row => (
                                <TableRow key={row.userName}>
                                    <TableCell component="th" scope="row">
                                        {row.userName}
                                    </TableCell>
                                    <TableCell>
                                        {row.status}
                                    </TableCell>
                                    <TableCell>
                                        <a href={'#edit-' + row.id} className={classes.link}
                                           onClick={e => this.edit(row.id, e)}>Sửa</a>
                                        &nbsp;&nbsp;&nbsp;
                                        <a href={'#' + row.id} className={classes.link}
                                           onClick={e => this.delete(row.id, e)}>Xóa</a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Fab className={classes.fab} color="primary" component={Link} to="/accounts/create">
                    <AddIcon/>
                </Fab>
            </div>
        );
    }
}

Accounts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Accounts);