import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import authService from '../../Services/AuthService';

const styles = theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    error: {
        color: "#f00"
    }
});

class LoginForm extends React.Component {

    state = {
        username: '',
        password: '',
        rememberMe: '0',
        error: false
    }

    handleChange = name => event => {
        name = name || event.target.getAttribute('name')
        this.setState({[name]: event.target.value});
    };

    doLogin = (e) => {
        e.preventDefault()
        if (this.state.username && this.state.password) {
            this.error = null;
            authService.login(this.state).then(() => {
                window.location.reload();
            }).catch(error => {
                let data = error.response.data;
                this.setState({
                    error: data.message
                });
            });
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">Tên Đăng Nhập</InputLabel>
                    <Input id="username" name="username" autoFocus value={this.state.username}
                           onChange={this.handleChange()}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Mật Khẩu</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password"
                           value={this.state.password} onChange={this.handleChange()}/>
                </FormControl>

                {this.state.error &&
                <div className={classes.error}>
                    {this.state.error}
                </div>
                }

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.doLogin}
                >
                    Đăng Nhập
                </Button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);