import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import SideBar from "./Partials/SideBar";
import Avatar from "@material-ui/core/Avatar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard";
import Accounts from "../Accounts";
import RolesIndex from "../Roles";
import Promotions from "../Promotions";
import PromotionsEdit from "../Promotions/Edit"
import CreatePromotions from "../Promotions/Create"
import Translations from "../Translations";
import Settings from "../Settings";
import MobileAppVersion from "../MobileAppVersion";
import MobileAppVersionEdit from "../MobileAppVersion/edit";
import Banner from "../Banner";
import BannerEdit from "../Banner/edit";
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  content: {
    flexGrow: 1,
    padding: 0,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
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

class Home extends React.Component {
  state = {
    open: true
  };

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <Avatar
                src="https://material-ui.com/static/images/avatar/1.jpg"
                className={classes.avatar}
              />
              <div className={classes.userBox}>
                <span className={classes.userName}>Đô Cao</span>
                <span className={classes.userRole}>Quản Trị Hệ Thống</span>
              </div>
            </div>
            <Divider />
            <SideBar />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.contentInner}>
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/accounts" component={Accounts} />
                <Route path="/roles" component={RolesIndex} />
                <Route path="/promotions" component={Promotions} />
                <Route path="/promotions/create" component={CreatePromotions} />
                <Route path="/promotions/edit/:id" component ={PromotionsEdit}/>
                <Route
                  path="/mobile-app-version/edit"
                  component={MobileAppVersionEdit}
                />
                <Route
                  path="/mobile-app-version"
                  component={MobileAppVersion}
                />
                <Route path="/banner/edit/:id" component={BannerEdit} />
                <Route path="/banner" component={Banner} />
                <Route path="/translations" component={Translations} />
                <Route path="/settings" component={Settings} />
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
