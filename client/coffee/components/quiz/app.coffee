define [
    "react"
    "reactRouter"
    "components/ajax/ajaxRequest"
    "./initUser"
    "./step"
    "./result"
], (React, Router, AjaxRequest, InitUserHandler, StepHandler, ResultHandler) ->

    Route = Router.Route
    NotFoundRoute = Router.NotFoundRoute
    Redirect = Router.Redirect
    RouteHandler = Router.RouteHandler

    App = React.createClass

            contextTypes:
                router: React.PropTypes.func

            componentDidMount: ->
                @.getApplicationState()

            getApplicationState: ->
                stateServicePath = "../api/web/v1/states"
                new AjaxRequest(stateServicePath, null, "GET", "application/json").always @onGetApplicationState

            onGetApplicationState: (result) ->
                if result.state == "INIT_USER_STATE"
                    @.context.router.transitionTo('user')
                else if result.state == "QUESTIONS_STATE"
                    @.context.router.transitionTo('questions')

            render: ->
                name = @.context.router.getCurrentPath()
                return (
                    <div>
                        <RouteHandler key={name}/>
                    </div>
                )

    NotFound = React.createClass
        contextTypes:
            router: React.PropTypes.func

        componentDidMount: ->
            setTimeout () =>
                @.context.router.transitionTo('user') 
            , 2000

        render: ->
            NotFoundWarningClass = "bg-danger warning"
            return (
                <div><p className={NotFoundWarningClass}>Sorry, you are trying to access non-existed page. After couple of seconds the browser will be redirected to initial quiz page.</p></div>
            )

    routes = (
        <Route path="/" handler={App}>
            <Route name="user" path="user" handler={InitUserHandler}/>
            <Route name="questions" path="questions" handler={StepHandler}/>
            <Route name="result" path="result" handler={ResultHandler}/>
            <NotFoundRoute handler={NotFound}/>
            <Redirect from="quiz" to="user" />
        </Route>
    )

    Router.run routes, (Root) ->
        React.render <Root/>, document.getElementById "application"
