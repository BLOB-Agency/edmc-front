module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "alias": {
          "@components": "./src/components",
          "@context": "./src/context",
          "@screens": "./src/screens",
          "@store": "./src/store",
          "@utils": "./src/utils",
          "@assets": "./assets"
        },
        "extensions": [
          ".js",
          ".jsx",
        ]
      }],
    ]
  };
};
