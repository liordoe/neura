const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/public/app.tsx",
    output: {
        filename: "front.js",
        path: __dirname + "/dist"
    },
    mode: 'development',
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    target: "web",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, use: "awesome-typescript-loader" },

            {
                test: /\.(jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },

            {
                test: /\.html/,
                loader: 'file-loader?name=[name].[ext]',
            },

            { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|ico)$/, loader: "file" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

        ]
    },

    plugins: [
        new ExtractTextPlugin('style.css'),
        new CopyWebpackPlugin([
            { from: './assets', to: 'assets' }
        ]),
    ]

    // Other options...
};