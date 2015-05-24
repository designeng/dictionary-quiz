define(["underscore", "jquery", "react"], function(_, $, React) {
  var Choice;
  return Choice = React.createClass({
    getRadios: function() {
      return this.getDOMNode().querySelectorAll('input[type="radio"]');
    },
    getCheckedInput: function() {
      var radios, res;
      radios = this.getRadios();
      res = _.filter(radios, function(item) {
        if (item.checked) {
          return true;
        }
      });
      return res[0];
    },
    uncheck: function() {
      return $('.radio-input').prop('checked', false);
    },
    render: function() {
      var choiceValueClass, choises, listGroupClass, listGroupItemClass, radioInputClass;
      listGroupClass = "list-group";
      listGroupItemClass = "list-group-item";
      choiceValueClass = "choice-value";
      radioInputClass = "radio-input";
      choises = _.map(this.props.source, (function(_this) {
        return function(choise) {
          return React.createElement("li", {
            "className": listGroupItemClass
          }, React.createElement("input", {
            "type": "radio",
            "value": choise,
            "name": "multiChoice",
            "onChange": _this.props.onChange,
            "className": radioInputClass
          }), React.createElement("label", {
            "className": choiceValueClass
          }, choise));
        };
      })(this));
      return React.createElement("ul", {
        "className": listGroupClass
      }, choises);
    }
  });
});
