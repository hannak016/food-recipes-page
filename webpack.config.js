const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/js/index.js',
    output:{
        //path.resolve is a function from path, to join current absolute path with dist/js, in which we put our final file bundle.js in
        path:path.resolve(__dirname,'dist'),
        filename:'js/bundle.js'
    },
    devServer:{
        contentBase:'./dist'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html'
        }

        )
    ]
    

    


}