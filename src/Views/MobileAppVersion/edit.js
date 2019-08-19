import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import mobileAppVersionService from "../../Services/MobileAppVersionService";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import InputValidate from "../../components/Input";

const style = () => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "left",
    padding: "10px"
  },
  button: {
    marginTop: "20px"
  },
  textFieldA: {
    padding: "10px",
    color: "#054000"
  }
});

class MobileAppVersionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileAppVerData: null,
      isError: false,
      isUpdate: false,
      msg: ""
    };
  }

  componentDidMount() {
    mobileAppVersionService.getMobileAppVersion().then(res => {
      if (res && res.data) {
        this.setState({ mobileAppVerData: res.data });
      } else {
        this.setState({ mobileAppVerData: null });
      }
    });
  }

  changeDate(date) {
    let d = this.state.mobileAppVerData;
    d.ios.date = date;
    this.setState({
      mobileAppVerData: d,
      isError: false
    });
  }

  onChangeIOSVerName(event, d) {
    this.setState({
      mobileAppVerData: {
        ...d,
        ios: { ...d.ios, CurrentVersionName: event.target.value }
      }
    });
  }

  onError(data) {
    this.setState({ isError: data });
  }

  doUpdate() {
    mobileAppVersionService
      .updateMobileAppVersion(this.state.mobileAppVerData)
      .then(res => {
        if (res.data && res.data.data === true && res.data.success === true) {
          this.setState({ isUpdate: true });
          this.setState({ msg: "Cập nhật thành công!" });
          window.location.href = "/mobile-app-version";
        } else {
          this.setState({ isUpdate: false });
          this.setState({ msg: "Có lỗi xảy ra! " + res.data.errorCode });
        }
      });
  }

  render() {
    const d = this.state.mobileAppVerData;
    const { classes } = this.props;

    if (!d || Object.keys(d).length === 0) {
      return (
        <Grid container className={classes.root}>
          Không tìm thấy dữ liệu
        </Grid>
      );
    }

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
            <FormControl margin="normal" required>
              <InputValidate
                id="curentVersionName"
                name="curentVersionName"
                onChange={event => {
                  this.onChangeIOSVerName(event, d);
                }}
                onError={data => this.onError(data)}
                autoFocus
                value={d.ios.CurrentVersionName}
                required
              />
            </FormControl>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Version code: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <FormControl margin="normal" required>
              <InputValidate
                id="curentVersionCode"
                name="curentVersionCode"
                onChange={event => {
                  this.setState({
                    mobileAppVerData: {
                      ...d,
                      ios: { ...d.ios, CurrenVersionCode: event.target.value }
                    }
                  });
                }}
                onError={data => this.onError(data)}
                autoFocus
                value={d.ios.CurrenVersionCode}
                type="number"
                required
              />
            </FormControl>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Date: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                value={moment(d.ios.date)}
                format="DD/MM/YYYY"
                autoOk
                onChange={date => {
                  this.setState({
                    mobileAppVerData: {
                      ...d,
                      ios: { ...d.ios, date: date }
                    }
                  });
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Message: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <FormControl className={classes.formControl}>
              <Select
                value={d.ios.message}
                onChange={event => {
                  this.setState({
                    mobileAppVerData: {
                      ...d,
                      ios: { ...d.ios, message: event.target.value }
                    }
                  });
                }}
                inputProps={{
                  name: "age",
                  id: "age-simple"
                }}
              >
                <MenuItem value={"Require"}>Require</MenuItem>
                <MenuItem value={"Optional"}>Optional</MenuItem>
              </Select>
            </FormControl>
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
            <FormControl margin="normal" required>
              <Input
                id="curentAndroidVersionName"
                name="curentAndroidVersionName"
                autoFocus
                value={d.android.CurrentVersionName}
                onError={data => this.onError(data)}
                onChange={event => {
                  this.setState({
                    mobileAppVerData: {
                      ...d,
                      android: {
                        ...d.android,
                        CurrentVersionName: event.target.value
                      }
                    }
                  });
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Version code: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <FormControl margin="normal" required>
              <Input
                id="currentAndroidVersionCode"
                name="currentAndroidVersionCode"
                autoFocus
                value={d.android.CurrenVersionCode}
                onError={data => this.onError(data)}
                onChange={event => {
                  this.setState({
                    mobileAppVerData: {
                      ...d,
                      android: {
                        ...d.android,
                        CurrenVersionCode: event.target.value
                      }
                    }
                  });
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Date: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                value={moment(d.android.date)}
                format="DD/MM/YYYY"
                autoOk
                onChange={date => {
                  this.setState({
                    mobileAppVerData: {
                      ...d,
                      android: { ...d.android, date: date }
                    }
                  });
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={2} xs={4}>
            <Typography className={classes.paper}>Message: </Typography>
          </Grid>
          <Grid item md={10} xs={8}>
            <FormControl className={classes.formControl}>
              <Select
                value={d.android.message}
                onChange={event => {
                  this.setState({
                    mobileAppVerData: {
                      ...d,
                      android: { ...d.android, message: event.target.value }
                    }
                  });
                }}
                inputProps={{
                  name: "age",
                  id: "age-simple"
                }}
              >
                <MenuItem value={"Require"}>Require</MenuItem>
                <MenuItem value={"Optional"}>Optional</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Typography
            color={
              this.state.isUpdate === true && this.state.msg !== ""
                ? "primary"
                : "error"
            }
            variant="caption"
          >
            {this.state.msg}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.doUpdate()}
            {...(this.state.isError ? { disabled: true } : {})}
          >
            Đồng ý
          </Button>
        </Grid>
      </Grid>
    );
  }
}

MobileAppVersionEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(MobileAppVersionEdit);
