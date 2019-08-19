import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from "@material-ui/core/es/Button/Button";
import accountsService from '../../Services/AccountsService';
import {Redirect} from "react-router-dom";
import OcbLoading from "../Core/OcbLoading";

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
        account: {
            userName: '',
            password: ''
        },
        loading: false
    };

    handleChange = name => event => {
        const account = this.state.account;
        account[name] = event.target.value;
        this.setState({account: account});
    };

    redirect = (path) => {
        this.setState({
            redirect: path
        })
    }

    validate() {
        return this.state.account.userName && this.state.account.password;
    }

    submit = () => {
        if (this.validate()) {
            accountsService.create(this.state.account).then(resp => {
                console.log('SUCCESS', resp);
                this.redirect('/accounts')
            }).catch(error => {
                console.error(error)
            }).then(() => {

            })
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
                {this.renderLoading()}
                {this.renderRedirect()}
                <Card>
                    <CardHeader title="Tạo Tài Khoản"/>
                    <CardContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                name="userName"
                                label="Tên đăng nhập"
                                className={classes.textField}
                                value={this.state.account.userName}
                                onChange={this.handleChange('userName')}
                                margin="normal"
                            />
                            <TextField
                                type="password"
                                name="password"
                                label="Mật khẩu"
                                placeholder="******"
                                className={classes.textField}
                                value={this.state.account.password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                            />
                        </form>
                    </CardContent>
                    <CardActions className={classes.alignRight}>
                        <Button size="small" color="primary" href="/accounts">
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