import * as path from "path";
import tsImportPluginFactory from "ts-import-plugin";

type TSLoaderOptions = {[key: string]: any};

export function getTsLoaderOptions(options: TSLoaderOptions) {
    return Object.assign({}, options, {
        transpileOnly: true,
        configFile: path.join(path.dirname(__dirname), "tsconfig.json"),
        getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
                libraryDirectory: 'es',
                libraryName: 'antd',
                style: 'css',
            })]
        }),
    });
}