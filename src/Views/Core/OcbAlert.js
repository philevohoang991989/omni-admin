import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {CircularProgress,} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = () => ({
    loadingContainer: {
        width: '160px',
        height: '100px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff'
    }
});

class OcbAlert extends React.Component {

    state = {
        open: false,
        loading: false,
        title: '',
        content: '',
        okText: '',
        cancelText: ''
    };

    constructor(props) {
        super(props);
        this.callback = null;
    }

    componentDidMount() {
        this.setState({
            title: this.props['title'],
            content: this.props['content'],
            okText: this.props['okText'],
            cancelText: this.props['cancelText']
        });
    }

    setTitle = (title) => {
        this.setState({
            title: title
        });
    }

    setContent = (content) => {
        this.setState({
            content: content
        });
    }

    showLoading = () => {
        this.setState({
            loading: true
        });
    }

    hideLoading = () => {
        this.setState({
            loading: false
        });
    }

    show = (callback) => {
        this.setState({
            open: true
        });
        this.callback = callback;
    };

    hide = () => {
        this.setState({
            open: false
        });
    };

    doOk() {
        this.showLoading();
        if (typeof this.callback === 'function') {
            this.callback.apply(this);
        }
    }

    renderTitle() {
        if (this.state.title && !this.state.loading) {
            return (
                <DialogTitle>{this.state.title}</DialogTitle>
            );
        }
    }

    renderContent() {
        if (this.state.content && !this.state.loading) {
            return (
                <DialogContent>
                    <DialogContentText>
                        {this.state.content}
                    </DialogContentText>
                </DialogContent>
            );
        }
    }

    renderLoading() {
        if (this.state.loading) {
            const {classes} = this.props;
            return (
                <div className={classes.loadingContainer}>
                    <CircularProgress/>
                </div>
            );
        }
    }

    renderActions() {
        if (!this.state.loading) {
            return (
                <DialogActions>
                    <Button onClick={this.hide} color="primary">
                        {this.state.cancelText || 'Hủy'}
                    </Button>
                    <Button onClick={() => {
                        this.doOk()
                    }} color="primary" autoFocus>
                        {this.state.okText || 'Đồng Ý'}
                    </Button>
                </DialogActions>
            );
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    handler={this.props['handler']}
                >
                    {this.renderLoading()}
                    {this.renderTitle()}
                    {this.renderContent()}
                    {this.renderActions()}
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(OcbAlert);