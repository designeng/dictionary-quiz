define(["underscore", "jquery", "react", "./choice", "./mixins/ApplicationState", "components/ajax/ajaxRequest"], function(_, $, React, Choice, ApplicationState, AjaxRequest) {
  var Step;
  return Step = React.createClass({
    mixins: [ApplicationState],
    contextTypes: {
      router: React.PropTypes.func
    },
    getInitialState: function() {
      this.getApplicationState();
      return {
        attempts: [],
        maxAttempsCount: 2,
        stepCount: 0
      };
    },
    getDefaultProps: function() {
      return {
        resultRoutePath: "result",
        stepServicePath: "../api/web/v1/steps",
        checkAnswerServicePath: "../api/web/v1/answers"
      };
    },
    componentDidMount: function() {
      this.stepWarning = $("#stepWarning");
      this.stepWarning.hide();
      this.stepBtn = $("#stepBtn");
      return this.takeStep();
    },
    handleChange: function(event) {
      this.buttonEnableState(true);
      return this.selectedValue = this.refs.quizQuestionGroup.getCheckedInput().value;
    },
    btnClickHandler: function() {
      this.sendStepRequest();
      return this.registerAttempt();
    },
    registerAttempt: function() {
      return this.state.attempts.push(1);
    },
    resetStepAttempts: function() {
      return this.state.attempts = [];
    },
    sendStepRequest: function() {
      var data, obj;
      obj = {
        value: this.selectedValue
      };
      data = JSON.stringify(obj);
      return new AjaxRequest(this.props.checkAnswerServicePath, data, "POST", "application/json").always(this.processAnswerResult);
    },
    processAnswerResult: function(result) {
      if (result.state === "QUIZ_END_WITH_MISTAKES") {
        return this.context.router.transitionTo(this.props.resultRoutePath);
      }
      if (result.point === 1) {
        return this.next();
      } else {
        this.stepWarning.show();
        if (this.state.attempts.length < this.state.maxAttempsCount) {
          this.stepWarning.text("Wrong answer! Try once more");
          this.buttonEnableState(false);
          return this.cleanPreviousChoice();
        } else {
          return this.next();
        }
      }
    },
    next: function() {
      this.stepWarning.hide();
      this.resetStepAttempts();
      return this.takeStep();
    },
    takeStep: function() {
      return new AjaxRequest(this.props.stepServicePath, null, "GET", "application/json").always(this.applyStep);
    },
    applyStep: function(result) {
      if (result.state === "QUIZ_END_WORDS") {
        return this.context.router.transitionTo(this.props.resultRoutePath);
      }
      if (this.isMounted()) {
        this.setState({
          id: result.id,
          quizword: result.quizword,
          choice: result.choice
        });
      }
      this.state.stepCount++;
      this.cleanPreviousChoice();
      return this.buttonEnableState(false);
    },
    cleanPreviousChoice: function() {
      if (this.refs.quizQuestionGroup != null) {
        return this.refs.quizQuestionGroup.uncheck();
      }
    },
    buttonEnableState: function(state) {
      if (!state) {
        return this.stepBtn.attr("disabled", "disabled");
      } else {
        return this.stepBtn.removeAttr("disabled");
      }
    },
    render: function() {
      var quizwordValueClass, stepBtnClass, stepWarningClass, translateClass;
      translateClass = "bg-info quizword";
      quizwordValueClass = "quizword-value";
      stepBtnClass = "btn btn-info stepBtn";
      stepWarningClass = "bg-warning step-warning";
      return React.createElement("form", null, React.createElement("p", {
        "className": translateClass
      }, "Translate, please: ", React.createElement("span", {
        "className": quizwordValueClass
      }, this.state.quizword)), React.createElement(Choice, {
        "source": this.state.choice,
        "ref": "quizQuestionGroup",
        "onChange": this.handleChange
      }), React.createElement("p", {
        "className": stepWarningClass,
        "id": "stepWarning"
      }), React.createElement("input", {
        "type": "button",
        "value": "Next",
        "id": "stepBtn",
        "className": stepBtnClass,
        "onClick": this.btnClickHandler
      }));
    }
  });
});
