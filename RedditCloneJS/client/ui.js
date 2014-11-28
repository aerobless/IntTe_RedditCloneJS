/*jslint browser: true*/
/*global $:false */
/*global Handlebars:false */
/*jshint latedef:true */
/*jslint todo: true */

var localPostStorage,
    username = "world",
    loggedIn = false;

var getPosts = function () {
    "use strict";
    $.get("/entries", function (data) {
        window.localPostStorage = data;
        renderPage();
    });
};

var renderPage = function () {
    "use strict";
    var source = $("#home").html(),
        template = Handlebars.compile(source),
        context = {username: username, loggedIn: loggedIn, posts: localPostStorage};

    document.getElementById("template").innerHTML = template(context);

    //Hiding registrationJumbo by default:
    $(document.getElementById("registrationJumbo")).hide();

    if (loggedIn) {
        loggedInListeners();
    } else {
        loggedoutListeners();
    }
};

var alwaysListening = function () {
    "use strict";
    document.getElementById("submitNewLink").onclick = function () {
        window.alert('Submitting new links is currently not supported');
        return false;
    };

    document.getElementById("submitNewTextPost").onclick = function () {
        window.alert('Submitting new text posts is currently not supported');
        return false;
    };

    document.getElementById("createNewSubreddit").onclick = function () {
        window.alert('Creating new subreddits is currently not supported');
        return false;
    };
};

var loggedInListeners = function () {
    alwaysListening();
    document.getElementById("logoutButton").onclick = function () {
        $.removeCookie("username");
        $.removeCookie("password");
        $.post("/logout",
            {
                //TODO properly! DOESN'T WORK LIKE THIS.
            },
            function () {
                loggedIn = false;
                username = "world";
                renderPage();
            });
        return false;
    };
};

var login = function (username, password) {
    "use strict";
    $.post("/login",
        {
            name: username,
            password: password
        },
        function (data) {

            //Test:
            //alert("Data: " + data + "\nStatus: " + status);
            if (data === true) {
                loggedIn = true;

                //access global variable via window
                window.username = username;
                renderPage();

                //Store session cookie
                $.cookie("username", username);
                $.cookie("password", password);

            } else {
                window.alert("Your username or password was not valid."+username+" "+password);
            }
        });
    return false;
};

var loggedoutListeners = function () {
    "use strict";
    alwaysListening();

    document.getElementById("loginButton").onclick = function () {
        var username, password;
        username = document.getElementById("usernameLogin").value;
        password = document.getElementById("passwordLogin").value;

        login(username, password);
    };

    document.getElementById("registerButton").onclick = function () {
        showRegistrationForm();
        return false;
    };
};

var showRegistrationForm = function () {
    "use strict";
    $(document.getElementById("registrationJumbo")).toggle();
    $(document.getElementById("welcomeJumbo")).toggle();

    document.getElementById("cancelRegistration").onclick = function () {
        $(document.getElementById("registrationJumbo")).hide();
        $(document.getElementById("welcomeJumbo")).show();
        return false;
    };

    document.getElementById("submitRegistration").onclick = function () {
        var username, password;
        username = document.getElementById("usernameRegistration").value;
        password = document.getElementById("passwordRegistration").value;

        $.post("/register",
            {
                name: username,
                password: password
            },
            function (data) {
                //Test:
                //alert("Data: " + data + "\nStatus: " + status);
                if (data === true) {
                    //Automatically login after successful registration.
                    login(username, password);
                } else {
                    window.alert("Your username or password was not valid.");
                }
            });
        return false;
    };
};

window.onload = function () {
    "use strict";

    //Hide Registration-Jumbo
    $("p").hide();

    //Resume session from cookie
    //TODO: Obviously it is #bad to store a password in a cookie.
    if ($.cookie("username")) {
        var username = $.cookie("username"),
            password = $.cookie("password");
        login(username, password);
    }

    getPosts();
};