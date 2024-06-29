const path = require('path');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const Dotenv = require( 'dotenv-webpack' )
const { config } = require( 'dotenv' )
const fs = require( 'fs' )

config( )

module.exports = {
  mode: process.env.NODE_ENV ? 'development' : 'production',
  target: 'web',
  entry: [ './src/index.tsx' ],
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.css' ],
  },
  output: {
    publicPath: '/',
    path: path.resolve( __dirname, 'dist' ),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript' ],
          },
        },
      },
      { 
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin( {
      favicon: path.join( __dirname, './src', 'favicon.ico' ),
      templateContent: '<!DOCTYPE html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0"></head><body><div id="root"></div></body></html>'
    } ),
    new Dotenv( { systemvars: true } )
  ],
  stats: {
    modules: false,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  devServer: process.env.NODE_ENV == 'development' ? {
    host: '0.0.0.0',
    port: 80,
    server: 'http',
    historyApiFallback: true,
    allowedHosts: 'all',
  } : {
    host: '0.0.0.0',
    port: 443,
    historyApiFallback: true,
    allowedHosts: 'all',
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync( '../riser.key' ),
        cert: fs.readFileSync( '../riser.crt' )
      }
    }
  }
}
