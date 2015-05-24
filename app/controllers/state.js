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
            state: "INIT_USER_STATE", 
            user_name: user_name
        } 
    }

    res.json(response);
}

var StateController = {
    getApplicationState: getApplicationState
}

module.exports = StateController