import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {CircularProgress,} from '@material-ui/core';

const styles = () => ({
    loading: {
        textAlign: "center",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 48, 140, 0.24)",
        zIndex: "9999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

class OcbLoading extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.loading}>
                <CircularProgress/>
            </div>
        );
    }
}

OcbLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OcbLoading);