import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import mobileAppVersionService from "../../Services/MobileAppVersionService";
import moment from "moment";

const useStyle = () => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "left",
    padding: "10px"
  },
  button: {
    marginTop: "20px"
  }
});

class MobileAppVersion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileAppVerData: Object
    };
  }
  componentDidMount() {
    console.log("get ", mobileAppVersionService.getMobileAppVersion());
    mobileAppVersionService.getMobileAppVersion().then(res => {
      console.log("res ", res);
      if (res && res.data) {
        this.setState({ mobileAppVerData: res.data });
      } else {
        this.setState({ mobileAppVerData: null });
      }
    });
  }
  render() {
    const { classes } = this.props;
    const d = this.state.mobileAppVerData;
    if (!d || Object.keys(d).length === 0) {
      return (
        <Grid container className={classes.root}>
          Không tìm thấy dữ liệu
        </Grid>
      );
    }
    console.log("d ", d);
    return (
      <Grid container className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">iOS</Typography>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Version Name: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <Typography className={classes.paper}>
              {d.ios.CurrentVersionName}
            </Typography>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Version code: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <Typography className={classes.paper}>
              {d.ios.CurrenVersionCode}
            </Typography>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Date: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <Typography className={classes.paper}>
              {moment(d.ios.date).format("DD/MM/Y")}
            </Typography>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Message: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <Typography className={classes.paper}>{d.ios.message}</Typography>
          </Grid>
        </Grid>
        <Grid container style={{ paddingTop: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h6">Android</Typography>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Version Name: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <Typography className={classes.paper}>
              {d.android.CurrentVersionName}
            </Typography>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Version code: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <Typography className={classes.paper}>
              {d.android.CurrenVersionCode}
            </Typography>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Date: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <Typography className={classes.paper}>
              {moment(d.android.date).format("DD/MM/Y")}
            </Typography>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Message: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <Typography className={classes.paper}>
              {d.android.message}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            href="/mobile-app-version/edit"
            color="primary"
            className={classes.button}
          >
            Sửa
          </Button>
        </Grid>
      </Grid>
    );
  }
}

MobileAppVersion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyle)(MobileAppVersion);
