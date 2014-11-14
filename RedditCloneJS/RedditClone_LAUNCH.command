#!/bin/bash
#This script launches RedditCloneJS in a new node.js server.
#Please be aware that only one server can be running at any time.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#This will only work if you're using a mac and have Google Chrome installed.
open "/Applications/Google Chrome.app" http://goo.gl/CHi1iN

#Launch the actual server
node $DIR/server.js