# connect-cache-control2

Connect Middleware to handle cache control with ease

## Usage

To use use the middleware just import the `withCacheControl` function and create a middleware for the routes or routes you want.

```javascript
const withCacheControl = require('connect-cache-control2').withCacheControl;

app.get('/some-path',
  withCacheControl({maxAge: '2 hours', private: true}),
  function (req, res) {
    // do your thing..
  });
```

The possible options to pass are:

 * `private`: Set to true to use 'private' if not will be 'public'
 * `maxAge`: Set the amount to use for max-age. If the value is a number is interpreted as seconds. If it's a
    string we use [ms](https://www.npmjs.com/package/ms) module to parse it.
 * `noStore`: set 'no-store' if true
 * `noCache`: set 'no-cache' if true
 * `mustRevalidate`: set 'must-revalidate' if true

To understand what each option means, you can check: [Beginners Guide to HTTP Cache Headers](http://www.mobify.com/blog/beginners-guide-to-http-cache-headers/)

### Without the Middleware

If you just need to generate a 'Cache-Control' valid value, you can use `toCacheControl(options)` function.

Just do:

```javascript
const toCacheControl = require('connect-cache-control2').toCacheControl;

app.get('/some-path',
  function (req, res) {
    // do your thing..
    res.set('Cache-Control', toCacheControl({maxAge: '2 hours', private: true}));
  });
```

### Shortcut for noCache

Typically, to avoid proxy cache to store and cache a resource when we not intend to, we should set
'Cache-Control' to tell that. We defined an already configured middleware for that.

```javascript
const noCache = require('connect-cache-control2').noCache;

app.get('/some-path',
  noCache,
  function (req, res) {
    // do your thing..
  });
```

Which is the same as:

```javascript
withCacheControl({noCache: true, mustRevalidate: true, maxAge: 0})
```
