import QuickBooks, { QuickBooksCallback, QueryResponse } from '../index';

declare const qbo: QuickBooks;
const callback: QuickBooksCallback<QueryResponse<any>> = () => {};

qbo.findEntities('Invoice', callback);
qbo.findEntities('Invoice', { DocNumber: '42' }, callback);
qbo.findEntities('Invoice', [{ field: 'Id', value: '1' }], callback);
qbo.findEntities('Invoice', undefined, callback);
qbo.findEntities('Invoice', { DocNumber: '42' }, {
  qs: { minorversion: 80, requestid: 'query-id' },
  headers: { 'X-Custom': 'query-header' }
}, callback);
qbo.findEntities('Invoice', [{ field: 'Id', value: '1' }], undefined, callback);
qbo.findEntities('Invoice', "where Id = '1'", undefined, callback);
qbo.findEntities('Invoice', undefined, undefined, callback);
qbo.sendInvoicePdf('1', 'billing@example.com', () => {}, 'retry-id');
qbo.sendEstimatePdf('1', 'billing@example.com', () => {}, 'retry-id');
qbo.sendInvoicePdf('1', () => {});
qbo.sendEstimatePdf('1', () => {});

// @ts-expect-error request IDs are strings
qbo.sendInvoicePdf('1', 'billing@example.com', () => {}, 123);
// @ts-expect-error request IDs are strings
qbo.sendEstimatePdf('1', 'billing@example.com', () => {}, 123);
// @ts-expect-error query headers must be strings
qbo.findEntities('Invoice', {}, { headers: { 'X-Custom': 42 } }, callback);
