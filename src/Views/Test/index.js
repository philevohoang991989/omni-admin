import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {mainListItems, secondaryListItems} from './listItems';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import Avatar from '@material-ui/core/Avatar';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    content: {
        flexGrow: 1,
        padding: 0,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    contentInner: {
        padding: 16
    },
    avatar: {
        marginRight: 12
    },
    userBox: {
        display: "flex",
        flexDirection: "column"
    },
    userName: {
        color: "#5a5a5a",
        fontWeight: "bold"
    },
    userRole: {
        color: "#5a5a5a",
        fontSize: 12
    }
});

class Dashboard extends React.Component {
    state = {
        open: true,
    };

    // toggleDrawer = () => {
    //     this.setState({open: !this.state.open});
    // };
    //
    // renderChevronIcon() {
    //     if (this.state.open) {
    //         return <ChevronLeftIcon/>
    //     } else {
    //         return <ChevronRightIcon/>
    //     }
    // }

    render() {
        const {classes} = this.props;

        return (
            <Router>
                <div className={classes.root}>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbarIcon}>
                            <Avatar src="https://material-ui.com/static/images/avatar/1.jpg"
                                    className={classes.avatar}/>
                            <div className={classes.userBox}>
                                <span className={classes.userName}>Đô Cao</span>
                                <span className={classes.userRole}>Quản Trị Hệ Thống</span>
                            </div>

                        </div>
                        <Divider/>
                        <List>{mainListItems}</List>
                        <Divider/>
                        <List>{secondaryListItems}</List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.contentInner}>
                            <Route path="/" exact component={View}/>
                            <Typography variant="h4" gutterBottom component="h2">
                                Orders
                            </Typography>
                            <Typography component="div" className={classes.chartContainer}>
                                <SimpleLineChart/>
                            </Typography>
                            <Typography variant="h4" gutterBottom component="h2">
                                Products
                            </Typography>
                            <div className={classes.tableContainer}>
                                <SimpleTable/>
                            </div>
                        </div>
                    </main>
                </div>
            </Router>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);