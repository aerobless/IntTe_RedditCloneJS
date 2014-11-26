/*jslint browser: true*/
window.onload = function () {
    "use strict";
    document.getElementById("loginButton").onclick = function () {
        alert('Hello ' + document.getElementById("username").value);
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