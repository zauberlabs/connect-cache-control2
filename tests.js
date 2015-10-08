'use strict';

/* eslint-env mocha */
/* eslint no-unused-expressions: 0, func-names: 0 */

const cacheControl = require('./index');
const chai = require('chai');
const expect = chai.expect;

class ResponseMock {
  constructor() {
    this.headers = {};
  }

  set(key, value) {
    this.headers[key] = value;
  }
}

describe('cache-control', function() {
  let res;

  beforeEach(() => {
    res = new ResponseMock();
  });

  it('should set the cache-control header', (done) => {
    cacheControl.withCacheControl({maxAge: 10})(null, res, () => {
      expect(res.headers).to.include.property('Cache-Control');
      done();
    });
  });

  it('should use seconds unit by default', (done) => {
    cacheControl.withCacheControl({maxAge: 10})(null, res, () => {
      expect(res.headers).to.include.property('Cache-Control', 'public, max-age=10');
      done();
    });
  });

  it('should support other units', (done) => {
    cacheControl.withCacheControl({maxAge: '10 hours'})(null, res, () => {
      expect(res.headers).to.include.property('Cache-Control', 'public, max-age=36000');
      done();
    });
  });

  it('should fail if an invalid unit is used', () => {
    expect(() => cacheControl.withCacheControl({maxAge: '1 cono'}))
      .to.throw(Error);
  });

  it('should accept noCache option', (done) => {
    cacheControl.withCacheControl({noCache: true})(null, res, () => {
      expect(res.headers).to.include.property('Cache-Control', 'public, no-cache');
      done();
    });
  });

  it('should accept noStore option', (done) => {
    cacheControl.withCacheControl({noStore: true})(null, res, () => {
      expect(res.headers).to.include.property('Cache-Control', 'public, no-store');
      done();
    });
  });

  it('should accept mustRevalidate option', (done) => {
    cacheControl.withCacheControl({mustRevalidate: true})(null, res, () => {
      expect(res.headers).to.include.property('Cache-Control', 'public, must-revalidate');
      done();
    });
  });

  it('should accept private option', (done) => {
    cacheControl.withCacheControl({private: true, maxAge: 10})(null, res, () => {
      expect(res.headers).to.include.property('Cache-Control', 'private, max-age=10');
      done();
    });
  });

});
