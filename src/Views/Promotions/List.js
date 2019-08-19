import React from "react";
import PropTypes from "prop-types";
import PromotionsService from '../../Services/PromotionsService';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Button,
    CardMedia,
    withStyles
} from "@material-ui/core";
// import AddIcon from '@material-ui/icons/Add';
// import green from '@material-ui/core/colors/green';
// import { Link, Redirect } from "react-router-dom";
// import OcbLoading from "../Core/OcbLoading"
// import OcbAlert from "../Core/OcbAlert";


const styles = () => ({
    tableContainer: {
        width: "1000px",
        overflowX: "none",
        boxShadow: "none"
    },
    table: {
        minWidth: 700
    },
    image: {
        paddingRight: 0,
        maxWidth: "100%",
        maxHeight: "100%",
        paddingTop: "100px"
    },
    imageStyle: {
        width: "200px",
        "overflow-x": "auto"
    },
    bold: {
        fontWeight: "bold"
    }
});

class Promotions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            msg: "",
            isError: false
        };
        this.strrselect = []
    }

    componentDidMount() {
        const service = new PromotionsService();
        service
            .getListPromotions()
            .then(res => {
                if (res.data && res.success === true && res.data) {
                    this.setState({
                        data: res.data,
                        isError: false
                    });
                } else {
                    this.setState({
                        msg: "Có lỗi xảy ra!",
                        isError: true
                    });
                }
            })
            .catch(error => {
                this.setState({
                    msg: error.response.errorCode,
                    isError: true
                });
            });
    }

    createMarkup(data) {
        return {
            __html: data
        };
    }
    delePromo = event => {
        let arr = [];
        let { data } = this.state;
        console.log('>>> submit', this.strrselect);
        for (let i = 0; i < data.length; i++) {
            if (data[i] && this.strrselect.indexOf(data[i].id) >= 0) {
                arr.push(data[i].id)
            }
        }
        console.log('>>> submit', arr);
        const service = new PromotionsService();
        // console.log(this);
        console.log(this.state);
        let lstIdNoti = {
            lstIdNoti: arr
        }
        service.deletePromotion(lstIdNoti).then(resp => {
            console.log('SUCCESS', resp);
            this.redirect('/promotions')
        }).catch(error => {
            console.error(error)
        }).then(() => {

        })
    }

    render() {
        const { classes } = this.props;
        const data = this.state.data;
        if (this.state.isError) {
            return (
                <Typography color="error" variant="caption">
                    {this.state.msg}
                </Typography>
            );
        }
        return (
            <Paper className={classes.tableContainer}>
                <Table width="2000px" style={{ width: "2000px" }} size="medium">
                    <thead>
                        <TableRow>
                            <TableCell >
                                <Button
                                    variant="contained"
                                    style={{ marginLeft: "25%" }}
                                    color="primary"
                                    className={classes.button}
                                    href="/promotions/create"
                                >
                                    Thêm
                                </Button>
                                <Button size="small" color="primary" onClick={this.delePromo}>
                                    Xóa
                        </Button>
                            </TableCell>
                            <TableCell style={{ padding: "0" }}>ID</TableCell>
                            <TableCell style={{ padding: "0" }}>Tiêu đề</TableCell>
                        </TableRow>
                    </thead>
                    <TableBody>
                        {data
                            ? data.map(n => (
                                <TableRow key={n.id}>
                                    <TableCell>
                                        <FormControlLabel
                                            control={<Checkbox
                                                value={n.id}
                                                onChange={event =>
                                                    this.setState({
                                                        promo: { ...n, id: event.target.value }
                                                    }, () => {
                                                        this.strrselect += n.id + ','
                                                        console.log(this.strrselect)
                                                    })
                                                }
                                            />}
                                            label=""
                                        />
                                        <Button
                                            color="primary"
                                            size="small"
                                            variant="contained"
                                            href={"/promotions/edit/" + n.id}
                                        >
                                            Sửa
                                    </Button>

                                    </TableCell>
                                    <TableCell style={{ padding: "0" }}>
                                        <div style={{ width: "50px" }}>{n.id}</div>
                                    </TableCell>
                                    <TableCell style={{ padding: "0" }}>
                                        <div style={{ width: "300px" }}>
                                            <Typography variant="body2" className={classes.bold}>
                                                Tiếng Việt:
                        </Typography>
                                            <Typography variant="body2">{n.titleVn}</Typography>
                                            <Typography variant="body2" className={classes.bold}>
                                                Tiếng Anh:
                        </Typography>
                                            <Typography variant="body2">{n.titleEl}</Typography>
                                            <Typography variant="body2" className={classes.bold}>
                                                Tiếng Hàn:
                        </Typography>
                                            <Typography variant="body2">{n.titleKr}</Typography>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                            : null}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

Promotions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Promotions);