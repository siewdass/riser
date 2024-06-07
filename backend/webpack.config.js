const path = require( 'path' )
const NodemonPlugin = require( 'nodemon-webpack-plugin' )
const nodeExternals = require( 'webpack-node-externals' )
const webpack = require( 'webpack' )
const memfs = require( 'memfs' )

module.exports = {
  mode: process.env.NODE_ENV ? 'development' : 'production',
  target: 'node',
  entry: [ './src/index.ts' ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  output: {
    filename: 'index.js',
    path: path.resolve( __dirname, 'dist' )
  },
  //outputFileSystem: memfs,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ] 
  },
  plugins:  [
    new webpack.HotModuleReplacementPlugin( ),
    new NodemonPlugin( { quiet: true } )
  ],
  externals: [ nodeExternals( ) ]
}