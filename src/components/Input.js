import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class InputValidate extends React.Component {
  static defaultProps = {
    required: false,
    onError: Function
  };

  constructor(props) {
    super(props);

    this.state = { helperText: "" };

    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(event) {
    if (this.props.required) {
      if (
        event.target.value === "" ||
        event.target.value === undefined ||
        event.target.value === null
      ) {
        this.setState({ helperText: "Dữ liệu không hợp lệ!" });
        this.props.onError(true);
      } else {
        this.setState({ helperText: "" });
        this.props.onError(false);
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <TextField
          {...this.props}
          onBlur={this.onBlur}
          value={this.props.value || ""}
        />
        <Typography color="error" variant="caption">
          {this.state.helperText || ""}
        </Typography>
      </React.Fragment>
    );
  }
}

export default InputValidate;
