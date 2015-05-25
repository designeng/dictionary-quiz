define(["underscore", "jquery", "react", "api", "components/ajax/ajaxRequest"], function(_, $, React, api, AjaxRequest) {
  var Result;
  return Result = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    getDefaultProps: function() {
      return {
        userScorePath: api.userScorePath,
        method: "GET"
      };
    },
    getInitialState: function() {
      return {
        score: 0
      };
    },
    componentDidMount: function() {
      return this.getUserScore();
    },
    getUserScore: function() {
      return new AjaxRequest(this.props.userScorePath, null, this.props.method, "application/json").always(this.onGetUserScore);
    },
    onGetUserScore: function(result) {
      return this.setState({
        score: result["userscore"]
      });
    },
    btnClickHandler: function() {
      return this.context.router.transitionTo("user");
    },
    render: function() {
      var newQuizBtnClass, resultClass;
      resultClass = "bg-success result";
      newQuizBtnClass = "btn btn-info newQuizBtn";
      return React.createElement("div", null, React.createElement("p", {
        "className": resultClass,
        "id": "result"
      }, "Quiz is over. Yor result: ", this.state.score), React.createElement("input", {
        "type": "button",
        "value": "New Quiz",
        "id": "newQuizBtn",
        "className": newQuizBtnClass,
        "onClick": this.btnClickHandler
      }));
    }
  });
});
