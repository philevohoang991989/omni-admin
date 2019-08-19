import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from "@material-ui/core/es/Button/Button";
import rolesService from '../../Services/RolesService';
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
        loading: false,
        role: {
            name: '',
            description: ''
        }
    };

    handleChange = name => event => {
        const role = this.state.role;
        role[name] = event.target.value;
        this.setState({role: role});
    };

    redirect = (path) => {
        this.setState({
            redirect: path
        })
    }

    validate() {
        return this.state.role.name && this.state.role.description;
    }

    submit = () => {
        if (this.validate()) {
            this.setState({
                loading: true
            });
            rolesService.create(this.state.role).then(resp => {
                console.log('SUCCESS', resp);
                this.redirect('/roles')
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
                {this.renderRedirect()}
                {this.renderLoading()}
                <Card>
                    <CardHeader title="Tạo Role"/>
                    <CardContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                name="name"
                                label="Tên"
                                className={classes.textField}
                                value={this.state.role.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                name="description"
                                label="Mô tả"
                                className={classes.textField}
                                value={this.state.role.description}
                                onChange={this.handleChange('description')}
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