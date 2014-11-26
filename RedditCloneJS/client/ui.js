/*jslint browser: true*/

window.onload = function () {
    "use strict";
    var userIsLoggedIn = false;

    var source = $("#home").html();
    var template = Handlebars.compile(source);

    var context = {username: "world"}
    document.getElementById("template").innerHTML = template(context);


    document.getElementById("loginButton").onclick = function () {
        $.post("/login",
            {
                name: document.getElementById("username").value,
                password: document.getElementById("password").value
            },
            function(data,status){
                userIsLoggedIn = data;

                //Test:
                //alert("Data: " + data + "\nStatus: " + status);

                var context = {username: document.getElementById("username").value}
                document.getElementById("template").innerHTML = template(context);
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