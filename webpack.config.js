const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:['./src/js/index.js','babel-polyfill'],
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
    ],
    module:{
        rules:[
            {
                test:/\.js$/,//finds all files ended with.js
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    }
    

    


}