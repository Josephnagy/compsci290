module.exports = {
    publicPath: "./",
    devServer: {
        proxy: {
            "^/api": {
                "target": "https://banana-crisp-68236.herokuapp.com/",
                changeOrigin: true
            }
        }
    }
};
