import { join } from "path";

import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import devServer from "./server.js";
import rules from "./rules.js";
import plugins from "./plugins.js";

import { NODE_ENV, ROOT, PATHS } from "./config.js";

export default {
  context: join(ROOT, PATHS.get("src")),
  entry: {
    main: "./index.js",
  },
  mode: ["production", "development"].includes(NODE_ENV)
    ? NODE_ENV
    : "production",
  output: {
    // auxiliaryComment: {}
    charset: false, // true
    chunkFilename:
      NODE_ENV === "production" ? "[name].[chunkhash].js" : "[name].js",
    // chunkLoadTimeout: 120000,
    // chunkLoadingGlobal: "webpackChunkwebpack",
    // chunkLoading: false, // 'jsonp' | 'import-scripts' | 'require' | 'async-node' | <any string>
    // chunkFormat: false, // string: 'array-push' | 'commonjs' | <any string>
    // enabledChunkLoadingTypes: [], // [string: 'jsonp' | 'import-scripts' | 'require' | 'async-node' | <any string>],
    // crossOriginLoading: false, // 'anonymous', 'use-credentials'
    // devtoolFallbackModuleFilenameTemplate: (info) =>
    //   `webpack:///${info.resourcePath}?${info.loaders}`,
    // devtoolModuleFilenameTemplate:
    //   "webpack://[namespace]/[resource-path]?[loaders]",
    // devtoolNamespace: "namespace",
    filename:
      NODE_ENV === "production" ? "[name].[contenthash].js" : "[name].js",
    assetModuleFilename: "assets/[name].[hash][ext][query]",
    // globalObject: "window",
    // uniqueName: "my-package-xyz",
    hashDigest: "hex",
    hashDigestLength: 20,
    hashFunction: "md4",
    // hashSalt: "",
    // hotUpdateChunkFilename: "[id].[fullhash].hot-update.js",
    // hotUpdateGlobal: "webpackChunkwebpack",
    hotUpdateMainFilename: "[runtime].[fullhash].hot-update.json",
    // library: {},
    // scriptType: false, // 'module' | 'text/javascript'
    // libraryExport: undefined,
    // libraryTarget: "var",
    // importFunctionName: "import",
    path: join(ROOT, PATHS.get("dist")),
    pathinfo: NODE_ENV === "production" ? false : true,
    publicPath: "/",
    // sourceMapFilename: "[file].map[query]",
    // sourcePrefix: "",
    // strictModuleExceptionHandling: false,
    // umdNamedDefine: false,
    // workerChunkLoading: false, // 'require' | 'import-scripts' | 'async-node' | 'import' | 'universal'
    // enabledLibraryTypes: ["module"],
    // futureEmitAssets: false,
    // environment: {
    //   arrowFunction: true,
    //   bigIntLiteral: false,
    //   const: true,
    //   destructuring: true,
    //   dynamicImport: false,
    //   forOf: true,
    //   module: false,
    // },
    // compareBeforeEmit: true,
    // wasmLoading: false,
    // enabledWasmLoadingTypes: ["fetch"],
    // iife: true,
    // module: true,
  },
  module: {
    noParse: /jquery|lodash/,
    rules,
    // unsafeCache: true,
  },
  resolve: {
    alias: {
      Utilities: join(ROOT, PATHS.get("src"), "utilities/"),
      Templates: join(ROOT, PATHS.get("src"), "templates/"),
    },
    aliasFields: ["browser"],
    descriptionFiles: ["package.json"],
    // enforceExtension: false,
    extensions: [
      ".wasm",
      ".mjs",
      ".js",
      ".json",
      ".jsx",
      ".ts",
      ".tsx",
      ".vert",
      ".frag",
    ],
    // mainFields: ["browser", "module", "main"],
    // exportsFields: ["exports"],
    mainFiles: ["index"],
    modules: [`${ROOT}/${PATHS.get("src")}`, "node_modules"],
    // unsafeCache: null,
    // plugins: [],
    // preferRelative: null,
    // symlinks: true,
    // cachePredicate: () => true,
    // restrictions: [/\.(sass|scss|css)$/],
    // roots: [],
    // importsFields: ["browser", "module", "main"],
    // fallback: {},
  },
  // resolveLoader: {
  //   modules: ["node_modules"],
  //   extensions: [".js", ".json"],
  //   mainFields: ["loader", "main"],
  // },
  optimization: {
    // minimize: false,
    minimize: NODE_ENV === "production",
    minimizer: [
      "...",
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              reduceTransforms: false,
            },
          ],
        },
      }),
    ],
    // splitChunks: {},
    // runtimeChunk: {
    //   name: (entrypoint) => `runtime~${entrypoint.name}`,
    // },
    // emitOnErrors: false,
    moduleIds: "deterministic", // 'natural' | 'named' | 'deterministic' | 'size'
    // chunkIds: false, // 'natural' | 'named' | 'size' | 'total-size' | 'deterministic'
    // nodeEnv: "production",
    // mangleWasmImports: false,
    // removeAvailableModules: false,
    // removeEmptyChunks: true,
    // mergeDuplicateChunks: true,
    // flagIncludedChunks: null,
    // occurrenceOrder: null,
    // providedExports: null,
    // usedExports: true,
    // concatenateModules: null,
    // sideEffects: true,
    // portableRecords: null,
    // mangleExports: null, // 'deterministic' | 'size'
    // innerGraph: true,
    // realContentHash: true,
  },
  plugins,
  devServer,
  devtool: NODE_ENV === "production" ? "source-map" : "eval",
  target: "browserslist",
  // externals: {},
  performance: {
    hints: "warning", // 'error' | 'warning' boolean: false
    maxEntrypointSize: 250000,
    maxAssetSize: 250000,
    // assetFilter: (assetFilename) => {},
  },
  stats: {
    preset: "normal",
    colors: true,
  },
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
    // outputModule: true,
    topLevelAwait: true,
  },
  // bail: false,
  // cache: {}
  // ignoreWarnings: null,
  // loader: {},
  // parallelism: 100,
  // profile: null,
  // recordsPath: join(__dirname, "records.json"),
  // recordsInputPath: null,
  // recordsOutputPath: null,
  name: "main",
  // infrastructureLogging: {},
  // snapshot: {},
};
