import React, { useState } from "react";
import "./AddCategory.css";
import createNotification from "../../../assets/nativelib/js/notification";
import { makeHTTPPOSTRequestAuthorized } from "../../../services/http";
const config = require("../../../configs/config");
const logger = require("../../../log/log");

const AddCategory = () => {
  const [data, setData] = useState(() => {
    return {
      Category: "",
      Description: "",
    };
  });

  const resetInputs = () => {
    const resetDict = {};
    for (const [key, value] of Object.entries(data)) {
      resetDict[key] = "";
    }
    setData(() => {
      return resetDict;
    });
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    return makeHTTPPOSTRequestAuthorized(
      `${config.api.apiBaseUrl}/shortener/create-category/`,
      { Category: data.Category, Description: data.Description }
    )
      .then((response) => {
        // logger.debug({ re: response }, "");
        if (response.message === "success") {
          resetInputs();
          createNotification({
            title: "Succesful",
            message: "Category Added",
            type: "success",
          });
        } else {
          if (response.err) {
            const errList = response.err;

            for (let i = 0; i < errList.length; i++) {
              for (const [key, value] of Object.entries(errList[i])) {
                // console.log(key, value);
                createNotification({
                  title: value.errorTitle,
                  message: value.errorMsg,
                  type: value.errorType,
                });
              }
            }
          } else {
            createNotification({
              title: "Error",
              message: "Unknown Error Occured",
              type: "danger",
            });
          }
        }
      })
      .catch((err) => {
        // logger.debug({ err }, "");
        createNotification({
          title: "Error",
          message: "Unknown Error Occured",
          type: "danger",
        });
      });
  };

  const handleInputChange = (event) => {
    setData(() => {
      return { ...data, [event.target.name]: event.target.value };
    });
  };

  return (
    <div className="AddUrl">
      <form onSubmit={handleInputSubmit}>
        <h3>Add Category</h3>
        <div class="placeholder-raiser-div width-100">
          <br />
          <input
            name="Category"
            value={data.Category}
            onChange={handleInputChange}
            type="text"
            class="placeholder-raiser-input placeholder-raiser-input-indigo"
            required
          />
          <span class="placeholder-raiser-label">
            Category Name <sup class="important-star">*</sup>
          </span>
        </div>
        <div class="placeholder-raiser-div width-100">
          <br />
          <input
            name="Description"
            value={data.Description}
            onChange={handleInputChange}
            type="text"
            class="placeholder-raiser-input placeholder-raiser-input-indigo"
            required
          />
          <span class="placeholder-raiser-label">
            Description <sup class="important-star">*</sup>
          </span>
        </div>

        <br />
        <button type="submit" class="btn btn-indigo">
          Categorize
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
