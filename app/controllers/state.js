"use strict";

var getApplicationState = function(req, res) {
    var response;
    var user_name = req.session['user_name'];

    if (!user_name){
        response = {
            state: "INIT_USER_STATE",
            user_name: user_name
        } 
    } else {
        response = {
            state: "Q_STATE", 
            user_name: user_name
        } 
    }

    res.json(response);
}

var setInitialApplicationState = function(res) {
    console.log("setInitialApplicationState:::::", res)
}

var StateController = {
    getApplicationState: getApplicationState,
    setInitialApplicationState: setInitialApplicationState
}

module.exports = StateController