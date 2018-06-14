const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .addEntry('index', './src/index.tsx')
    .enableLessLoader()
    .enableTypeScriptLoader(options => {
        const tsImportPluginFactory = require('ts-import-plugin');

        Object.assign(options, {
            transpileOnly: true,
            getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: 'css',
                })]
            }),
            compilerOptions: {
                module: 'es2015'
            }
        });
    })

;

module.exports = Encore.getWebpackConfig();
