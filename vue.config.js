const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devServer: {
        open: true
    },
    // 修改默认的入口
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: {
        plugins: [
            new MiniCssExtractPlugin({
                filename: `v-web.css`
            })
        ]
    },
    chainWebpack: config => {
        // @指向examples目录
        // ~指向packages目录
        config.resolve.alias
            .set('examples', path.resolve('examples'))
            .set('~', path.resolve('packages'));
        // lib目录是组件库最终打包好存放的地方，不需要eslint检查
        config.module
            .rule('eslint')
            .exclude.add(path.resolve('lib'))
            .end();
        // packages和examples目录需要加入编译
        config.module
            .rule('js')
            .include.add(/packages/)
            .end()
            .include.add(/examples/)
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options;
            });
    }
}