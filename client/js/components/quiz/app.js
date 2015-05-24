define(["react", "reactRouter", "components/ajax/ajaxRequest", "./initUser", "./step", "./result"], function(React, Router, AjaxRequest, InitUserHandler, StepHandler, ResultHandler) {
  var App, NotFound, NotFoundRoute, Redirect, Route, RouteHandler, routes;
  Route = Router.Route;
  NotFoundRoute = Router.NotFoundRoute;
  Redirect = Router.Redirect;
  RouteHandler = Router.RouteHandler;
  App = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    componentDidMount: function() {
      return this.getApplicationState();
    },
    getApplicationState: function() {
      var stateServicePath;
      stateServicePath = "../api/web/v1/states";
      return new AjaxRequest(stateServicePath, null, "GET", "application/json").always(this.onGetApplicationState);
    },
    onGetApplicationState: function(result) {
      if (result.state === "INIT_USER_STATE") {
        return this.context.router.transitionTo('user');
      } else if (result.state === "QUESTIONS_STATE") {
        return this.context.router.transitionTo('questions');
      }
    },
    render: function() {
      var name;
      name = this.context.router.getCurrentPath();
      return React.createElement("div", null, React.createElement(RouteHandler, {
        "key": name
      }));
    }
  });
  NotFound = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    componentDidMount: function() {
      return setTimeout((function(_this) {
        return function() {
          return _this.context.router.transitionTo('user');
        };
      })(this), 2000);
    },
    render: function() {
      var NotFoundWarningClass;
      NotFoundWarningClass = "bg-danger warning";
      return React.createElement("div", null, React.createElement("p", {
        "className": NotFoundWarningClass
      }, "Sorry, you are trying to access non-existed page. After couple of seconds the browser will be redirected to initial quiz page."));
    }
  });
  routes = React.createElement(Route, {
    "path": "/",
    "handler": App
  }, React.createElement(Route, {
    "name": "user",
    "path": "user",
    "handler": InitUserHandler
  }), React.createElement(Route, {
    "name": "questions",
    "path": "questions",
    "handler": StepHandler
  }), React.createElement(Route, {
    "name": "result",
    "path": "result",
    "handler": ResultHandler
  }), React.createElement(NotFoundRoute, {
    "handler": NotFound
  }), React.createElement(Redirect, {
    "from": "quiz",
    "to": "user"
  }));
  return Router.run(routes, function(Root) {
    return React.render(React.createElement(Root, null), document.getElementById("application"));
  });
});
