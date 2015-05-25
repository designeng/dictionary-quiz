define [
    "api"
    "components/ajax/ajaxRequest"
], (api, AjaxRequest) ->

    ApplicationState =

        getApplicationState: ->
            stateServicePath = api.stateServicePath
            new AjaxRequest(stateServicePath, null, "GET", "application/json").always @onGetApplicationState

        onGetApplicationState: (result) ->
            if result.state == "INIT_USER_STATE"
                return @.context.router.transitionTo('user')
            else if result.state == "QUESTIONS_STATE"
                return @.context.router.transitionTo('questions')
            else
                return

