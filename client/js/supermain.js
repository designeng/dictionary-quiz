require.config({
  baseUrl: "/js",
  paths: {
    api: "config/api"
  },
  packages: [
    {
      name: "underscore",
      main: "lodash",
      location: "vendors/lodash/dist"
    }, {
      name: "jquery",
      main: "jquery",
      location: "vendors/jquery/dist"
    }, {
      name: "text",
      main: "text",
      location: "vendors/text"
    }, {
      name: "signals",
      main: "signals",
      location: "vendors/js-signals/dist"
    }, {
      name: "react",
      main: "react",
      location: "vendors/react"
    }, {
      name: "reactRouter",
      main: "ReactRouter",
      location: "vendors/react-router/build/umd"
    }
  ],
  shim: {}
});

require(["components/quiz/app"], function() {});
