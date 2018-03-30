module.exports = {
    plugins: [
        require('postcss-import'),
        // require('postcss-url')(),
        // require('postcss-base64')({
        //     extension: [ '.svg' ]
        // }),
        // require('postcss-cssnext')(),
        // require('postcss-nesting')()
        require('precss'),
        require('autoprefixer')
    ]
}
