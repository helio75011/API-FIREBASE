const path = require("path");

module.exports = {
    mode: "development",  // Corrected the property from `node` to `mode`
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    }, 
    devtool: "eval-cheap-source-map",
    watch: true,
    node: false  // Setting node property correctly
};
