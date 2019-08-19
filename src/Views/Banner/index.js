import React from "react";
import PropTypes from "prop-types";
import BannerService from "../../Services/BannerService";
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

const style = () => ({
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

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      msg: "",
      isError: false
    };
  }

  componentDidMount() {
    const service = new BannerService();
    service
      .getListBanner()
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
              <TableCell />
              <TableCell style={{ padding: "0" }}>ID</TableCell>
              <TableCell style={{ padding: "0" }}>Tiêu đề</TableCell>
              <TableCell style={{ padding: "0" }} align="left">
                Hình
              </TableCell>
              <TableCell style={{ padding: "0" }} align="left">
                Mô tả
              </TableCell>
              <TableCell style={{ padding: "0" }} align="left">
                Link
              </TableCell>
              <TableCell style={{ padding: "0" }} align="left">
                Target
              </TableCell>
              <TableCell style={{ padding: "0" }} align="left">
                Thứ tự
              </TableCell>
              <TableCell style={{ padding: "0" }} align="left">
                Nhóm
              </TableCell>
              <TableCell style={{ padding: "0" }} align="left">
                Đang hoạt động
              </TableCell>
            </TableRow>
          </thead>
          <TableBody>
            {data
              ? data.map(n => (
                  <TableRow key={n.id}>
                    <TableCell>
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        href={"/banner/edit/" + n.id}
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
                    <TableCell>
                      <div className={classes.imageStyle}>
                        <CardMedia
                          className={classes.image}
                          image={n.imageUrl}
                        />
                        <Typography variant="caption">{n.imageUrl}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className={classes.bold}>
                        Tiếng Việt:
                      </Typography>

                      <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={this.createMarkup(
                          n.descriptionVn
                        )}
                      />
                      <Typography variant="body2" className={classes.bold}>
                        Tiếng Anh:
                      </Typography>
                      <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={this.createMarkup(
                          n.descriptionEl
                        )}
                      />
                      <Typography variant="body2" className={classes.bold}>
                        Tiếng Hàn:
                      </Typography>
                      <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={this.createMarkup(
                          n.descriptionKr
                        )}
                      />
                    </TableCell>
                    <TableCell>{n.href}</TableCell>
                    <TableCell>{n.target}</TableCell>
                    <TableCell>{n.displayOrder}</TableCell>
                    <TableCell>{n.group}</TableCell>
                    <TableCell>{n.acitve}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Banner);
