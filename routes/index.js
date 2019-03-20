var express = require('express');
var router = express.Router();

var requests = require('../api/requests')

let counter = 1;

/*
 * Server side rendered content
 */
router.get('/', function serverSideRendering(req, res) {
    // initialize some cookie
    if (!req.cookies.bar) {
        res.cookie('bar', ++counter)
    }

    // injecting cookies to requests module
    // because API requests performed on server
    // do not contain cookies
    const ejectCookie = requests.injectCookie(req.headers.cookie);

    // Perform API request that is needed to fetch data
    // so that we can render (e.g. React) on server

    // When server side rendering react app we don't have direct access
    // to the requests module since it's being called from
    // a static method on component to fetch initial data
    //
    // e.g. AppComponent.serverFetch = () => {
    //  requests.getFoo().then(...)
    // }
    requests.getFoo().then(({injectedCookie}) => {
        res.render('index', {title: 'Express', cookie: injectedCookie})
        ejectCookie()
    });
})


module.exports = router;
