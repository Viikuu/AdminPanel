# AdminPanel

This app is a simple admin panel with login page.

Made using Node.js, Express.js and React.js.

## Table of contents

* [Functionalities](#functionalities)
* [Setup](#setup)

## Functionalities

Web application with registration and authentication. Non-authenticated users don't have access to user management (admin panel).
Loged user is redirected to main page with is admin panel. Any user can block/delete/unblock any user in db.
Blocked user can't login and register again at same data. Deleted user can register again.

## Setup

To run this project, do the following steps:

* download repository files

```
 cd ../downloadLocation
 cd ../backend
    npm install
    mkdir .env ( here create POST=5000 variable, ACCESS_TOKEN_SECRET variable and link MONGO_URL )
    node server.mjs
    
 cd ../public
    npm install
    npm start
    
```
