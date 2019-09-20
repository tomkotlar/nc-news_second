const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

exports.fetchEndpoints = () => {
  const pathToApi = path.join(__dirname, "..");
  const readFile = promisify(fs.readFile);

  return readFile(`${pathToApi}/endpoints.json`, "utf-8");
};
