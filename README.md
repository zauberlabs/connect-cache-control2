# cache-control

Connect Middleware to handle cache control with ease

## Usage

To use use the middleware just import the `withCacheControl` function and create a middleware for the routes or routes you want.

```javascript
const withCacheControl = require('cache-control').withCacheControl;

app.get('/some-path',
  withCacheControl({maxAge: 2, unit: 'hours', private: true}),
  function (req, res) {
    // do your thing..
  });
```

The possible options to pass are:

 * `private`: Set to true to use 'private' if not will be 'public'
 * `maxAge`: Set the amount to use for max-age. The unit is seconds unless unit is defined.
 * `unit`: One of 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'.
 * `noStore': set 'no-store' if true
 * `noCache`: set 'no-cache' if true
 * `mustRevalidate`: set 'must-revalidate' if true

### Without the Middleware

If you just need to generate a 'Cache-Control' valid value, you can use `toCacheControl(options)` function.

Just do:

```javascript
const toCacheControl = require('cache-control').toCacheControl;

app.get('/some-path',
  function (req, res) {
    // do your thing..
    res.header('Cache-Control', toCacheControl({maxAge: 2, unit: 'hours', private: true}));
  });
```
