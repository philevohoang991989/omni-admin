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

class View extends React.Component {

    state = {
        name: '',
        description: '',
        redirect: false,
        loading: false
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    redirect = (path) => {
        this.setState({
            redirect: path
        })
    }

    submit = event => {
        console.log('>>> submit', event);
        console.log(this);
        console.log(this.state);
        if (this.state.name && this.state.description) {
            rolesService.create({
                name: this.state.name,
                description: this.state.description
            }).then(resp => {
                console.log('SUCCESS', resp);
                this.redirect('/roles')
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
                    <CardHeader title="Tạo Role"/>
                    <CardContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                disabled
                                name="name"
                                label="Tên"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                disabled
                                name="description"
                                label="Mô tả"
                                className={classes.textField}
                                value={this.state.description}
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

View.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(View);