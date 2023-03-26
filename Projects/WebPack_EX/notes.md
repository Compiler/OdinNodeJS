## Context
    - src/index.js is the folder to include modules
    - public/index.html is the original entry point

## How to start
    Create package.json: npm init -y 

    
    install package: npm install __package_name__

    
    install webpack: npm install --save-dev webpack webpack-cli

        - This will add devDependecnies to package.json
    
## Building

    `webpack` must be called to bundle our modules so in package.json we add "build" : "webpack" to our "scripts"
    
    Then we execute `npm run build` to bundle

    This will create a dist/main.js that has our bundled code, therefor we need to point our index.html to dist/main.js instead

##  Webpack Config

    dist/main.js is the default. If we want to tweak some settings we need to add a webpack.config.js to our root of project(same level as dist)

    An example of webpack.config.js:

    const path = require('path')
    module.exports = {
        entry : './src/index.js' //entry point to our app
        output:{
            filename: 'new_main.js' //instead of main.js
            path: path.resolve(__dirname, 'dist')
        }
    }

## Loaders

    A loader is a way to preprocess a file. Aka, a way to process non-js files. We need to install them:

    - npm install --save-dev css-loader style-loader sass-loader

    We add these loaders to the webpack.config.js as a rule.

    module:{
        rules:[
            {
                test: /\.scss$/, //this is a regex to find .scss files
                use:[ //these are the loaders to use when found
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }