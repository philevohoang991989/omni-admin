import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from "@material-ui/core/es/Button/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PromotionsService from "../../Services/PromotionsService";
import {
  Typography,
  Grid,
  FormControl,
  CardMedia
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import OcbLoading from "../Core/OcbLoading"

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: "100%",
    flexDirection: "column",
    margin: "auto"
  },
  textField: {},
  alignRight: {
    textAlign: "right",
    justifyContent: "flex-end"
  }
});

class Create extends React.Component {

  state = {
    redirect: false,
    notification: {
      distributedType: 1,
      type: 1,
      lstUserId: [],
      titleVn: "",
      titleEl: "",
      titleKr: "",
      descriptionVn: "",
      descriptionEl: "",
      descriptionKr: "",
      bodyVn: "",
      bodyEl: "",
      bodyKr: "",
      image: "",
      allOmnier: true
    },
    loading: false
  };

  handleChange = name => event => {
    const notification = this.state.notification;
    notification[name] = event.target.value;
    this.setState({ notification: notification });
  };

  redirect = (path) => {
    this.setState({
      redirect: path
    })
  }

  validate() {
    return this.state.notification.name && this.state.notification.description;
  }

  submit = event => {
    console.log('>>> submit', event);
    const service = new PromotionsService();
    // console.log(this);
    console.log(this.state);
    service.creatPromotion(this.state.notification).then(resp => {
      console.log('SUCCESS', resp);
      this.redirect('/promotions')
    }).catch(error => {
      console.error(error)
    }).then(() => {

    })
  }

  renderRedirect() {
    if (this.state.redirect !== false) {
      return <Redirect to={this.state.redirect} />
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <OcbLoading />
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.renderLoading()}
        {this.renderRedirect()}
        <Card>
          <CardHeader title="Tạo Promotions" />
          <CardContent>
            <form className={classes.container} noValidate autoComplete="off">
              <Grid container>
                <Grid item md={2} xs={4}>
                  <Typography className={classes.paper}>Type: </Typography>
                </Grid>
                <Grid item md={10} xs={8}>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={this.state.notification.type}
                      onChange={event => {
                        this.setState({
                          notification: { ...this.state.notification, type: event.target.value }
                        });
                      }}
                      inputProps={{
                        name: "age",
                        id: "age-simple"
                      }}
                    >
                      <MenuItem value={"1"} style={{ width: "100%" }}>THÔNG BÁO</MenuItem>
                      <MenuItem value={"2"} style={{ width: "100%" }}>KHUYẾN MÃI</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl component="fieldset" className={classes.formControl} style={{ paddingTop: "20px" }}>
                <Grid container>
                  <Grid item md={2} xs={4}>
                    <Typography className={classes.paper}>Distributed Type: </Typography>
                  </Grid>
                  <Grid item md={10} xs={8}>
                    <FormControl className={classes.formControl}>
                      <Select
                        value={this.state.notification.distributedType}
                        onChange={event => {
                          this.setState({
                            notification: { ...this.state.notification, distributedType: event.target.value }
                          });
                        }}
                        inputProps={{
                          name: "age",
                          id: "age-simple"
                        }}
                      >
                        <MenuItem value={"1"} style={{ width: "100%" }}>noti chỉ show khi vào app click chuông icon</MenuItem>
                        <MenuItem value={"2"} style={{ width: "100%" }}>noti sẽ gửi qua FIREBASE</MenuItem>
                        <MenuItem value={"3"} style={{ width: "100%" }}>All</MenuItem>
                      </Select>
                    </FormControl>

                  </Grid>
                </Grid>
              </FormControl>
              <TextField
                name="titleVn"
                label="Tiêu đề VN"
                className={classes.textField}
                value={this.state.notification.titleVn}
                onChange={this.handleChange('titleVn')}
                margin="normal"
              />
              <TextField
                name="titleEl"
                label="Tiêu đề EL"
                className={classes.textField}
                value={this.state.notification.titleEl}
                onChange={this.handleChange('titleEl')}
                margin="normal"
              />
              <TextField
                name="titleKr"
                label="Tiêu đề KR"
                className={classes.textField}
                value={this.state.notification.titleKr}
                onChange={this.handleChange('titleKr')}
                margin="normal"
              />
              <TextField
                name="descriptionVn"
                label="Mô tả ngắn VN"
                className={classes.textField}
                value={this.state.notification.descriptionVn}
                onChange={this.handleChange('descriptionVn')}
                margin="normal"
              />
              <TextField
                name="descriptionEl"
                label="Mô tả ngắn EL"
                className={classes.textField}
                value={this.state.notification.descriptionEl}
                onChange={this.handleChange('descriptionEl')}
                margin="normal"
              />
              <TextField
                name="descriptionKr"
                label="Mô tả ngắn KR"
                className={classes.textField}
                value={this.state.notification.descriptionKr}
                onChange={this.handleChange('descriptionKr')}
                margin="normal"
              />
              <TextField
                name="bodyVn"
                label="Mô tả VN"
                className={classes.textField}
                value={this.state.notification.bodyVn}
                onChange={this.handleChange('bodyVn')}
                margin="normal"
              />
              <TextField
                name="bodyEl"
                label="Mô tả EL"
                className={classes.textField}
                value={this.state.notification.bodyEl}
                onChange={this.handleChange('bodyEl')}
                margin="normal"
              />
              <TextField
                name="bodyKr"
                label="Mô tả KR"
                className={classes.textField}
                value={this.state.notification.bodyKr}
                onChange={this.handleChange('bodyKr')}
                margin="normal"
              />
            </form>
          </CardContent>
          <CardActions className={classes.alignRight}>
            <Button size="small" color="primary" href="/roles">
              Hủy
                        </Button>
            <Button size="small" color="primary" onClick={this.submit}>
              Lưu
                        </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Create);