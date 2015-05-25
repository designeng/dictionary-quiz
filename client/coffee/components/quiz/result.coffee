define [
    "underscore"
    "jquery"
    "react"
    "api"
    "components/ajax/ajaxRequest"
], (_, $, React, api, AjaxRequest) ->

    Result = React.createClass

        contextTypes:
            router: React.PropTypes.func

        getDefaultProps: ->
            userScorePath: api.userScorePath
            method: "GET"

        getInitialState: ->
            return {
                score: 0
            }

        componentDidMount: ->
            @.getUserScore()

        getUserScore: ->
            new AjaxRequest(@.props.userScorePath, null, @.props.method, "application/json").always @onGetUserScore

        onGetUserScore: (result) ->
            @.setState
                score: result["userscore"]

        btnClickHandler: ->
            @.context.router.transitionTo("user")

        render: ->
            resultClass = "bg-success result"
            newQuizBtnClass = "btn btn-info newQuizBtn"
            return (
                <div>
                    <p className={resultClass} id="result">Quiz is over. Yor result: {@.state.score}</p>
                    <input type="button" value="New Quiz" id="newQuizBtn" className={newQuizBtnClass} onClick={@.btnClickHandler}/>
                </div>
            )