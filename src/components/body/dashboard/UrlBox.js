import React, { useState, useEffect } from "react";
import "./UrlBox.css";
// import Tagify from "@yaireo/tagify";
import { MultiSelect } from "react-multi-select-component";
import createNotification from "../../../assets/nativelib/js/notification";
import { makeHTTPPOSTRequestAuthorized } from "../../../services/http";
const config = require("../../../configs/config");
const logger = require("../../../log/log");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const UrlBox = (props) => {
  // false for small size
  // true for full size
  const [urlBoxSize, setUrlBoxSize] = useState(() => false);
  const [loading, setLoading] = useState(() => false);
  const [expandButtonClass, setExpandButtonClass] = useState(() => {
    return {
      small: "btn btn-info visit-button",
      full: "btn btn-outline-info visit-button",
    };
  });

  const [data, setData] = useState(() => {
    return {
      id: props.id,
      Description: props.description,
      "Full Url": props.fullUrl,
      tags: props.tags,
    };
  });

  const [dataFetchCount, setDataFetchCount] = useState(() => {
    return {
      id: 0,
      Description: 0,
      "Full Url": 0,
      tags: 0,
      localFetchCount: 0,
    };
  });

  const [allCategories, setAllCategories] = useState(() => {
    let cts = [];
    // logger.debug(props.cts, "PROPS.CTS");

    for (let i = 0; i < props.cts.length; i++) {
      const name = props.cts[i].name;
      cts.push({ label: name, value: name });
    }

    // logger.debug(cts, "CTS");
    return cts;
  });

  const [categories, setCategories] = useState(() => {
    let dtags;
    if (dtags) {
      dtags = data.tags.split(",");
    } else {
      dtags = [];
    }

    let tags = [];
    if (data.tags === "") {
      return tags;
    }
    for (let i = 0; i < dtags.length; i++) {
      tags.push({ label: dtags[i], value: dtags[i] });
    }
    // logger.debug(tags);
    return tags;
  });

  const handleInputChange = (event) => {
    setData(() => {
      return { ...data, [event.target.name]: event.target.value };
    });
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    // logger.debug(categories);

    return makeHTTPPOSTRequestAuthorized(
      `${config.api.apiBaseUrl}/shortener/modify-url/`,
      {
        id: data.id,
        Description: data.Description,
        "Full Url": data["Full Url"],
        categories,
      }
    )
      .then((response) => {
        // logger.debug({ re: response }, "");
        if (response.message === "success") {
          createNotification({
            title: "Succesful",
            message: "Url Details Modified",
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

  const handleInputSubmitUrlDelete = (event) => {
    event.preventDefault();
    // logger.debug(categories);

    return makeHTTPPOSTRequestAuthorized(
      `${config.api.apiBaseUrl}/shortener/delete-url/`,
      {
        id: data.id,
      }
    )
      .then((response) => {
        // logger.debug({ re: response }, "");
        if (response.message === "success") {
          createNotification({
            title: "Succesful",
            message: "Url Details Deleted",
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

  // setCategories();
  // const fetchDescription = () => {
  //   if (dataFetchCount.Description === 0) {
  //     setData(() => {
  //       return { ...dataFetchCount, Description: 1 };
  //     });
  //     return props.Description;
  //   } else {
  //     return data.Description;
  //   }
  // };

  // logger.debug(
  //   { pd: props.description, d: data.Description },
  //   "props.description"
  // );
  if (props.description === data.Description) {
    return (
      <div key={props.key} className="UrlBox">
        <div>
          <div className="row">
            <div className="col-md-1">
              <img
                draggable="false"
                src={props.faviconUrl}
                className="img-fluid url-ico"
                alt=""
              />
            </div>
            <div className="col-md-3">
              <div>
                <sup className="superscript">Short Url</sup>
                <a className="anchor" target="_blank" href={props.shortUrl}>
                  {props.shortUrl}
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <sup className="superscript">Description</sup>
              {urlBoxSize === true ? (
                <input
                  name="Description"
                  onChange={handleInputChange}
                  className="form-control"
                  // value={fetchDescription()}
                  value={data.Description}
                />
              ) : (
                // <div>{fetchDescription()}</div>
                <div>{props.description}</div>
              )}
            </div>
            <div className="col-md-2">
              <div className="flex-container">
                <a
                  className="anchor"
                  target="_blank"
                  href={data["Full Url"]}
                  className="btn btn-primary visit-button"
                >
                  Visit
                </a>
                <button
                  onClick={() => setUrlBoxSize((prevSize) => !prevSize)}
                  className={expandButtonClass.full}
                >
                  {urlBoxSize === true ? (
                    <span>Shrink</span>
                  ) : (
                    <span>Expand</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11">
              <sup className="superscript">Full Url</sup>

              {urlBoxSize === true ? (
                <input
                  name="Full Url"
                  onChange={handleInputChange}
                  className="form-control"
                  value={data["Full Url"]}
                />
              ) : (
                <a className="anchor" target="_blank" href={data["Full Url"]}>
                  {data["Full Url"]}
                </a>
              )}
            </div>
          </div>

          {urlBoxSize === true ? (
            <div>
              <br />
              <div className="row modify">
                <div className="flex-container modify-heading">
                  <h3>Modify</h3>
                  <button
                    onClick={handleInputSubmit}
                    className="btn btn-warning"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleInputSubmitUrlDelete}
                    className="btn btn-outline-danger"
                  >
                    Delete Url
                  </button>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Tags</span>
                  </div>
                  <br />
                  <MultiSelect
                    className="form-control"
                    options={allCategories}
                    value={categories}
                    onChange={setCategories}
                    labelledBy="Categories"
                    menuIsOpen={true}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  } else {
    setData(() => {
      return {
        ...data,
        Description: props.description,
        "Full Url": props.fullUrl,
        tags: props.tags,
      };
    });
    logger.debug(props.tags, "props.tags");
    const categoriesLocal = props.tags.split(",");
    // logger.debug(categoriesLocal, "categoriesLocal");
    setCategories(() => categoriesLocal);
    return (
      <div key={props.key} className="UrlBox">
        <div>
          <div className="row">
            <div className="col-md-1">
              <img
                draggable="false"
                src={props.faviconUrl}
                className="img-fluid url-ico"
                alt=""
              />
            </div>
            <div className="col-md-3">
              <div>
                <sup className="superscript">Short Url</sup>
                <a className="anchor" target="_blank" href={props.shortUrl}>
                  {props.shortUrl}
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <sup className="superscript">Description</sup>
              {urlBoxSize === true ? (
                <input
                  name="Description"
                  onChange={handleInputChange}
                  className="form-control"
                  // value={fetchDescription()}
                  value={data.Description}
                />
              ) : (
                // <div>{fetchDescription()}</div>
                <div>{props.description}</div>
              )}
            </div>
            <div className="col-md-2">
              <div className="flex-container">
                <a
                  className="anchor"
                  target="_blank"
                  href={data["Full Url"]}
                  className="btn btn-primary visit-button"
                >
                  Visit
                </a>
                <button
                  onClick={() => setUrlBoxSize((prevSize) => !prevSize)}
                  className={expandButtonClass.full}
                >
                  {urlBoxSize === true ? (
                    <span>Shrink</span>
                  ) : (
                    <span>Expand</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11">
              <sup className="superscript">Full Url</sup>

              {urlBoxSize === true ? (
                <input
                  name="Full Url"
                  onChange={handleInputChange}
                  className="form-control"
                  value={data["Full Url"]}
                />
              ) : (
                <a className="anchor" target="_blank" href={data["Full Url"]}>
                  {data["Full Url"]}
                </a>
              )}
            </div>
          </div>

          {urlBoxSize === true ? (
            <div>
              <br />
              <div className="row modify">
                <div className="flex-container modify-heading">
                  <h3>Modify</h3>
                  <button
                    onClick={handleInputSubmit}
                    className="btn btn-warning"
                  >
                    Save
                  </button>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Tags</span>
                  </div>
                  <br />
                  <MultiSelect
                    className="form-control"
                    options={allCategories}
                    value={categories}
                    onChange={setCategories}
                    labelledBy="Categories"
                    menuIsOpen={true}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
};

// shortened description
// full description

export default UrlBox;
