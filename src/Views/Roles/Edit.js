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

class Edit extends React.Component {

    state = {
        redirect: false,
        role: {
            id: '',
            name: '',
            description: ''
        },
        loading: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        rolesService.get(id).then(role => {
            role['id'] = id;
            this.setState({
                role: role
            })
        }).catch(error => {
            console.error(error)
        })
    }

    validate() {
        return this.state.role.name && this.state.role.description;
    }

    handleChange = name => event => {
        let role = this.state.role;
        role[name] = event.target.value;
        this.setState({role: role});
    };

    redirect = (path) => {
        this.setState({
            redirect: path
        })
    }

    submit = () => {
        let $this = this;
        if ($this.validate()) {
            $this.setState({
                loading: true
            });
            rolesService.save(this.state.role).then(() => {
                this.redirect('/roles')
            }).catch(error => {
                console.error(error)
            }).then(() => {
                $this.setState({
                    loading: false
                })
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
                    <CardHeader title="Câp Nhập Role"/>
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

Edit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Edit);