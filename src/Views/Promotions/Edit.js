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
import PromotionsService from "../../Services/PromotionsService";
import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import Button from "@material-ui/core/Button";

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

class PromotionsEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promo: {},
            isError: false,
            msg: ""
        };
    }
    componentDidMount() {
        const { match } = this.props;
        const service = new PromotionsService();
        service
            .getListPromotions()
            .then(res => {
                if (res.data && res.success === true && res.data) {
                    var b = res.data.find(d => d.id.toString() === match.params.id);
                    console.log("b", b);
                    if (b) {
                        this.setState({
                            promo: b,
                            isError: false
                        }, () => { console.log('promo', b) });
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
        const { promo } = this.state;
        this.setState({ promo: { ...promo, imageUrl: value } });
    };

    onEditorStateChange = editorState => {
        this.setState({
            editorState
        });
    };

    getEditor = editor => {
        let e = new editor();

        e.ui.view.editable.element.style.height = 200;
        return e;
    };


    doUpdate() {
        const service = new PromotionsService();
        service
            .updatePromotion(this.state.promo)
            .then(res => {
                if (res.data && res.data.data === true && res.data.success === true) {
                    this.setState({ isUpdate: true });
                    this.setState({ msg: "Cập nhật thành công!" });
                    window.location.href = "promotions";
                } else {
                    this.setState({ isUpdate: false });
                    this.setState({ msg: "Có lỗi xảy ra! " + res.data.errorCode });
                }
            });
    }

    render() {
        console.log('PromotionsEdit')
        const d = this.state.promo;
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
                    <Typography variant="h5">Chỉnh sửa Tin khuyến mãi</Typography>
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
                                        promo: { ...d, titleVn: event.target.value }
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
                                        promo: { ...d, titleEl: event.target.value }
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
                                        promo: { ...d, titleKr: event.target.value }
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
                            Mô tả ngắn:
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
                                        promo: { ...this.state.promo, descriptionVn: data }
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
                        <div>
                            <CKEditor
                                editor={DecoupledEditor}
                                data={d.descriptionEl}
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    //console.log("editor ", editor);
                                    // work but not good
                                    // editor.ui.view.editable.element.style.height = "300px";
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        promo: { ...this.state.promo, descriptionVn: data }
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
                            Tiếng Hàn:
                        </Typography>
                        <div>
                            <CKEditor
                                editor={DecoupledEditor}
                                data={d.descriptionKr}
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    //console.log("editor ", editor);
                                    // work but not good
                                    // editor.ui.view.editable.element.style.height = "300px";
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        promo: { ...this.state.promo, descriptionVn: data }
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
                                data={d.bodyVn}
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    //console.log("editor ", editor);
                                    // work but not good
                                    // editor.ui.view.editable.element.style.height = "300px";
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        promo: { ...this.state.promo, bodyVn: data }
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
                        <div>
                            <CKEditor
                                editor={DecoupledEditor}
                                data={d.bodyEl}
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    //console.log("editor ", editor);
                                    // work but not good
                                    // editor.ui.view.editable.element.style.height = "300px";
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        promo: { ...this.state.promo, bodyEl: data }
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
                            Tiếng Hàn:
                        </Typography>

                        <div>
                            <CKEditor
                                editor={DecoupledEditor}
                                data={d.bodyKr}
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    //console.log("editor ", editor);
                                    // work but not good
                                    // editor.ui.view.editable.element.style.height = "300px";
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        promo: { ...this.state.promo, bodyKr: data }
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
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.doUpdate()}
                        {...(this.state.isError ? { disabled: true } : {})}
                    >
                        Đồng ý
          </Button>
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
PromotionsEdit.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(PromotionsEdit);
