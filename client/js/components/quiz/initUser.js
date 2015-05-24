define(["underscore", "jquery", "react", "reactRouter", "components/ajax/ajaxRequest"], function(_, $, React, Router, AjaxRequest) {
  var InitUser, Link, Route, UserForm;
  Route = Router.Route;
  Link = Router.Link;
  UserForm = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    componentDidMount: function() {
      $("#userForm").show();
      this.formWarning = $("#formWarning");
      this.userNameFormGroup = $("#userNameFormGroup");
      return this.formWarning.hide();
    },
    validateForm: function() {
      var userName;
      userName = $.trim($("#userName").val());
      if (!userName) {
        this.formWarning.text("User name is required!").show();
        this.userNameFormGroup.addClass("has-error");
        return false;
      } else {
        this.formWarning.hide();
        this.userNameFormGroup.removeClass("has-error");
        return userName;
      }
    },
    clickHandler: function() {
      var data, userName;
      userName = this.validateForm();
      if (userName) {
        data = JSON.stringify({
          username: userName
        });
        return this.userEndpointRequest(data);
      }
    },
    onChangeHandler: function() {
      return true;
    },
    onSubmit: function() {
      this.clickHandler();
      return false;
    },
    userEndpointRequest: function(data) {
      return new AjaxRequest(this.props.endpoint, data, this.props.method, "application/json").always(this.afterSendRequest);
    },
    afterSendRequest: function(result) {
      if (this.isMounted()) {
        this.setState({
          id: result.id,
          word: result.word,
          choises: result.choises
        });
      }
      if ((result != null) && !result.error) {
        this.context.router.transitionTo(this.props.next);
        $("#userForm").hide();
      }
      return false;
    },
    render: function() {
      var controlBtnClass, formClass, formGroupClass, formWarningClass, inputWrapperClass, userNameControlClass;
      formClass = "form-horizontal";
      userNameControlClass = "user-name-input col-sm-2 form-control";
      controlBtnClass = "btn btn-info user-btn";
      inputWrapperClass = "col-sm-10";
      formGroupClass = "form-group";
      formWarningClass = "bg-danger warning";
      return React.createElement("form", {
        "className": formClass,
        "id": "userForm",
        "onSubmit": this.onSubmit
      }, React.createElement("p", {
        "className": formWarningClass,
        "id": "formWarning"
      }), React.createElement("div", {
        "className": formGroupClass
      }, React.createElement("div", {
        "className": inputWrapperClass,
        "id": "userNameFormGroup"
      }, React.createElement("input", {
        "type": "text",
        "className": userNameControlClass,
        "id": "userName",
        "name": "userName",
        "placeholder": "User Name",
        "onChange": this.onChangeHandler
      })), React.createElement("div", {
        "className": inputWrapperClass
      }, React.createElement("button", {
        "type": "button",
        "id": "userFormBtn",
        "className": controlBtnClass,
        "onClick": this.clickHandler
      }, "Start quiz"))));
    }
  });
  InitUser = React.createClass({
    render: function() {
      var panelBodyClass, panelClass, panelHeadingClass, panelTitleClass;
      panelClass = "panel panel-default";
      panelBodyClass = "panel-body";
      panelTitleClass = "panel-title";
      panelHeadingClass = "panel-heading";
      return React.createElement("div", {
        "className": panelClass
      }, React.createElement("div", {
        "className": panelHeadingClass
      }, React.createElement("h3", {
        "className": panelTitleClass
      }, "Dictionary Quiz")), React.createElement("div", {
        "className": panelBodyClass
      }, React.createElement(UserForm, {
        "endpoint": "../api/web/v1/sessions",
        "method": "POST",
        "next": "questions"
      })));
    }
  });
  return InitUser;
});
