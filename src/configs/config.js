// can/will be fetched from/as either a argument or a parameter.
// ENV = "scribbling"
// const ENV = "development";
// ENV = "staging"
// ENV = "testing"
const ENV = "production";

let config = null;

if (ENV === "production") {
  config = require("./production");
} else if (ENV === "staging") {
  config = require("./staging");
} else if (ENV === "development") {
  config = require("./development");
  // console.log("ent123:config.api1: ", config.api);
} else {
  config = require("./development");
}

module.exports = config;
