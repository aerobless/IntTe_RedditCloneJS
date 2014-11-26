/*jslint browser: true*/

var localPostStorage;
var username = "world";
var loggedIn = false;

var getPosts = function () {
    var posts = null;
    $.get("/entries",function(data,status){
        localPostStorage = data;
        renderPage();
    });
};

var renderPage = function () {
    var source = $("#home").html();
    var template = Handlebars.compile(source);

    var context = {username: username, loggedIn: loggedIn, posts: localPostStorage};
    document.getElementById("template").innerHTML = template(context);

    if(loggedIn) {
        loggedInListeners();
    } else {
        loggedoutListeners();
    }
};

var alwaysListening = function () {
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
};

var loggedInListeners = function () {
    alwaysListening();
    document.getElementById("logoutButton").onclick = function () {
        $.post("/logout",
            {
                //TODO properly! DOESN'T WORK LIKE THIS.
            },
            function(data,status){
                loggedIn = false;
                username = "world";
                renderPage();
            });
        return false;
    };
};

var loggedoutListeners = function () {
    alwaysListening();

    document.getElementById("loginButton").onclick = function () {
        $.post("/login",
            {
                name: document.getElementById("username").value,
                password: document.getElementById("password").value
            },
            function(data,status){

                //Test:
                //alert("Data: " + data + "\nStatus: " + status);
                if(data === true){
                    loggedIn = true;
                    username = document.getElementById("username").value;
                    renderPage();
                } else {
                    alert("Your username or password was not valid.");
                }
            });
        return false;
    };
};

window.onload = function () {
    "use strict";
    var userIsLoggedIn = false;

    var posts = getPosts();
};