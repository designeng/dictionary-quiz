define(["components/ajax/ajaxRequest"], function(AjaxRequest) {
  var ApplicationState;
  return ApplicationState = {
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
      } else {

      }
    }
  };
});
