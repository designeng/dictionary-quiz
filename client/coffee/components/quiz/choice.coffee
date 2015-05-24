define [
    "underscore"
    "jquery"
    "react"
], (_, $, React) ->

    Choice = React.createClass

        getRadios: ->
            return @.getDOMNode().querySelectorAll('input[type="radio"]')

        getCheckedInput: ->
            radios = @.getRadios()
            res = _.filter radios, (item) ->
                if item.checked
                    return true

            return res[0]

        uncheck: ->
            $('.radio-input').prop('checked', false)

        render: ->
            listGroupClass = "list-group"
            listGroupItemClass = "list-group-item"
            choiceValueClass = "choice-value"
            radioInputClass = "radio-input"

            choises = _.map @.props.source, (choise) =>
                return <li className={listGroupItemClass}><input type="radio" value={choise} name="multiChoice" onChange={@.props.onChange} className={radioInputClass}/><label className={choiceValueClass}>{choise}</label></li>

            return (
                <ul className={listGroupClass}>{choises}</ul>
            )