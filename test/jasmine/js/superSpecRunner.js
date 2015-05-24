require.config({
  baseUrl: "/app/js",
  paths: {},
  packages: [
    {
      name: "underscore",
      main: "lodash",
      location: "../../vendor/bower/lodash/dist"
    }, {
      name: "jquery",
      main: "jquery",
      location: "../../vendor/bower/jquery/dist"
    }, {
      name: "text",
      main: "text",
      location: "../../vendor/bower/text"
    }, {
      name: "signals",
      main: "signals",
      location: "../../vendor/bower/js-signals/dist"
    }, {
      name: "react",
      main: "react",
      location: "../../vendor/bower/react"
    }, {
      name: "reactRouter",
      main: "ReactRouter",
      location: "../../vendor/bower/react-router/build/umd"
    }
  ],
  shim: {},
  hbs: {
    templateExtension: ".html"
  }
});
