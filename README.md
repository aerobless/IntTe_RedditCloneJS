IntTe_RedditCloneJS
===================
RedditClone is a project for the class InternetTechnology at [HSR](http://www.hsr.ch). It's the goal of this project to create a clone of the popular social link sharing site [Reddit](http://reddit.com) using [Node.js](http://nodejs.org/).

![RedditCloneJS v01](https://raw.githubusercontent.com/aerobless/IntTe_RedditCloneJS/master/screenshots/RedditCloneJS_02.png)

##Features
 + Register users
 + Submit links
 + Comment on links
 + Vote for links or comments
 + Client-side rendering
 + Low-footprint node.js server
 + RESTful

##Project setup
1. Install Node.js. If you're using a mac [Homebrew](http://brew.sh/) is the way to go. (`brew install node`).
2. Clone this repository `git clone https://github.com/aerobless/IntTe_RedditCloneJS.git`.
3. Navigate to the local repo and run `npm install` to install the required node-modules.
4. Run `bower install`. (Maybe you need to do `npm install -g bower` first.)
5. You can now start the server `node server.js` it will be hosted at `http://localhost:4730`.

##Time Tracking
This is a rudimentary time tracking. Please see the [commit-history](https://github.com/aerobless/IntTe_RedditCloneJS/commits/master) for more details.

|Date | Time spent | Name | Task |
|-----|------------|------|------|
|12.11.2014 | 2h  | Theo  | Project Setup, Git Repo, basic home.jade design |
|26.11.2014 | 2h  | Daniela, Marco, Theo  | Template engine chosen, server-client communication  |
|26.11.2014 | 3h  | Theo  | User login, user registration  |
|28.11.2014 | 7h  | Theo  | Iterating over posts, up & downvotes for posts, new post form, css  |
|28.11.2014 | 1h  | Marco  | up & downvotes for posts|
|29.11.2014 | 4h  | Theo  | Iterating over comments, up & downvotes for comments, adding comment functionality, css improvements. |
