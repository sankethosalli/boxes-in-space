import React, { useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import "../../../assets/nativelib/css/button/css/exporter";
import "../../../assets/nativelib/css/form/css/exporter";
import "../../../assets/nativelib/css/utilities/css/exporter";
// import { MultiSelect } from "react-multi-select-component";
import "./LeftFilter.css";
import Category from "./Category";
const logger = require("../../../log/log");

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const tagsMatchCategories = (tags, selectedCategories) => {
  // logger.debug(tags, "tags");
  // logger.debug(selectedCategories, "selectedCategories");

  if (tags) {
    tags = tags.split(",");
  } else {
    tags = [];
  }
  for (let i = 0; i < selectedCategories.length; i++) {
    for (let j = 0; j < tags.length; j++) {
      if (selectedCategories[i].toLowerCase() === tags[j].toLowerCase()) {
        return true;
      }
    }
  }
  // return true;
  return false;
};

const LeftFilter = (props) => {
  const [options, setoptions] = useState(() => props.categories);
  const [selected, setSelected] = useStateWithCallbackLazy(() => []);

  const handleInputChange = (event) => {
    // logger.debug(event.target.name, "event.target.name");
    // logger.debug(
    //   { etv: event.target.value, etvt: typeof event.target.value },
    //   "event.target.value"
    // );

    if (event.target.value === "true") {
      const newSelectedCategories = [
        ...new Set([...selected, event.target.name]),
      ];
      setSelected(newSelectedCategories);

      props.setUrls(() => {
        const urls = props.urlsAll.filter(
          (url) => tagsMatchCategories(url.tags, newSelectedCategories) === true
        );
        // logger.debug(urls, "urls");
        return urls;
      });
    } else {
      const newSelectedCategories = selected.filter(
        (item) => item !== event.target.name
      );
      setSelected(newSelectedCategories);

      props.setUrls(() => {
        if (newSelectedCategories.length === 0) {
          return props.urlsAll;
        } else {
          const urls = props.urlsAll.filter(
            (url) =>
              tagsMatchCategories(url.tags, newSelectedCategories) === true
          );
          // logger.debug(urls, "urls");
          return urls;
        }
      });
    }

    // logger.debug(selected, "selected");
  };

  // logger.debug(options, "options");
  // logger.debug(categories, "categories");
  return (
    <div>
      <center>
        <h3>FILTER</h3>
      </center>
      <br />
      <div>
        <div>
          <div class="placeholder-raiser-div width-100">
            <br />
            <input
              type="text"
              class="placeholder-raiser-input placeholder-raiser-input-indigo"
              required
              id="categoryName"
            />
            <span class="placeholder-raiser-label">
              Category Name <sup class="important-star">*</sup>
            </span>
          </div>
        </div>
        <div className="Categories">
          {/* <Category category="College" /> */}
          {/* <Category category="Club" /> */}

          {/* <Category
            className="selectAll"
            key={"Select All"}
            category={"Select All"}
            handleInputChange={() => {}}
            // handleInputChange={handleInputChange}
          /> */}

          {props.categories.length > 0 ? (
            props.categories.map((category, index) => {
              return (
                <Category
                  key={category}
                  category={category.name}
                  handleInputChange={handleInputChange}
                  // onChange={handleInputChange}
                />
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

export default LeftFilter;
{
  /* <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Categories"
          menuIsOpen={true}
        /> */
}
