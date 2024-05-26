const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.base.config");

module.exports = env => {
    return merge(base(env), {
        entry: {
            main: "./src/main.js"
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "../app"),
            libraryTarget: 'this'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'babel-loader', // Use babel-loader for TypeScript files
                    exclude: /node_modules/
                }
            ]
        },
        target: 'electron-renderer'
    });
};
