define [
    "underscore"
    "jquery"
    "react"
    "components/ajax/ajaxRequest"
], (_, $, React, AjaxRequest) ->

    Result = React.createClass

        contextTypes:
            router: React.PropTypes.func

        getDefaultProps: ->
            userScorePath: "../api/web/v1/sessions"
            method: "GET"

        getInitialState: ->
            return {
                score: 0
            }

        componentDidMount: ->
            @.getUserScore()

        getUserScore: ->
            new AjaxRequest(@.props.userScorePath, {score: true}, @.props.method, "application/json").always @onGetUserScore

        onGetUserScore: (result) ->
            @.setState
                score: result["user_score"]

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