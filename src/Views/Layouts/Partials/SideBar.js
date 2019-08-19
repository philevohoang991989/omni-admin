import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import LanguageIcon from "@material-ui/icons/Language";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = {
  sidebarItems: {
    paddingTop: 0
  },
  listItemText: {
    padding: 0
  },
  groupHeader: {
    paddingLeft: 12,
    textTransform: "uppercase"
  },
  active: {
    backgroundColor: "rgba(255, 255, 255, 0.12)"
  }
};

class SideBar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <List className={classes.sidebarItems}>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListSubheader className={classes.groupHeader} inset>
          Quản Trị Nội Dung
        </ListSubheader>
        <ListItem button component={Link} to="/promotions">
          <ListItemIcon>
            <CardGiftcardIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="Khuyến Mãi" />
        </ListItem>
        <ListItem button component={Link} to="/banner">
          <ListItemIcon>
            <CardGiftcardIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="Banner" />
        </ListItem>
        <ListItem button component={Link} to="/mobile-app-version">
          <ListItemIcon>
            <CardGiftcardIcon />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemText}
            primary="Phiên bản app OMNI"
          />
        </ListItem>

        <Divider />
        {/* <ListSubheader className={classes.groupHeader} inset>
          Quản Trị Người Dùng
        </ListSubheader>
        <ListItem button component={Link} to="/accounts">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="Tài Khoản" />
        </ListItem>
        <ListItem button component={Link} to="/roles">
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="Quyền Hạn" />
        </ListItem>
        <Divider />
        <ListSubheader className={classes.groupHeader} inset>
          Quản Trị Hệ Thống
        </ListSubheader>
        <ListItem button component={Link} to="/translations">
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemText}
            primary="Đa Ngôn Ngữ"
          />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="Cài Đặt" />
        </ListItem> */}
      </List>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBar);
