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
        installVoteListeners();
    });
};

var renderPage = function () {
    "use strict";
    var source = $("#home").html(),
        template = Handlebars.compile(source),
        context = {username: username, loggedIn: loggedIn, posts: localPostStorage};

    document.getElementById("template").innerHTML = template(context);

    //Hiding registrationJumbo by default:
    hideAllJumbos();
    $(document.getElementById("welcomeJumbo")).show();

    if (loggedIn) {
        loggedInListeners();
    } else {
        loggedoutListeners();
    }
};

var hideAllJumbos = function () {
    "use strict";
    $(document.getElementById("registrationJumbo")).hide();
    $(document.getElementById("welcomeJumbo")).hide();
    $(document.getElementById("postJumbo")).hide();
};

var alwaysListening = function () {
    "use strict";
    document.getElementById("logoButton").onclick = function () {
        hideAllJumbos();
        $(document.getElementById("welcomeJumbo")).show();
        return false;
    };

    document.getElementById("submitNewLink").onclick = function () {
        if (loggedIn) {
            showPostForm();
        } else {
            window.alert("You need to be logged in to submit a new post.");
        }
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
    "use strict";
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
                getPosts();
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
                getPosts();

                //Store session cookie
                $.cookie("username", username);
                $.cookie("password", password);

            } else {
                window.alert("Your username or password was not valid." + username + " " + password);
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
        getPosts();
    };

    document.getElementById("registerButton").onclick = function () {
        showRegistrationForm();
        return false;
    };
};

var showPostForm = function () {
    "use strict";
    hideAllJumbos();
    $(document.getElementById("postJumbo")).show();

    document.getElementById("submitPost").onclick = function () {
        var postTitle = document.getElementById("postTitle").value,
            postURL = document.getElementById("postTitle").value;

        //TODO: there really should be some server-side authentication.. currently anyone can post something, it's a heaven for spammers.
        //TODO: but this is a server issue, so I'm going to leave it for now.
        $.post("/entry",
            {
                title: postTitle,
                url: postURL,
                name: username
            },
            function () {
                //Test:
                //alert("Data: " + data + "\nStatus: " + status);
                //TODO: check whether submitting was successful

                //Renders page with new posts.
                getPosts();
            });
        return false;
    };
};

var showRegistrationForm = function () {
    "use strict";
    hideAllJumbos();
    $(document.getElementById("registrationJumbo")).show();

    document.getElementById("cancelRegistration").onclick = function () {
        hideAllJumbos();
        $(document.getElementById("welcomeJumbo")).show();
        return false;
    };

    document.getElementById("submitRegistration").onclick = function () {
        var username = document.getElementById("usernameRegistration").value,
            password = document.getElementById("passwordRegistration").value,
            passwordConfirm = document.getElementById("passwordConfirmationRegistration").value;

        //Client-side validation:
        //firstname, lastname & email are being ignored for this demo.
        if (password === passwordConfirm) {
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
        } else {
            window.alert("Password doesn't match confirmation password.");
        }
        return false;
    };
};

var installVoteListeners = function () {
    "use strict";
    window.localPostStorage.forEach(function (value, i) {

        //Entry Upvote Listener:
        document.getElementById("upvote" + i).onclick = function () {
            if (loggedIn) {
                $.post("/entry/" + i + "/up",
                    {

                    },
                    function () {
                        //Test:
                        //alert("Data: " + data + "\nStatus: " + status);
                        //TODO: check whether submitting was successful

                        //Renders page with new votes.
                        getPosts();
                    });
            }
            return false;
        };

        //Entry Downvote Listener:
        document.getElementById("downvote" + i).onclick = function () {
            if (loggedIn) {
                $.post("/entry/" + i + "/down",
                    {

                    },
                    function () {
                        //Test:
                        //alert("Data: " + data + "\nStatus: " + status);
                        //TODO: check whether submitting was successful

                        //Renders page with new votes.
                        getPosts();
                    });
            }
            return false;
        };

        //Entry Comment Form inital invisibility
        $(document.getElementById("commentForm" + i)).hide();

        //Entry Comment Listener:
        document.getElementById("comment" + i).onclick = function () {
            if (loggedIn) {
                $(document.getElementById("commentForm" + i)).toggle();
            } else {
                window.alert("Please login first.");
            }
            return false;
        };

        //Entry Comment Submit Listener:
        document.getElementById("submitComment" + i).onclick = function () {
            if (loggedIn) {
                $.post("/entry/" + i + "/comment",
                    {
                        text: document.getElementById("commentFormField" + i).value
                    },
                    function () {
                        //Test:
                        //alert("Data: " + data + "\nStatus: " + status);
                        //TODO: check whether submitting was successful

                        //Renders page with new votes.
                        getPosts();
                    });
            } else {
                window.alert("Please login first.");
            }
            return false;
        };

        //Iterate over all comment per post:
        value.comments.forEach(function (value, i) {
            //Comment Upvote Listener:
            document.getElementById("upvoteComment" + value.id).onclick = function () {
                if (loggedIn) {
                    $.post("/comment/" + value.id + "/up",
                        {

                        },
                        function () {
                            //Test:
                            //alert("Data: " + data + "\nStatus: " + status);
                            //TODO: check whether submitting was successful

                            //Renders page with new votes.
                            getPosts();
                        });
                }
                return false;
            };
        });


        //Comment Downvote Listener:
        value.comments.forEach(function (value, i) {
            //Comment Upvote Listener:
            document.getElementById("downvoteComment" + value.id).onclick = function () {
                if (loggedIn) {
                    $.post("/comment/" + value.id + "/down",
                        {

                        },
                        function () {
                            //Test:
                            //alert("Data: " + data + "\nStatus: " + status);
                            //TODO: check whether submitting was successful

                            //Renders page with new votes.
                            getPosts();
                        });
                }
                return false;
            };
        });
    });
};

window.onload = function () {
    "use strict";

    //Hide Registration-Jumbo
    hideAllJumbos();
    $(document.getElementById("welcomeJumbo")).show();

    //Resume session from cookie
    //TODO: Obviously it is #bad to store a password in a cookie.
    if ($.cookie("username")) {
        var username = $.cookie("username"),
            password = $.cookie("password");
        login(username, password);
    }

    getPosts();
};