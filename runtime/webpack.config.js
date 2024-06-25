const path = require( 'path' )

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env", "@babel/preset-react"
            ]
          }
        }
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve( __dirname, '../backend/runtime' ),
    filename: 'runtime.js',
  }
}

