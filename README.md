# Currency Exchanger

#### Description:

#### By Eva Kemp

## **Technologies Used**

- RapidAPI integration
- Asyncronous programming
- JavaScript
- CSS
- HTML
- VS Code
- git
- GitHub
- Node Package Manager (npm)
- JSON
- Babel (v7.18.6)
- EsLint v(8.18.0)
- Jest (v24.9.0)
- Bootstrap (v5.3.0)
- webpack (v5.0.0)
  - webpack-cli (v5.0.0)
  - webpack-dev-server (v4.0.0)
  - clean-webpack-plugin (v3.0.0)
  - dotenv-webpack (v2.0.0)
- Loaders
  - css-loader (v3.6.0)
  - file-loader (v6.2.0)
  - html-loader (v1.3.2)
  - style-loader (v1.3.0)

## Description

An application that takes a user's inputted USD amount and returns the amount in a different currency of their choice.

## Setup/Installation Requirements

Clone project:

- Clone the repository from GitHub by navigating to the main page of the repository.
- Above the list of files on the repository, click "Code".
- Then click "Download ZIP".
- After downloading, open the file.
- Get API key
  - Navigate to [ExchangeRate-API](https://app.exchangerate-api.com/)
  - Sign up with a free trial of the Pro Plan to get a free API key for two weeks. You may pay for additional time as desired.
- Once you have received your API Key: at the root directory, create a `.env` file and enter:
  - `API_KEY=<paste_your_api_key_here>`<br>
    make sure to remove the angle brackets as well as any whitespaces or extra punctuation.
- Then, download Webpack Setup:

**This was written for Node version 16, if you have a different version of Node, this will not work. See the bottom of this file for more information**

First we will begin by initializing `npm`, run this command in your terminal, in the directory of your template:

`npm init -y`

This will create the package.json and allow you to add npm packages

Next we will create our folders and files that will be needed:

`mkdir src src/assets src/assets/images css __tests__`

Creating files:

`touch src/index.html src/index.js css/styles.css .gitignore webpack.config.js`

Node modules and dist will be created when you run npm install and npm build, so we don't need to include them in our repo. That is what the `.gitignore` file is for. Any files you don't want on github should go here.
Add this to our .gitignore:

```
node_modules/
dist/
.DS_Store
```

Next we need to install webpack:

`npm install webpack@4.46.0 --save-dev --save-exact`

`npm install webpack-cli@3.3.12 --save-dev`

Create our `webpack.config.js` file. Inside that file, add this code:

```
const path = require('path');

module.exports = {
  entry: './src/index.js', // this indicates the main js file that everything will be bundled into
  output: {
    filename: 'bundle.js', // this is the file name for the bundled output
    path: path.resolve(__dirname, 'dist') // this is the directory for the bundled output, in this case it's 'dist'
  }
};
```

To have our css be bundled in, we will add `css-loader` and `style-loader`

`npm install style-loader@1.3.0 css-loader@3.6.0 --save-dev`

Configuring the loaders in webpack.config.js:

```
// this gets added right after the 'output' object, still within the `module.exports` object
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
```

In order for our css to actually get bundled and used, we need to import it into our JS. Add this line to the top `index.js`:

`import './css/styles.css';`

We'll let webpack handle generating html files, so we will install HTML webpack plugin:

`npm install html-webpack-plugin@4.5.2 --save-dev`

Add HTML webpack plugin to the webpack.config.js:

```
// below  const path = require('path');, add this line:
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

In between `output` and `module` objects, add this new plugins array:

```
plugins: [
    new HtmlWebpackPlugin({
      title: 'Project', // this line will be the title that shows up in your browser tab
      template: './src/index.html', // everything will get injected into this file
      inject: 'body'
    })
  ],
```

Next we will install clean webpack plugin, which will clean up our environment whenever we make changes:

`npm install clean-webpack-plugin@3.0.0 --save-dev`

Add the plugin to our webpack config, right below HTML webpack plugin at the top of the file:

`const { CleanWebpackPlugin } = require('clean-webpack-plugin');`

Inside the plugins array, add this new line above `new Html WebpackPlugin()`:

`new CleanWebpackPlugin(),`

To prevent any issues with our bundled code and our browsers dev tools, we need to add this line, right above the `plugins` array:

`devtool: 'eval-source-map',`

To setup a dev live server, we need to install this:

`npm install webpack-dev-server@3.11.3 --save-dev --save-exact`

Add the devServer object to our webpack config, this goes right after the `output` object:

```
devServer: {
    contentBase: './dist'
  },

```

In order to actually run the server, we need to add in a script to our `package.json`. In the `scripts` object, add this line:

`"start": "webpack-dev-server --open --mode=development"`

Next we will install eslint, which will give us better errors and warnings:

`npm install eslint@8.18.0 --save-dev`

`npm install eslint-webpack-plugin@2.7.0 --save-dev`

We added a new plugin, so we need to update our webpack-config:

First we need to import eslint at the top of the file, underneath `CleanWebPackPlugin`

`const ESLintPlugin = require('eslint-webpack-plugin');`

Add it to our plugins array, above `new CleanWebpackPlugin()`:

`new ESLintPlugin(),`

To configure eslint, we need a `.eslintrc` file. Create the file and add this code:

```
{
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "extends": "eslint:recommended",
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "rules": {
    "semi": 1,
    "indent": ["warn", 2],
    "no-console": "warn"
  }
}
```

Adding a lint script will tell us any errors we have when we run the command. Add this to the scripts in package.json:

`"lint": "eslint src --ext .js"`

Also I recommend installing the [eslint VS Code plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), which will show errors in our editor directly.

Next, for testing, we will need to install Jest:

`npm install jest@24.9.0 --save-dev`

In order to actually run our tests, we need to add another script to the `scripts` object of `package.json`:

`"test": "jest --coverage",`

Next we will install Babel, which will translate any modern JS code into legacy code incase there are any compatibility errors:

`npm install @babel/core@7.18.6 --save-dev`

`npm install @babel/plugin-transform-modules-commonjs@7.18.6 --save-dev`

To configure babel, we need a `.babelrc` file. Create that file in the root of your project and add the following code:

```
{
  "env": {
    "test": {
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    }
  }
}
```

Since we added the `--coverage` flag to our tests, a `coverage` folder will be generated. We don't really need that on our repo, so we can add it to the `.gitignore`:
`coverage/`

For images, we need file loader and html loader:

`npm install file-loader --save-dev`

`npm install html-loader@1.3.2 --save-dev`

Add this config to our webpack, this goes in the `rules` array, next to our previous `css-loader` configuration:

```
{
  test: /\.(gif|png|avif|jpe?g)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/images/'
      }
    }
  ]
},
{
  test:/\.html$/,
  use: [
    'html-loader'
  ]
},
```

After all that, here is what your final `webpack.config.js` should look like:

```
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist",
  },
  devtool: "eval-source-map",
  plugins: [
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Project",
      template: "./src/index.html",
      inject: "body",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|png|avif|jpe?g)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
};

```

And the final `package.json`:

```
{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest --coverage",
    "build": "webpack --mode=development",
    "start": "webpack-dev-server --open --mode=development"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.6.0",
    "eslint": "^8.18.0",
    "eslint-webpack-plugin": "^2.7.0",
    "file-loader": "^6.2.0",
    "html-loader": "^1.3.2",
    "html-webpack-plugin": "^4.5.2",
    "jest": "^24.9.0",
    "style-loader": "^1.3.0",
    "webpack": "4.46.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "3.11.3"
  }
}
```

- Then, run `npm install` in the root level of the project.
- After adding these things, run `npm run build` in the terminal to bundle your js code.
- To test code, run `npm run test` in the terminal of your project.
- To view the live server of the project, run `npm run start` in the terminal. The project will open in your default browser and update as your make changes.

## Known Bugs

- The application has an error message when accessing currency conversion rates.

## License

MIT License

Copyright (c) _07/03/2023_ Eva Kemp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
