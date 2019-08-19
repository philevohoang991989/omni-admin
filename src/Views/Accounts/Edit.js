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
import OcbSelect from "../Core/OcbSelect";

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
    },
    form: {
        overflow: "visible"
    }
});

class Edit extends React.Component {

    state = {
        redirect: false,
        account: {
            id: '',
            userName: '',
            password: ''
        },
        loading: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        accountsService.get(id).then(account => {
            account['id'] = id;
            this.setState({
                account: account
            })
        }).catch(error => {
            console.error(error)
        })
    }

    validate() {
        return this.state.account.userName && this.state.account.password;
    }

    handleChange = name => event => {
        let account = this.state.account;
        account[name] = event.target.value;
        this.setState({account: account});
    };

    redirect = (path) => {
        this.setState({
            redirect: path
        })
    }

    submit = () => {
        if (this.validate()) {
            this.setState({
                loading: true
            });
            accountsService.save(this.state.account).then(resp => {
                this.redirect('/accounts')
            }).catch(error => {
                console.error(error)
            }).then(() => {
                this.setState({
                    loading: false
                });
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
                <Card className={classes.form}>
                    <CardHeader title="Cập Nhập Tài Khoản"/>
                    <CardContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                name="userName"
                                label="Tên đăng nhập"
                                placeholder="Nhâp tên đăng nhập..."
                                className={classes.textField}
                                value={this.state.account.userName || ''}
                                onChange={this.handleChange('userName')}
                                margin="normal"
                            />
                            <TextField
                                name="password"
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu..."
                                className={classes.textField}
                                value={this.state.account.password || ''}
                                onChange={this.handleChange('password')}
                                margin="normal"
                            />

                            <OcbSelect label="Quyền hạn" placeholder="Chọn quyền hạn..."/>

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

Edit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Edit);