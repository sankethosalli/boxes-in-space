import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
// import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
const logger = require("../../../log/log");

const Category = (props) => {
  const [check, setCheck] = useState(() => true);

  const handleInputChange = (event) => {
    const checkValue = !check;

    setCheck(checkValue, props.handleInputChange(event));
    // logger.debug(checkValue, "checkValue");

    return checkValue;
  };

  return (
    <div className={"Category " + props.className}>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">{props.category}</div>
        <div className="col-3">
          <FormControlLabel
            name={props.category}
            value={check}
            control={<Checkbox color="primary" />}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
