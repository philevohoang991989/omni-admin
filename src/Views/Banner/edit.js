import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Typography,
  Grid,
  FormControl,
  CardMedia
} from "@material-ui/core";
import InputValidate from "../../components/Input";
import BannerService from "../../Services/BannerService";
import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const editorConfiguration = {
  // toolbar: [
  //   "heading",
  //   "bold",
  //   "italic",
  //   "link",
  //   "bulletedList",
  //   "numberedList",
  //   "imageUpload",
  //   "blockQuote",
  //   "undo",
  //   "redo",
  //   "media"
  // ],
  // image: {
  //   toolbar: ["imageStyle:full", "imageStyle:side", "|", "imageTextAlternative"]
  // }
};

class BannerEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: {},
      isError: false,
      msg: ""
    };
  }
  componentDidMount() {
    const { match } = this.props;
    const service = new BannerService();
    service
      .getListBanner()
      .then(res => {
        if (res.data && res.success === true && res.data) {
          var b = res.data.find(d => d.id.toString() === match.params.id);
          console.log("b", b);
          if (b) {
            this.setState({
              banner: b,
              isError: false
            });
          } else {
            this.setState({
              msg: "Dữ liệu không tồn tại!",
              isError: true
            });
          }
        } else {
          this.setState({
            msg: "Có lỗi xảy ra!",
            isError: true
          });
        }
      })
      .catch(error => {
        this.setState({
          msg: (error.response && error.response.errorCode) || "",
          isError: true
        });
      });
  }

  onChangeImageUrl = element => {
    const value = element.target.value;
    const { banner } = this.state;
    this.setState({ banner: { ...banner, imageUrl: value } });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  getEditor = editor => {
    let e = new editor();
    console.log("editor", e);

    e.ui.view.editable.element.style.height = 200;
    return e;
  };
  render() {
    const d = this.state.banner;
    const { classes } = this.props;

    if (this.state.isError && this.state.msg) {
      return (
        <div>
          <Typography variant="caption" color="error">
            {this.state.msg}
          </Typography>
        </div>
      );
    }

    return (
      <div>
        <div>
          <Typography variant="h5">Chỉnh sửa Banner</Typography>
        </div>
        <Grid container>
          <Grid item xs={3} md={2}>
            <Typography variant="body2" className={classes.title}>
              Tiêu đề:
            </Typography>
          </Grid>
          <Grid item xs={9} md={10}>
            <Typography variant="body2" className={classes.bold}>
              Tiếng Việt:
            </Typography>
            <FormControl margin="none" fullWidth>
              <InputValidate
                id="curentVersionName"
                name="curentVersionName"
                value={d.titleVn}
                onChange={event =>
                  this.setState({
                    banner: { ...d, titleVn: event.target.value }
                  })
                }
                fullWidth
                InputProps={{
                  classes: {
                    input: classes.resize
                  }
                }}
              />
            </FormControl>
            <Typography variant="body2" className={classes.bold}>
              Tiếng Anh:
            </Typography>
            <FormControl margin="none" fullWidth>
              <InputValidate
                id="titleEl"
                name="titleEl"
                value={d.titleEl}
                onChange={event =>
                  this.setState({
                    banner: { ...d, titleEl: event.target.value }
                  })
                }
                fullWidth
                InputProps={{
                  classes: {
                    input: classes.resize
                  }
                }}
              />
            </FormControl>
            <Typography variant="body2" className={classes.bold}>
              Tiếng Hàn:
            </Typography>
            <FormControl margin="none" fullWidth>
              <InputValidate
                id="titleKr"
                name="titleKr"
                value={d.titleKr}
                onChange={event =>
                  this.setState({
                    banner: { ...d, titleKr: event.target.value }
                  })
                }
                fullWidth
                InputProps={{
                  classes: {
                    input: classes.resize
                  }
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3} md={2}>
            <Typography variant="body2" className={classes.title}>
              Hình (348x870)px:
            </Typography>
          </Grid>
          <Grid item xs={9} md={10}>
            <FormControl margin="none" fullWidth>
              {d.imageUrl && (
                <CardMedia className={classes.image} image={d.imageUrl || ""} />
              )}
              <InputValidate
                id="image"
                name="image"
                value={d.imageUrl}
                onChange={this.onChangeImageUrl}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3} md={2}>
            <Typography variant="body2" className={classes.title}>
              Mô tả:
            </Typography>
          </Grid>
          <Grid item xs={9} md={10}>
            <Typography variant="body2" className={classes.bold}>
              Tiếng Việt:
            </Typography>
            <div>
              <CKEditor
                editor={DecoupledEditor}
                data={d.descriptionVn}
                onInit={editor => {
                  // You can store the "editor" and use when it is needed.
                  //console.log("editor ", editor);
                  // work but not good
                  // editor.ui.view.editable.element.style.height = "300px";
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({
                    banner: { ...this.state.banner, descriptionVn: data }
                  });
                  //console.log("change ", { event, editor, data });
                }}
                onBlur={editor => {
                  //console.log("Blur.", editor);
                }}
                onFocus={editor => {
                  //console.log("Focus.", editor);
                }}
                config={editorConfiguration}
              />
            </div>
            <Typography variant="body2" className={classes.bold}>
              Tiếng Anh:
            </Typography>
            <FormControl margin="none" fullWidth>
              <InputValidate
                id="titleEl"
                name="titleEl"
                value={d.titleEl}
                onChange={event =>
                  this.setState({
                    banner: { ...d, titleEl: event.target.value }
                  })
                }
                fullWidth
                InputProps={{
                  classes: {
                    input: classes.resize
                  }
                }}
              />
            </FormControl>
            <Typography variant="body2" className={classes.bold}>
              Tiếng Hàn:
            </Typography>
            <FormControl margin="none" fullWidth>
              <InputValidate
                id="titleKr"
                name="titleKr"
                value={d.titleKr}
                onChange={event =>
                  this.setState({
                    banner: { ...d, titleKr: event.target.value }
                  })
                }
                fullWidth
                InputProps={{
                  classes: {
                    input: classes.resize
                  }
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const style = {
  bold: {
    fontWeight: "bold",
    marginTop: "20px"
  },
  title: { marginTop: "20px" },
  resize: { fontSize: "0.875rem" },
  image: {
    paddingRight: 0,
    maxWidth: "100%",
    maxHeight: "100%",
    marginTop: "20px",
    width: "400px",
    paddingTop: "160px"
  },
  editor: {
    border: "1px solid gray",
    minHeight: "300px"
  }
};
BannerEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(BannerEdit);
