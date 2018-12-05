//var debug = (process.env.npm_lifecycle_event !== "prod") ? true : false
var debug = false; // for production deployment mode on heroku
console.log("Debug Mode: " + debug);

const webpack           = require('webpack');
const path              = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const buildDir         = path.resolve(__dirname, './dist'); // contains the built items
const assetsDir       = path.resolve(__dirname, './assets'); // contains the css, img, template.html etc.
const nodeModulesDir  = path.resolve(__dirname, 'node_modules'); // the node_modules folder
const srcInclude      = path.resolve(__dirname, './src/app'); // the src folder for hot reload
const indexFile       = path.resolve(__dirname, './src/app/index.js'); // the actual entry file

var babelLoaderEntryDev = {
        test:      /\.(js|jsx)$/,
        include:  [srcInclude, assetsDir],
        exclude:  [nodeModulesDir],
        loaders:  ['react-hot-loader/webpack', 'babel-loader']
      };
var cssLoaderDev = {         
          test: /\.css$/,
          exclude:  [nodeModulesDir],          
          use: [ 'style-loader', 'css-loader' ]                     
      };

var babelLoaderEntryProd = {
        test:      /\.(js|jsx)$/,
        exclude:  [nodeModulesDir],
        loader:   'babel-loader'
      };
var cssLoaderProd = {         
          test: /\.css$/,
          exclude:  [nodeModulesDir],
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })            
      };

const config = {    
  devtool: debug ? "cheap-module-source-map" : "sourcemap",  
  entry: {
    app: debug ? [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      indexFile
    ] : [
      'babel-polyfill',
      indexFile
    ]
  },
  output: {
    path: buildDir,
    filename: "bundle.js",
    publicPath: '/'
  },    
  module: {
    rules: [      
      debug ? babelLoaderEntryDev : babelLoaderEntryProd,      
      debug ? cssLoaderDev : cssLoaderProd,       
      {        
        test: /\.(json|geojson)$/,
        exclude:  [nodeModulesDir],
        use: [
          'file-loader?name=[path][name].[ext]',
          {  
            loader: 'json-x-loader'
          }
        ]
      },   
     /* { 
        test: /\.(mbtiles)$/,  
        loader: 'url-loader',
        options: {
          mimetype: 'image/png'
        }
      },*/
      {
        test: /\.(txt)$/,    
        exclude:  [nodeModulesDir],
        loader: '@webpack-loader/raw'      
      },                                 
      {
        test: /\.(gif|png|jpe?g|ico|svg)$/i, 
        exclude:  [nodeModulesDir],
        use: [
          'file-loader?name=[path][name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: { 
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer                           
              optipng: {                
                enabled: false
              }
            }
          }
        ]
      },     
      {
        test: /\.html$/,
        exclude:  [nodeModulesDir],
        use: [{
          loader: "html-loader",
          options: {
            minimize: true
          }
        }]
      }
    ]
  },  
  resolve: {
    alias: {    
      styles: path.join(path.resolve(__dirname, "assets"), "styles"),     
      scripts: path.join(path.resolve(__dirname, "assets"), "scripts"),      
      img: path.join(path.resolve(__dirname, "assets"), "img"),      
      api: path.join(path.resolve(__dirname, "assets"), "api"),      
      components: path.join(path.resolve(__dirname, "src"), "app/components"),
      containers: path.join(path.resolve(__dirname, "src"), "app/containers"),            
      views: path.join(path.resolve(__dirname, "src"), "app/views")
    }
  },  
  plugins: debug ? [    
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),    
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),               
    new HtmlWebpackPlugin({
      title: "INSIGHTORS",
      template: path.join(__dirname, 'assets/template.html'),
      filename: path.join(__dirname, 'dist/index.html'),
      favicon: path.join(__dirname, 'assets/img/favicon.ico'),
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      sync: path.join(__dirname, 'scripts/svgxuse.js'),
      defaultAttribute: 'defer'
    })
  ] : [
      new webpack.optimize.ModuleConcatenationPlugin(),     
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),      
      new ExtractTextPlugin('bootstrap.css'),
      new ExtractTextPlugin('layout.css'),
      new ExtractTextPlugin('topbar.css'),
      new ExtractTextPlugin('typography.css'),
      new ExtractTextPlugin('leaflet_1.0.0.css'),
      new webpack.optimize.CommonsChunkPlugin({
        name:     'app',
        filename: 'app.bundle.js'
      }),      
      new HtmlWebpackPlugin({
        title: "INSIGHTORS",
        template: path.join(__dirname, 'assets/template.html'),
        filename: path.join(__dirname, 'dist/index.html'),
        favicon: path.join(__dirname, 'assets/img/favicon.ico'),
        minify: {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true
        }
      }),
      new ScriptExtHtmlWebpackPlugin({
        sync: path.join(__dirname, 'scripts/svgxuse.js'),
        defaultAttribute: 'defer'
      }),    
      new StyleExtHtmlWebpackPlugin({
        minify: true
      })
  ]
};

module.exports = config;