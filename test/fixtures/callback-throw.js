// Isolate the expected uncaught application exception from Mocha itself.
var assert = require('assert');
var QuickBooks = require('../../index');
var endpoint = process.argv[2], method = process.argv[3], fails = process.argv[4] === 'true';
var qbo = new QuickBooks('key', 'secret', 'token', false, 'realm', true, false, 75, '2.0', 'refresh');
qbo.endpoint = endpoint;
QuickBooks.TOKEN_URL = QuickBooks.REVOKE_URL = QuickBooks.RECONNECT_URL = QuickBooks.DISCONNECT_URL = endpoint;
var calls = 0, marker = new Error('Application callback exception');
process.on('unhandledRejection', function (err) { console.error(err); process.exit(1); });
process.on('uncaughtException', function (err) {
  if (err !== marker || calls !== 1) {
    console.error('Expected the original exception after exactly one callback:', calls, err);
    process.exit(1);
  }
  process.exit(0);
});
setTimeout(function () { console.error('Callback exception was swallowed'); process.exit(1); }, 5000);
var args = method === 'findEntities' ? ['Invoice', {}]
  : /^find/.test(method) ? [{}]
  : method === 'batch' ? [[]]
  : method === 'createInvoice' ? [{ DocNumber: '42' }]
  : method === 'revokeAccess' ? [true] : [];
qbo[method].apply(qbo, args.concat(function (err) {
  calls++;
  assert.strictEqual(Boolean(err), fails);
  throw marker;
}));
