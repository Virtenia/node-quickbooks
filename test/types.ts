import QuickBooks, { QuickBooksCallback, QueryResponse } from '../index';

declare const qbo: QuickBooks;
const callback: QuickBooksCallback<QueryResponse<any>> = () => {};

qbo.findEntities('Invoice', callback);
qbo.findEntities('Invoice', { DocNumber: '42' }, callback);
qbo.findEntities('Invoice', [{ field: 'Id', value: '1' }], callback);
qbo.findEntities('Invoice', undefined, callback);
qbo.findEntities(
  'Invoice',
  { DocNumber: '42' },
  {
    qs: { minorversion: 80, requestid: 'query-id' },
    headers: { 'X-Custom': 'query-header' },
  },
  callback
);
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

// The constructor is a CommonJS export; type-only named imports are namespace members.
import QuickBooksRequire = require('../index');
import type {
  Invoice,
  Ref,
  QuickBooksInvoice,
  QuickBooksAccount,
  ChangeDataCaptureQueryResponse,
} from '../index';
import { Readable } from 'node:stream';

type Assert<T extends true> = T;
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type IsAny<T> = 0 extends 1 & T ? true : false;
type ReadInvoice = NonNullable<Parameters<Parameters<QuickBooks['getInvoice']>[1]>[1]>;
type QueryInvoice = NonNullable<
  NonNullable<Parameters<Parameters<QuickBooks['findInvoices']>[1]>[1]>['QueryResponse']['Invoice']
>[number];
export type DeclarationChecks = [
  Assert<Equal<QuickBooksRequire, QuickBooks>>,
  Assert<Equal<Invoice, QuickBooksInvoice>>,
  Assert<Equal<ReadInvoice, QuickBooks.QuickBooksInvoice>>,
  Assert<Equal<QueryInvoice, ReadInvoice>>,
  Assert<Equal<IsAny<ReadInvoice>, false>>,
  Assert<Equal<IsAny<ReadInvoice['TxnTaxDetail']>, false>>,
  Assert<
    Equal<
      Extract<keyof NonNullable<ReadInvoice['TxnTaxDetail']>, 'taxRates' | 'allTaxCodes'>,
      never
    >
  >,
];

new QuickBooksRequire('key', 'secret', 'token', false, 'realm', true, false, 75, '2.0', 'refresh');
new QuickBooks({
  consumerKey: 'key',
  consumerSecret: 'secret',
  token: 'token',
  realmId: 'realm',
  oauthversion: '2.0',
  minorversion: 75,
});
QuickBooks.setOauthVersion(2);
new QuickBooks('key', 'secret', 'token', 'token-secret', 'realm', true);
// @ts-expect-error OAuth 1 requires a token secret
new QuickBooks('key', 'secret', 'token', false, 'realm', true);
// @ts-expect-error a config without tokenSecret must explicitly select OAuth 2
new QuickBooks({ consumerKey: 'key', consumerSecret: 'secret', token: 'token', realmId: 'realm' });

const ref: Ref = { value: '1' };
qbo.getInvoice('1', (err, invoice, response) => {
  if (err || !invoice) return;
  const id: string = invoice.Id;
  const tax: number | undefined = invoice.TxnTaxDetail?.TotalTax;
  const status: number | undefined = response?.status;
  // @ts-expect-error ordinary CRUD results are unwrapped
  invoice.Invoice;
  // @ts-expect-error unknown properties do not silently become any
  invoice.CustmerRef;
  // @ts-expect-error the API Id is readonly
  invoice.Id = '2';
  void [id, tax, status];
});
qbo.findEntities(
  'invoice',
  {},
  { qs: { include: 'invoiceLink', minorversion: 80 } },
  (err, result) => {
    if (err || !result) return;
    const invoices: Invoice[] | undefined = result.QueryResponse.Invoice;
    const count: number | undefined = result.QueryResponse.totalCount;
    // @ts-expect-error entity names do not become arbitrary response keys
    result.QueryResponse.Customer;
    void [invoices, count];
  }
);
qbo.findEntities('FutureEntity', (err, result) => {
  if (err || !result) return;
  const id: string | undefined = result.QueryResponse.FutureEntity?.[0]?.Id;
  // @ts-expect-error unknown entity fields must be modeled explicitly
  result.QueryResponse.FutureEntity?.[0]?.Unmodeled;
  void id;
});
declare const table: string;
qbo.findEntities(table, (err, result) => {
  if (err || !result) return;
  const value = result.QueryResponse[table];
  // @ts-expect-error dynamic response keys can also refer to numeric metadata
  value?.map((entity) => entity.Id);
  if (Array.isArray(value)) value.map((entity) => entity.Id);
});
declare const knownOrFutureTable: 'Invoice' | 'FutureEntity';
qbo.findEntities(knownOrFutureTable, (err, result) => {
  if (err || !result) return;
  const invoice: QuickBooks.QuickBooksInvoice | undefined = result.QueryResponse.Invoice?.[0];
  const future: QuickBooks.QuickBooksRestEntity | undefined =
    result.QueryResponse.FutureEntity?.[0];
  void [invoice, future];
});
qbo.findInvoices([{ count: true }], () => {});
qbo.findInvoices([{ fetchAll: true, limit: 1 }], () => {});
qbo.findInvoices([{ DocNumber: '42' }], () => {});
qbo.findEntities('Invoice', [{ DocNumber: '42' }, { field: 'fetchAll', value: true }], callback);
// @ts-expect-error explicit criteria must use a supported operator
qbo.findInvoices([{ field: 'Id', value: '1', operator: 'unsupported' }], () => {});
// @ts-expect-error shorthand criteria values cannot be functions
qbo.findInvoices([{ DocNumber: () => '42' }], () => {});
qbo.findInvoices("where DocNumber = '42'", () => {});
qbo.createInvoice(
  {
    CustomerRef: ref,
    Line: [
      {
        DetailType: 'SalesItemLineDetail',
        SalesItemLineDetail: { ItemRef: ref, Qty: 1 },
        Amount: 12,
      },
    ],
  },
  () => {}
);
qbo.updateInvoice({ Id: '1', SyncToken: '0', PrivateNote: 'Sparse update' }, () => {});
qbo.updateInvoice({ Id: '1', SyncToken: '0', DepartmentRef: null, ClassRef: null }, () => {});
qbo.updateItem({ Id: '1', SyncToken: '0', doNotUpdateAccountOnTxns: true }, () => {});
// @ts-expect-error a required customer reference cannot be cleared
qbo.updateInvoice({ Id: '1', SyncToken: '0', CustomerRef: null }, () => {});
// @ts-expect-error updates require SyncToken
qbo.updateInvoice({ Id: '1', PrivateNote: 'Missing version' }, () => {});
// @ts-expect-error updates require Id
qbo.updateInvoice({ SyncToken: '0' }, () => {});
// @ts-expect-error create requests need customer and line data, not a response envelope
qbo.createInvoice({ Invoice: { Id: '1' } }, () => {});
// @ts-expect-error create requests require the customer reference
qbo.createInvoice({ Line: [] }, () => {});
// @ts-expect-error the library has no public query method
qbo.query('select * from Invoice', () => {});

qbo.upload('invoice.pdf', 'application/pdf', Buffer.from('pdf'), (err, attachment) => {
  if (err || !attachment) return;
  qbo.getAttachable(attachment.Id, () => {});
  qbo.deleteAttachable(attachment.Id, () => {});
  if (attachment.SyncToken === undefined) return;
  // @ts-expect-error XML upload version tokens may be numbers
  attachment.SyncToken.toUpperCase();
  const version = { Id: attachment.Id, SyncToken: attachment.SyncToken };
  qbo.updateAttachable({ ...version, Note: 'Updated note' }, () => {});
  qbo.deleteAttachable(version, () => {});
  if (typeof attachment.SyncToken === 'string') attachment.SyncToken.toUpperCase();
});
qbo.getAttachable(42, () => {});
qbo.deleteAttachable(42, () => {});
qbo.updateAttachable({ Id: 42, SyncToken: 0, Note: 'XML version' }, () => {});
qbo.deleteAttachable({ Id: 42, SyncToken: 0 }, () => {});
// @ts-expect-error attachment updates still require SyncToken
qbo.updateAttachable({ Id: 42, Note: 'Missing version' }, () => {});
// @ts-expect-error attachment version tokens cannot be booleans
qbo.updateAttachable({ Id: 42, SyncToken: false }, () => {});
// @ts-expect-error ordinary REST entity version tokens are strings
qbo.updateInvoice({ Id: '1', SyncToken: 0 }, () => {});
qbo.createAttachable({ Note: 'My file' }, () => {});
qbo.createCustomer({ DisplayName: 'Example', Title: 'Dr.', Notes: 'New customer' }, () => {});
qbo.createAccount(
  { Name: 'Receivables', AccountType: 'Accounts Receivable', AcctNum: '100' },
  () => {}
);
qbo.upload('invoice.pdf', 'application/pdf', Readable.from(['pdf']), 'Invoice', 1, () => {});
// @ts-expect-error uploads require a Buffer or readable stream
qbo.upload('invoice.pdf', 'application/pdf', 'pdf', () => {});
qbo.getInvoicePdf('1', (err, pdf) => {
  if (!err && pdf) pdf.readUInt8(0);
});
qbo.voidInvoice('1', (err, response) => {
  if (!err && response) response.Invoice.Id;
});
qbo.voidPayment({ Id: '1', SyncToken: '0' }, (err, payment) => {
  if (!err && payment) payment.Id;
});
qbo.batch(
  [
    { bId: 'count', query: 'select count(*) from Invoice' },
    { bId: 'write', operation: 'create', Invoice: { CustomerRef: ref, Line: [] } },
  ],
  () => {}
);
// @ts-expect-error invalid batch operations
qbo.batch([{ bId: '1', operation: 'unsupported' }], () => {});

const changes: ChangeDataCaptureQueryResponse = { Invoice: [{ Id: '1', status: 'Deleted' }] };
for (const invoice of changes.Invoice || []) {
  if ('status' in invoice) {
    const deleted: 'Deleted' = invoice.status;
    void deleted;
  } else {
    const lines: QuickBooks.QuickBooksBaseTxnLine[] = invoice.Line;
    void lines;
  }
}
const accountBalance: QuickBooksAccount['CurrentBalanceWithSubAccounts'] = 123.45;
const accountType: QuickBooksAccount['AccountType'] = 'Accounts Payable';
const markup: QuickBooks.QuickBooksItemBasedExpenseLine = {
  DetailType: 'ItemBasedExpenseLineDetail',
  Amount: 12,
  ItemBasedExpenseLineDetail: { MarkupInfo: { Percent: 15 } },
};
const subtotal: QuickBooks.QuickBooksBaseTxnLine = {
  DetailType: 'SubTotalLineDetail',
  Amount: 12,
};
const group: QuickBooks.QuickBooksBaseTxnLine = {
  DetailType: 'GroupLineDetail',
  GroupLineDetail: { GroupItemRef: ref, Line: [subtotal] },
};
const report: QuickBooks.Report = {
  Rows: { Row: [{ type: 'Section', Rows: { Row: [{ ColData: [{ value: '12.00' }] }] } }] },
};
const fault: QuickBooks.QBOFaultEnvelope = {
  Fault: { type: 'AuthorizationFault', Error: [{ code: 120, Message: 'Access denied' }] },
};
qbo.getCustomer('1', (err, customer) => {
  if (err || !customer) return;
  customer.PrimaryEmailAddr?.Address;
  // @ts-expect-error Customer uses PrimaryEmailAddr, not Email
  customer.Email;
});
qbo.getPreferences((err, preferences) => {
  if (err || !preferences) return;
  preferences.TaxPrefs.UsingSalesTax;
  // @ts-expect-error preferences are also unwrapped
  preferences.Preferences;
});
void [subtotal, group, report, fault];
void [accountBalance, accountType, markup];
