/*jslint browser: true*/
window.onload = function () {
    "use strict";
    var userIsLoggedIn = false;

    document.getElementById("loginButton").onclick = function () {
        $.post("/login",
            {
                name: document.getElementById("username").value,
                password: document.getElementById("password").value
            },
            function(data,status){
                userIsLoggedIn = data;
                alert("Data: " + data + "\nStatus: " + status);
            });
        return false;
    };

    document.getElementById("submitNewLink").onclick = function () {
        alert('Submitting new links is currently not supported');
        return false;
    };

    document.getElementById("submitNewTextPost").onclick = function () {
        alert('Submitting new text posts is currently not supported');
        return false;
    };

    document.getElementById("createNewSubreddit").onclick = function () {
        alert('Creating new subreddits is currently not supported');
        return false;
    };
}