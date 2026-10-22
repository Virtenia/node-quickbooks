var assert = require('assert'),
    http = require('http'),
    Readable = require('stream').Readable,
    QuickBooks = require('../index');

describe('Offline merge regressions', function () {
  var server, endpoint, qbo, requests, reply;
  var tokenUrl = QuickBooks.TOKEN_URL, revokeUrl = QuickBooks.REVOKE_URL;
  var reconnectUrl = QuickBooks.RECONNECT_URL, disconnectUrl = QuickBooks.DISCONNECT_URL;

  // Use the real HTTP transport against a local server, without QBO credentials.
  before(function (done) {
    server = http.createServer(function (req, res) {
      var chunks = [];
      req.on('data', function (chunk) { chunks.push(chunk); });
      req.on('end', function () {
        var request = {
          url: new URL(req.url, endpoint),
          method: req.method,
          headers: req.headers,
          body: Buffer.concat(chunks)
        };
        requests.push(request);
        var response = reply(request);
        res.writeHead(response.status || 200, {
          'Content-Type': response.type || 'application/json'
        });
        res.end(typeof response.body === 'object' && !Buffer.isBuffer(response.body)
          ? JSON.stringify(response.body) : response.body);
      });
    });
    server.listen(0, '127.0.0.1', function () {
      endpoint = 'http://127.0.0.1:' + server.address().port + '/';
      done();
    });
  });

  after(function (done) { server.close(done); });

  beforeEach(function () {
    requests = [];
    reply = function () { return { body: {} }; };
    qbo = new QuickBooks('key', 'secret', 'token', false, 'realm', true, false, 75, '2.0', 'refresh');
    qbo.endpoint = endpoint;
  });

  afterEach(function () {
    QuickBooks.TOKEN_URL = tokenUrl;
    QuickBooks.REVOKE_URL = revokeUrl;
    QuickBooks.RECONNECT_URL = reconnectUrl;
    QuickBooks.DISCONNECT_URL = disconnectUrl;
  });

  function call(method, args) {
    return new Promise(function (resolve) {
      qbo[method].apply(qbo, args.concat(function (err, data, res) {
        resolve({ err: err, data: data, res: res });
      }));
    });
  }

  [
    ['sendEstimatePdf', 'estimate', 'Estimate'],
    ['sendInvoicePdf', 'invoice', 'Invoice'],
    ['sendCreditMemoPdf', 'creditmemo', 'CreditMemo'],
    ['sendPurchaseOrder', 'purchaseorder', 'PurchaseOrder'],
    ['sendSalesReceiptPdf', 'salesreceipt', 'SalesReceipt']
  ].forEach(function (item) {
    it('preserves encoded recipients for ' + item[0], async function () {
      var entity = { Id: '123' }, body = {};
      body[item[2]] = entity;
      reply = function () { return { body: body }; };
      var email = 'billing+tag&x=?#é@example.com';
      var result = await call(item[0], ['123', email]);
      assert.ifError(result.err);
      assert.deepStrictEqual(result.data, entity);
      assert.strictEqual(requests.length, 1);
      assert.strictEqual(requests[0].method, 'POST');
      assert.strictEqual(requests[0].url.pathname, '/realm/' + item[1] + '/123/send');
      assert.strictEqual(requests[0].url.searchParams.get('sendTo'), email);
      assert.strictEqual(requests[0].url.searchParams.get('minorversion'), '75');
      assert.strictEqual(requests[0].headers.authorization, 'Bearer token');
      assert.strictEqual(requests[0].body.length, 0);
    });
  });

  ['Invoice', 'Estimate'].forEach(function (entity) {
    var method = 'send' + entity + 'Pdf';
    it('preserves retry request IDs for ' + method, async function () {
      var body = {};
      body[entity] = { Id: '123' };
      reply = function () { return { body: body }; };
      var requestId = 'retry+id &?#é';
      for (var i = 0; i < 2; i++) {
        var result = await new Promise(function (resolve) {
          qbo[method]('123', 'billing+tag@example.com', function (err, data) {
            resolve({ err: err, data: data });
          }, requestId);
        });
        assert.ifError(result.err);
        assert.strictEqual(result.data.Id, '123');
      }
      assert.strictEqual(requests.length, 2);
      requests.forEach(function (request) {
        assert.strictEqual(request.url.searchParams.get('requestid'), requestId);
        assert.strictEqual(request.url.searchParams.get('sendTo'), 'billing+tag@example.com');
        assert.strictEqual(request.body.length, 0);
      });
    });

    it('supports the callback-only recipient overload for ' + method, async function () {
      var body = {};
      body[entity] = { Id: '123' };
      reply = function () { return { body: body }; };
      var result = await call(method, ['123']);
      assert.ifError(result.err);
      assert.strictEqual(result.data.Id, '123');
      assert.strictEqual(requests[0].url.searchParams.has('sendTo'), false);
      assert.strictEqual(requests[0].url.searchParams.has('requestid'), false);
    });

    [undefined, ''].forEach(function (recipient) {
      it('supports a request ID with recipient ' + String(recipient) + ' for ' + method, async function () {
        var body = {};
        body[entity] = { Id: '123' };
        reply = function () { return { body: body }; };
        var result = await new Promise(function (resolve) {
          qbo[method]('123', recipient, function (err, data) {
            resolve({ err: err, data: data });
          }, 'retry-id');
        });
        assert.ifError(result.err);
        assert.strictEqual(result.data.Id, '123');
        assert.strictEqual(requests[0].url.searchParams.has('sendTo'), false);
        assert.strictEqual(requests[0].url.searchParams.get('requestid'), 'retry-id');
        assert.strictEqual(requests[0].body.length, 0);
      });
    });
  });

  ['buffer', 'stream'].forEach(function (input) {
    ['json', 'xml'].forEach(function (format) {
      it('uploads a ' + input + ' and normalizes ' + format + ' responses', async function () {
        var attachment = { Id: '42', FileName: 'file.pdf' };
        reply = function () {
          return format === 'json'
            ? { body: { AttachableResponse: [{ Attachable: attachment }] } }
            : { type: 'application/xml', body: ' \n<IntuitResponse><AttachableResponse>' +
              '<Attachable><Id>42</Id><FileName>file.pdf</FileName></Attachable>' +
              '</AttachableResponse></IntuitResponse>' };
        };
        var content = Buffer.from([0, 1, 2, 255, 10]);
        var result = await call('upload', ['file.pdf', 'application/pdf',
          input === 'buffer' ? content : Readable.from([content])]);
        assert.ifError(result.err);
        assert.strictEqual(String(result.data.Id), '42');
        assert.strictEqual(result.data.FileName, 'file.pdf');
        assert.strictEqual(requests.length, 1);
        var request = requests[0];
        assert.strictEqual(request.url.pathname, '/realm/upload');
        assert.match(request.headers['content-type'], /^multipart\/form-data; boundary=/);
        assert.ok(request.body.includes(Buffer.from('name="file_content_01"; filename="file.pdf"')));
        assert.ok(request.body.includes(Buffer.from('Content-Type: application/pdf')));
        assert.ok(request.body.includes(content));
        if (input === 'buffer') {
          assert.strictEqual(Number(request.headers['content-length']), request.body.length);
        }
      });
    });
  });

  it('links an XML upload to the requested entity', async function () {
    reply = function (request) {
      if (request.url.pathname.endsWith('/upload')) {
        return { type: 'application/xml', body: '<IntuitResponse><AttachableResponse>' +
          '<Attachable><Id>42</Id></Attachable></AttachableResponse></IntuitResponse>' };
      }
      return { body: { Attachable: { Id: '42', linked: true } } };
    };
    var result = await call('upload', ['file.pdf', 'application/pdf', Buffer.from('pdf'), 'Invoice', 123]);
    assert.ifError(result.err);
    assert.strictEqual(result.data.linked, true);
    assert.strictEqual(requests.length, 2);
    var update = JSON.parse(requests[1].body);
    assert.strictEqual(String(update.Id), '42');
    assert.strictEqual(update.SyncToken, '0');
    assert.deepStrictEqual(update.AttachableRef, [{ EntityRef: { type: 'Invoice', value: '123' } }]);
    assert.strictEqual(requests[1].url.searchParams.get('operation'), 'update');
  });

  it('preserves default XML value conversion and entities in attachment responses', async function () {
    reply = function () {
      return { type: 'application/xml', body: '<?xml version="1.0" encoding="UTF-8"?>' +
        '<IntuitResponse xmlns="http://schema.intuit.com/finance/v3" time="2026-10-22T00:00:00Z">' +
        '<AttachableResponse><Attachable domain="QBO"><Id>00042</Id><SyncToken>0</SyncToken>' +
        '<FileName>invoice &amp; receipt.pdf</FileName><Size>00123</Size><Active>false</Active>' +
        '<Note><![CDATA[Invoice <A> & receipt]]></Note><ContentType>application/pdf</ContentType>' +
        '<TempDownloadUri>https://example.com/file?a=1&amp;b=2</TempDownloadUri>' +
        '<Category>invoice</Category><Category>receipt</Category>' +
        '</Attachable></AttachableResponse></IntuitResponse>' };
    };
    var result = await call('upload', ['file.pdf', 'application/pdf', Buffer.from('pdf')]);
    assert.ifError(result.err);
    assert.deepStrictEqual(result.data, {
      Id: 42, SyncToken: 0, FileName: 'invoice & receipt.pdf', Size: 123, Active: false,
      Note: 'Invoice <A> & receipt', ContentType: 'application/pdf',
      TempDownloadUri: 'https://example.com/file?a=1&b=2', Category: ['invoice', 'receipt']
    });
  });

  it('reports XML upload faults instead of treating them as success', async function () {
    reply = function () {
      return { type: 'application/xml', body: '<IntuitResponse><AttachableResponse>' +
        '<Fault><Error><Message>Upload failed</Message></Error></Fault>' +
        '</AttachableResponse></IntuitResponse>' };
    };
    var result = await call('upload', ['file.pdf', 'application/pdf', Buffer.from('pdf')]);
    assert.ok(result.err.Fault);
    assert.strictEqual(result.data, null);
  });

  it('preserves XML fault details and repeated errors', async function () {
    reply = function () {
      return { type: 'application/xml', body: '<IntuitResponse><AttachableResponse><Fault type="ValidationFault">' +
        '<Error code="1"><Message>Invalid &amp; rejected</Message><Detail>First problem</Detail></Error>' +
        '<Error code="2"><Message>Missing value</Message><Detail>Second problem</Detail></Error>' +
        '</Fault></AttachableResponse></IntuitResponse>' };
    };
    var result = await call('upload', ['file.pdf', 'application/pdf', Buffer.from('pdf')]);
    assert.deepStrictEqual(result.err, { Fault: { Error: [
      { Message: 'Invalid & rejected', Detail: 'First problem' },
      { Message: 'Missing value', Detail: 'Second problem' }
    ] } });
    assert.strictEqual(result.data, null);
  });

  [
    ['reconnect', 'ReconnectResponse', 'RECONNECT_URL'],
    ['disconnect', 'PlatformResponse', 'DISCONNECT_URL']
  ].forEach(function (item) {
    [0, 42].forEach(function (errorCode) {
      it('parses ' + item[0] + ' XML with error code ' + errorCode, async function () {
        QuickBooks[item[2]] = endpoint + item[0];
        reply = function () {
          return { type: 'application/xml', body: '<?xml version="1.0" encoding="UTF-8"?>' +
            '<' + item[1] + ' xmlns="http://platform.intuit.com/api/v1">' +
            '<ErrorCode>' + errorCode + '</ErrorCode><ErrorMessage>Access &amp; token</ErrorMessage>' +
            '<OAuthToken>token-123</OAuthToken><ExpiresIn>180</ExpiresIn></' + item[1] + '>' };
        };
        var result = await call(item[0], []);
        var expected = { ErrorCode: errorCode, ErrorMessage: 'Access & token', OAuthToken: 'token-123', ExpiresIn: 180 };
        assert.deepStrictEqual(result.data, expected);
        assert.deepStrictEqual(result.err, errorCode === 0 ? null : expected);
        assert.strictEqual(requests[0].url.pathname, '/' + item[0]);
      });
    });
  });

  it('reports unrecognized XML uploads through the callback', async function () {
    reply = function () { return { type: 'application/xml', body: ' \n<IntuitResponse><Fault/></IntuitResponse>' }; };
    var result = await call('upload', ['file.pdf', 'application/pdf', Buffer.from('pdf')]);
    assert.match(result.err, /<Fault/);
    assert.strictEqual(result.data, null);
  });

  it('reports malformed XML uploads when parsing throws', async function () {
    reply = function () { return { type: 'application/xml', body: '<IntuitResponse><AttachableResponse a="' }; };
    var result = await call('upload', ['file.pdf', 'application/pdf', Buffer.from('pdf')]);
    assert.strictEqual(result.err, '<IntuitResponse><AttachableResponse a="');
    assert.strictEqual(result.data, null);
  });

  it('does not normalize an XML attachment returned with an HTTP error into success', async function () {
    reply = function () {
      return { status: 500, type: 'application/xml', body: '<IntuitResponse><AttachableResponse>' +
        '<Attachable><Id>42</Id></Attachable></AttachableResponse></IntuitResponse>' };
    };
    var result = await call('upload', ['file.pdf', 'application/pdf', Buffer.from('pdf')]);
    assert.ok(result.err);
    assert.strictEqual(result.err.response.status, 500);
    assert.strictEqual(result.data, null);
  });

  ['json', 'xml'].forEach(function (format) {
    it('rejects HTTP upload errors when shared Axios defaults accept them (' + format + ')', async function () {
      var axios = require('axios'), validateStatus = axios.defaults.validateStatus;
      var body = format === 'json' ? { AttachableResponse: [{ Attachable: { Id: '42' } }] }
        : '<IntuitResponse><AttachableResponse><Attachable><Id>42</Id></Attachable></AttachableResponse></IntuitResponse>';
      reply = function () { return { status: 500, type: 'application/' + format, body: body }; };
      try {
        axios.defaults.validateStatus = function () { return true; };
        var result = await call('upload', ['file.pdf', 'application/pdf', Buffer.from('pdf')]);
        assert.deepStrictEqual(result.err, body);
        assert.strictEqual(result.data, null);
      } finally {
        axios.defaults.validateStatus = validateStatus;
      }
    });
  });

  it('preserves findEntities criteria, query parameters, and headers', async function () {
    reply = function () { return { body: { QueryResponse: { Invoice: [{ Id: '1' }] } } }; };
    var criteria = { DocNumber: 'A+B & C' };
    var result = await call('findEntities', ['Invoice', criteria, {
      qs: { minorversion: 80, requestid: 'query-id' }, headers: { 'X-Custom': 'query-header' }
    }]);
    assert.ifError(result.err);
    assert.strictEqual(result.data.QueryResponse.Invoice[0].Id, '1');
    assert.deepStrictEqual(criteria, { DocNumber: 'A+B & C' });
    assert.match(requests[0].url.searchParams.get('query'), /DocNumber = 'A\+B & C'/);
    assert.strictEqual(requests[0].url.searchParams.get('minorversion'), '80');
    assert.strictEqual(requests[0].url.searchParams.get('requestid'), 'query-id');
    assert.strictEqual(requests[0].headers['x-custom'], 'query-header');
  });

  it('supports findEntities without criteria or options', async function () {
    reply = function () { return { body: { QueryResponse: { Invoice: [] } } }; };
    var result = await call('findEntities', ['Invoice']);
    assert.ifError(result.err);
    assert.deepStrictEqual(result.data.QueryResponse.Invoice, []);
  });

  it('reports query failures through findEntities', async function () {
    reply = function () { return { status: 400, body: { Fault: { Error: [{ Message: 'Bad query' }] } } }; };
    var result = await call('findEntities', ['Invoice', {}, {}]);
    assert.ok(result.err);
    assert.strictEqual(result.err.response.status, 400);
  });

  ['object', 'array'].forEach(function (format) {
    it('preserves options across every page with ' + format + ' criteria', async function () {
      var criteria = format === 'object' ? { fetchAll: true, limit: 1 }
        : [{ field: 'fetchAll', value: true }, { field: 'limit', value: 1 }];
      var original = JSON.parse(JSON.stringify(criteria));
      reply = function () {
        var page = requests.length;
        return { body: {
          QueryResponse: { Invoice: page < 3 ? [{ Id: String(page) }] : [], maxResults: page < 3 ? 1 : 0 },
          time: 'page-' + page
        } };
      };
      var result = await call('findEntities', ['Invoice', criteria, {
        qs: { minorversion: 80, requestid: 'query-id' }, headers: { 'X-Custom': 'query-header' }
      }]);
      assert.ifError(result.err);
      assert.deepStrictEqual(result.data.QueryResponse.Invoice, [{ Id: '1' }, { Id: '2' }]);
      assert.strictEqual(result.data.QueryResponse.maxResults, 2);
      assert.strictEqual(result.data.time, 'page-3');
      assert.deepStrictEqual(criteria, original);
      assert.strictEqual(requests.length, 3);
      requests.forEach(function (request, index) {
        assert.match(request.url.searchParams.get('query'), new RegExp('startposition ' + (index + 1) + ' maxresults 1'));
        assert.strictEqual(request.url.searchParams.get('minorversion'), '80');
        assert.strictEqual(request.url.searchParams.get('requestid'), 'query-id');
        assert.strictEqual(request.headers['x-custom'], 'query-header');
      });
    });
  });

  it('reports failures from later pages with their query options intact', async function () {
    reply = function () {
      return requests.length === 1
        ? { body: { QueryResponse: { Invoice: [{ Id: '1' }], maxResults: 1 } } }
        : { status: 400, body: { Fault: { Error: [{ Message: 'Later page failed' }] } } };
    };
    var result = await call('findEntities', ['Invoice', { fetchAll: true, limit: 1 }, {
      qs: { minorversion: 80 }, headers: { 'X-Custom': 'query-header' }
    }]);
    assert.ok(result.err);
    assert.strictEqual(result.err.response.status, 400);
    assert.strictEqual(requests.length, 2);
    assert.strictEqual(requests[1].url.searchParams.get('minorversion'), '80');
    assert.strictEqual(requests[1].headers['x-custom'], 'query-header');
  });

  it('preserves pagination without options for upstream find methods', async function () {
    reply = function () {
      return { body: { QueryResponse: {
        Invoice: requests.length === 1 ? [{ Id: '1' }] : [], maxResults: requests.length === 1 ? 1 : 0
      } } };
    };
    var result = await call('findInvoices', [{ fetchAll: true, limit: 1 }]);
    assert.ifError(result.err);
    assert.deepStrictEqual(result.data.QueryResponse.Invoice, [{ Id: '1' }]);
    assert.strictEqual(requests.length, 2);
    requests.forEach(function (request) {
      assert.strictEqual(request.url.searchParams.get('minorversion'), '75');
    });
  });

  it('preserves duplicate-document and request-ID options on entity writes', async function () {
    reply = function () { return { body: { Invoice: { Id: '1' } } }; };
    var result = await call('createInvoice', [{ DocNumber: '42', allowDuplicateDocNum: true, requestId: 'create-id' }]);
    assert.ifError(result.err);
    assert.strictEqual(result.data.Id, '1');
    assert.deepStrictEqual(JSON.parse(requests[0].body), { DocNumber: '42' });
    assert.strictEqual(requests[0].url.searchParams.get('include'), 'allowduplicatedocnum');
    assert.strictEqual(requests[0].url.searchParams.get('requestid'), 'create-id');
  });

  it('returns PDF downloads as binary Buffers', async function () {
    var pdf = Buffer.from([37, 80, 68, 70, 255, 0, 10]);
    reply = function () { return { type: 'application/pdf', body: pdf }; };
    var result = await call('getInvoicePdf', ['123']);
    assert.ifError(result.err);
    assert.ok(Buffer.isBuffer(result.data));
    assert.deepStrictEqual(result.data, pdf);
    assert.strictEqual(requests[0].headers.accept, 'application/pdf');
  });

  it('reports HTTP errors with the response and body', async function () {
    var fault = { Fault: { Error: [{ Message: 'Unauthorized' }] } };
    reply = function () { return { status: 401, body: fault }; };
    var result = await call('batch', [[]]);
    assert.ok(result.err);
    assert.deepStrictEqual(result.data, fault);
    assert.strictEqual(result.res.status, 401);
  });

  it('reports QBO faults even on HTTP success', async function () {
    var fault = { Fault: { Error: [{ Message: 'Rejected' }] } };
    reply = function () { return { body: fault }; };
    var result = await call('batch', [[]]);
    assert.deepStrictEqual(result.err, fault);
    assert.deepStrictEqual(result.data, fault);
  });

  it('retains OAuth 1 signing after the transport migration', async function () {
    qbo.oauthversion = '1.0a';
    qbo.tokenSecret = 'token-secret';
    reply = function () { return { body: { Invoice: { Id: '123' } } }; };
    var result = await call('getInvoice', ['123']);
    assert.ifError(result.err);
    assert.strictEqual(result.data.Id, '123');
    assert.match(requests[0].headers.authorization, /^OAuth /);
    assert.match(requests[0].headers.authorization, /oauth_signature=/);
    assert.match(requests[0].headers.authorization, /oauth_token="token"/);
  });

  it('refreshes OAuth 2 tokens using form-encoded credentials', async function () {
    QuickBooks.TOKEN_URL = endpoint + 'token';
    reply = function () { return { body: { access_token: 'new-token', refresh_token: 'new-refresh' } }; };
    var result = await call('refreshAccessToken', []);
    assert.ifError(result.err);
    assert.strictEqual(qbo.token, 'new-token');
    assert.strictEqual(qbo.refreshToken, 'new-refresh');
    var form = new URLSearchParams(requests[0].body.toString());
    assert.strictEqual(form.get('grant_type'), 'refresh_token');
    assert.strictEqual(form.get('refresh_token'), 'refresh');
    assert.strictEqual(requests[0].headers.authorization, 'Basic ' + Buffer.from('key:secret').toString('base64'));
  });

  it('keeps tokens when refreshing fails', async function () {
    QuickBooks.TOKEN_URL = endpoint + 'token';
    reply = function () { return { status: 400, body: { error: 'invalid_grant' } }; };
    var result = await call('refreshAccessToken', []);
    assert.ok(result.err);
    assert.strictEqual(qbo.token, 'token');
    assert.strictEqual(qbo.refreshToken, 'refresh');
  });

  it('revokes access and clears credentials on success', async function () {
    QuickBooks.REVOKE_URL = endpoint + 'revoke';
    var result = await call('revokeAccess', [true]);
    assert.ifError(result.err);
    assert.strictEqual(new URLSearchParams(requests[0].body.toString()).get('token'), 'refresh');
    assert.strictEqual(qbo.token, null);
    assert.strictEqual(qbo.refreshToken, null);
    assert.strictEqual(qbo.realmId, null);
  });
});
