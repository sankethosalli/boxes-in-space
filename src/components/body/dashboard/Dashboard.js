import React, { useState, useEffect } from "react";
import UrlBox from "./UrlBox";
import LeftFilter from "./LeftFilter";
import AddUrl from "./AddUrl";
import AddCategory from "./AddCategory";
import "./Dashboard.css";
import createNotification from "../../../assets/nativelib/js/notification";
import { makeHTTPGETRequestAuthorized } from "../../../services/http";
const config = require("../../../configs/config");
const logger = require("../../../log/log");

const Dashboard = (props) => {
  document.title = "Aspt | Dashboard";

  const [loading, setLoading] = useState(() => false);
  const [loadingCategory, setLoadingCategory] = useState(() => false);

  const [urls, setUrls] = useState(() => []);
  const [urlsAll, setUrlsAll] = useState(() => []);
  const [categories, setCategories] = useState(() => []);

  const fetchCategoryData = () => {
    makeHTTPGETRequestAuthorized(
      `${config.api.apiBaseUrl}/shortener/fetch-category/`,
      {}
    )
      .then((response) => {
        // logger.debug({ re: response }, "");
        if (response.message === "success") {
          // logger.debug(response.data);
          setCategories(() => response.data);
        } else {
          createNotification({
            title: "Error",
            message: "Unknown Error Occured",
            type: "danger",
          });
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

  const fetchUrlData = () => {
    makeHTTPGETRequestAuthorized(
      `${config.api.apiBaseUrl}/shortener/fetch-urls/`,
      {}
    )
      .then((response) => {
        // logger.debug({ re: response }, "");
        if (response.message === "success") {
          setUrls(() => response.data);
          setUrlsAll(() => response.data);
        } else {
          createNotification({
            title: "Error",
            message: "Unknown Error Occured",
            type: "danger",
          });
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

  useEffect(() => {
    if (loading === false) {
      setLoading(() => {
        return true;
      }, fetchUrlData());
    }
  }, [loading]);

  useEffect(() => {
    if (loadingCategory === false) {
      setLoadingCategory(() => {
        return true;
      }, fetchCategoryData());
    }
  }, [loadingCategory]);

  // logger.debug(categories, "categories");
  return (
    <div>
      {/* Dashboard */}
      <div className="row">
        <div className="AddElements">
          {props.toggle.url ? <AddUrl /> : <div></div>}
          {props.toggle.category ? <AddCategory /> : <div></div>}
        </div>
        {props.toggle.url || props.toggle.category ? (
          <div className="head-cutter"></div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="row">
        <div className="col-lg-3">
          <LeftFilter
            urlsAll={urlsAll}
            setUrls={setUrls}
            // categories={[
            //   "apple",
            //   "cake",
            //   "brush",
            //   "club",
            //   "mango",
            //   "email",
            //   "orange",
            //   "grape",
            // ]}
            categories={categories}
          />
        </div>
        <div className="col-lg-9">
          {urls.length > 0 ? (
            urls.map((url, index) => {
              let fullUrl = new URL(url.full_url);
              // logger.debug(fullUrl.origin);
              // logger.debug(url.description, "url.description");

              return (
                <div>
                  <UrlBox
                    key={url.shortUrl}
                    cts={categories}
                    id={url.id}
                    faviconUrl={fullUrl.origin + "/favicon.ico"}
                    // shortUrl={"http://localhost:3000/r/" + url.short_url}
                    shortUrl={"https://aspt.in/r/" + url.short_url}
                    fullUrl={url.full_url}
                    description={url.description}
                    tags={url.tags}
                  />
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
