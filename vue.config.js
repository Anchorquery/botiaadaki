const CopyWebpackPlugin = require('copy-webpack-plugin')
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );

const path = require('path')
module.exports = {
  
  
  pages: {
    index: {
      entry: 'src/index.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  devServer: {
    historyApiFallback: true,
    clientLogLevel: 'warning',
    hot: true,
    contentBase: 'dist',
    compress: true,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/
    }
  },

  chainWebpack: config => {
    config.plugins.delete('prefetch-index'),
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
    config.module
      .rule('vue')
        .use('vue-loader')
          .tap(args => {
            args.compilerOptions.whitespace = 'preserve'
          })
          const svgRule = config.module.rule( 'svg' );

          // Then you can either:
          //
          // * clear all loaders for existing 'svg' rule:
          //
          //		svgRule.uses.clear();
          //
          // * or exclude ckeditor directory from node_modules:
          svgRule.exclude.add( path.join( __dirname, 'node_modules', '@ckeditor' ) );
  
          // Add an entry for *.svg files belonging to CKEditor. You can either:
          //
          // * modify the existing 'svg' rule:
          //
          //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
          //
          // * or add a new one:
          config.module
              .rule( 'cke-svg' )
              .test( /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/ )
              .use( 'raw-loader' )
              .loader( 'raw-loader' );
  
          // (2.) Transpile the .css files imported by the editor using PostCSS.
          // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
          config.module
              .rule( 'cke-css' )
              .test( /ckeditor5-[^/\\]+[/\\].+\.css$/ )
              .use( 'postcss-loader' )
              .loader( 'postcss-loader' )
              .tap( () => {
                  return {
                      postcssOptions: styles.getPostCssConfig( {
                          themeImporter: {
                              themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' ),
                          },
                          minify: true
                      } )
                  };
              } );
  },
  productionSourceMap: false,
  assetsDir: './assets/',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({patterns:[
        { from: 'src/assets/img', to: 'assets/img' },
        { from: 'src/assets/fonts', to: 'assets/fonts' }
      ]})
    ]
  }
}

  
