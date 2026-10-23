/// <reference types="node" />

import type { Buffer } from 'node:buffer';
import type { Readable } from 'node:stream';
import type { AxiosResponse } from 'axios';

/** The CommonJS constructor exported by require('node-quickbooks'). */
declare class QuickBooks {
  consumerKey: string;
  consumerSecret: string;
  token: string | null;
  tokenSecret: string | false | null | undefined;
  realmId: string | null;
  useSandbox: boolean | undefined;
  debug: boolean | undefined;
  minorversion: number | string;
  oauthversion: string;
  refreshToken: string | null;
  endpoint: string;

  constructor(config: QuickBooks.Config);
  constructor(
    consumerKey: string,
    consumerSecret: string,
    token: string,
    tokenSecret: string,
    realmId: string,
    useSandbox: boolean,
    debug?: boolean,
    minorversion?: number | string | null,
    oauthversion?: QuickBooks.OAuthVersion,
    refreshToken?: string | null
  );
  constructor(
    consumerKey: string,
    consumerSecret: string,
    token: string,
    tokenSecret: string | false | null | undefined,
    realmId: string,
    useSandbox: boolean,
    debug: boolean | undefined,
    minorversion: number | string | null | undefined,
    oauthversion: '2.0',
    refreshToken?: string | null
  );

  static APP_CENTER_BASE: string;
  static V3_ENDPOINT_BASE_URL: string;
  static QUERY_OPERATORS: string[];
  static TOKEN_URL: string;
  static REVOKE_URL: string;
  static REQUEST_TOKEN_URL: string;
  static ACCESS_TOKEN_URL: string;
  static APP_CENTER_URL: string;
  static RECONNECT_URL: string;
  static DISCONNECT_URL: string;
  static AUTHORIZATION_URL: string | undefined;
  static USER_INFO_URL: string | undefined;
  static version: string;
  static setOauthVersion(version: QuickBooks.OAuthVersion | 1 | 2, useSandbox?: boolean): void;

  refreshAccessToken(callback?: QuickBooks.RefreshTokenCallback): void;
  revokeAccess(useRefresh: boolean, callback?: QuickBooks.OAuthResponseCallback): void;
  getUserInfo(callback: QuickBooks.QuickBooksCallback<Record<string, unknown>>): void;
  reconnect(callback: QuickBooks.QuickBooksCallback<QuickBooks.ConnectionResponse>): void;
  disconnect(callback: QuickBooks.QuickBooksCallback<QuickBooks.ConnectionResponse>): void;
  batch(
    items: QuickBooks.BatchItemRequest[],
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QuickBooksBatchResponse>
  ): void;
  changeDataCapture(
    entities: string[] | string,
    since: Date | string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.ChangeDataCaptureResponse>
  ): void;

  upload(
    filename: string,
    contentType: string,
    stream: Buffer | Readable,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Attachable>
  ): void;
  upload(
    filename: string,
    contentType: string,
    stream: Buffer | Readable,
    entityType: string,
    entityId: string | number,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Attachable>
  ): void;

  findEntities<K extends string>(
    entityType: K,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<K>>
  ): void;
  findEntities<K extends string>(
    entityType: K,
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<K>>
  ): void;
  findEntities<K extends string>(
    entityType: K,
    criteria: QuickBooks.QueryCriteria | undefined,
    options: QuickBooks.QueryOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<K>>
  ): void;

  createAccount(
    entity: QuickBooks.CreateAccountInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Account>
  ): void;
  getAccount(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Account>): void;
  updateAccount(
    entity: QuickBooks.UpdateInput<QuickBooks.Account>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Account>
  ): void;
  findAccounts(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Account'>>
  ): void;
  findAccounts(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Account'>>
  ): void;
  createAttachable(
    entity: QuickBooks.CreateAttachableInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Attachable>
  ): void;
  getAttachable(
    id: string | number,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Attachable>
  ): void;
  updateAttachable(
    entity: QuickBooks.UpdateInput<QuickBooks.Attachable, string | number>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Attachable>
  ): void;
  deleteAttachable(
    idOrEntity: string | number | QuickBooks.EntityVersion<string | number>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'Attachable'>>
  ): void;
  findAttachables(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Attachable'>>
  ): void;
  findAttachables(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Attachable'>>
  ): void;
  createBill(
    entity: QuickBooks.CreateBillInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Bill>
  ): void;
  getBill(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Bill>): void;
  updateBill(
    entity: QuickBooks.UpdateInput<QuickBooks.Bill>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Bill>
  ): void;
  deleteBill(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'Bill'>>
  ): void;
  findBills(callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Bill'>>): void;
  findBills(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Bill'>>
  ): void;
  createBillPayment(
    entity: QuickBooks.CreateBillPaymentInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.BillPayment>
  ): void;
  getBillPayment(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.BillPayment>): void;
  updateBillPayment(
    entity: QuickBooks.UpdateInput<QuickBooks.BillPayment>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.BillPayment>
  ): void;
  deleteBillPayment(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'BillPayment'>>
  ): void;
  findBillPayments(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'BillPayment'>>
  ): void;
  findBillPayments(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'BillPayment'>>
  ): void;
  findBudgets(callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Budget'>>): void;
  findBudgets(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Budget'>>
  ): void;
  createClass(
    entity: QuickBooks.CreateClassInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Class>
  ): void;
  getClass(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Class>): void;
  updateClass(
    entity: QuickBooks.UpdateInput<QuickBooks.Class>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Class>
  ): void;
  findClasses(callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Class'>>): void;
  findClasses(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Class'>>
  ): void;
  getCompanyInfo(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.CompanyInfo>): void;
  updateCompanyInfo(
    entity: QuickBooks.UpdateInput<QuickBooks.CompanyInfo>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.CompanyInfo>
  ): void;
  findCompanyInfos(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'CompanyInfo'>>
  ): void;
  findCompanyInfos(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'CompanyInfo'>>
  ): void;
  getCompanyCurrency(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.CompanyCurrency>
  ): void;
  findCompanyCurrencies(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'CompanyCurrency'>>
  ): void;
  findCompanyCurrencies(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'CompanyCurrency'>>
  ): void;
  createCreditMemo(
    entity: QuickBooks.CreateCreditMemoInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.CreditMemo>
  ): void;
  getCreditMemo(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.CreditMemo>): void;
  updateCreditMemo(
    entity: QuickBooks.UpdateInput<QuickBooks.CreditMemo>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.CreditMemo>
  ): void;
  deleteCreditMemo(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'CreditMemo'>>
  ): void;
  getCreditMemoPdf(id: string, callback: QuickBooks.QuickBooksCallback<Buffer>): void;
  sendCreditMemoPdf(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.CreditMemo>
  ): void;
  sendCreditMemoPdf(
    id: string,
    sendTo: string | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.CreditMemo>
  ): void;
  findCreditMemos(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'CreditMemo'>>
  ): void;
  findCreditMemos(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'CreditMemo'>>
  ): void;
  createCustomer(
    entity: QuickBooks.CreateCustomerInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Customer>
  ): void;
  getCustomer(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Customer>): void;
  updateCustomer(
    entity: QuickBooks.UpdateInput<QuickBooks.Customer>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Customer>
  ): void;
  findCustomers(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Customer'>>
  ): void;
  findCustomers(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Customer'>>
  ): void;
  getCustomerType(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.CustomerType>
  ): void;
  findCustomerTypes(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'CustomerType'>>
  ): void;
  findCustomerTypes(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'CustomerType'>>
  ): void;
  createDepartment(
    entity: QuickBooks.CreateDepartmentInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Department>
  ): void;
  getDepartment(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Department>): void;
  updateDepartment(
    entity: QuickBooks.UpdateInput<QuickBooks.Department>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Department>
  ): void;
  findDepartments(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Department'>>
  ): void;
  findDepartments(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Department'>>
  ): void;
  createDeposit(
    entity: QuickBooks.CreateDepositInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Deposit>
  ): void;
  getDeposit(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Deposit>): void;
  updateDeposit(
    entity: QuickBooks.UpdateInput<QuickBooks.Deposit>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Deposit>
  ): void;
  deleteDeposit(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'Deposit'>>
  ): void;
  findDeposits(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Deposit'>>
  ): void;
  findDeposits(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Deposit'>>
  ): void;
  createEmployee(
    entity: QuickBooks.CreateEmployeeInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Employee>
  ): void;
  getEmployee(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Employee>): void;
  updateEmployee(
    entity: QuickBooks.UpdateInput<QuickBooks.Employee>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Employee>
  ): void;
  findEmployees(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Employee'>>
  ): void;
  findEmployees(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Employee'>>
  ): void;
  createEstimate(
    entity: QuickBooks.CreateEstimateInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Estimate>
  ): void;
  getEstimate(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Estimate>): void;
  updateEstimate(
    entity: QuickBooks.UpdateInput<QuickBooks.Estimate>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Estimate>
  ): void;
  deleteEstimate(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'Estimate'>>
  ): void;
  getEstimatePdf(id: string, callback: QuickBooks.QuickBooksCallback<Buffer>): void;
  sendEstimatePdf(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Estimate>): void;
  sendEstimatePdf(
    id: string,
    sendTo: string | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Estimate>,
    requestId?: string
  ): void;
  findEstimates(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Estimate'>>
  ): void;
  findEstimates(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Estimate'>>
  ): void;
  getExchangeRate(
    options: { sourcecurrencycode: string; asofdate?: string },
    callback: QuickBooks.QuickBooksCallback<QuickBooks.ExchangeRate>
  ): void;
  updateExchangeRate(
    exchangeRate: QuickBooks.ExchangeRateInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.ExchangeRate>
  ): void;
  findExchangeRates(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'ExchangeRate'>>
  ): void;
  findExchangeRates(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'ExchangeRate'>>
  ): void;
  createInvoice(
    entity: QuickBooks.CreateInvoiceInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Invoice>
  ): void;
  getInvoice(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Invoice>): void;
  updateInvoice(
    entity: QuickBooks.UpdateInput<QuickBooks.Invoice>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Invoice>
  ): void;
  deleteInvoice(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'Invoice'>>
  ): void;
  voidInvoice(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.EntityResponseFor<'Invoice'>>
  ): void;
  getInvoicePdf(id: string, callback: QuickBooks.QuickBooksCallback<Buffer>): void;
  sendInvoicePdf(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Invoice>): void;
  sendInvoicePdf(
    id: string,
    sendTo: string | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Invoice>,
    requestId?: string
  ): void;
  findInvoices(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Invoice'>>
  ): void;
  findInvoices(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Invoice'>>
  ): void;
  createItem(
    entity: QuickBooks.CreateItemInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Item>
  ): void;
  getItem(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Item>): void;
  updateItem(
    entity: QuickBooks.UpdateItemInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Item>
  ): void;
  findItems(callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Item'>>): void;
  findItems(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Item'>>
  ): void;
  createJournalCode(
    entity: QuickBooks.CreateJournalCodeInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.JournalCode>
  ): void;
  getJournalCode(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.JournalCode>): void;
  updateJournalCode(
    entity: QuickBooks.UpdateInput<QuickBooks.JournalCode>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.JournalCode>
  ): void;
  deleteJournalCode(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'JournalCode'>>
  ): void;
  findJournalCodes(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'JournalCode'>>
  ): void;
  findJournalCodes(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'JournalCode'>>
  ): void;
  createJournalEntry(
    entity: QuickBooks.CreateJournalEntryInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.JournalEntry>
  ): void;
  getJournalEntry(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.JournalEntry>
  ): void;
  updateJournalEntry(
    entity: QuickBooks.UpdateInput<QuickBooks.JournalEntry>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.JournalEntry>
  ): void;
  deleteJournalEntry(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'JournalEntry'>>
  ): void;
  findJournalEntries(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'JournalEntry'>>
  ): void;
  findJournalEntries(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'JournalEntry'>>
  ): void;
  createPayment(
    entity: QuickBooks.CreatePaymentInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Payment>
  ): void;
  getPayment(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Payment>): void;
  updatePayment(
    entity: QuickBooks.UpdateInput<QuickBooks.Payment>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Payment>
  ): void;
  deletePayment(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'Payment'>>
  ): void;
  voidPayment(
    payment: QuickBooks.UpdateInput<QuickBooks.Payment>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Payment>
  ): void;
  findPayments(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Payment'>>
  ): void;
  findPayments(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Payment'>>
  ): void;
  createPaymentMethod(
    entity: QuickBooks.CreatePaymentMethodInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.PaymentMethod>
  ): void;
  getPaymentMethod(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.PaymentMethod>
  ): void;
  updatePaymentMethod(
    entity: QuickBooks.UpdateInput<QuickBooks.PaymentMethod>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.PaymentMethod>
  ): void;
  findPaymentMethods(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'PaymentMethod'>>
  ): void;
  findPaymentMethods(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'PaymentMethod'>>
  ): void;
  getPreferences(callback: QuickBooks.QuickBooksCallback<QuickBooks.Preferences>): void;
  updatePreferences(
    entity: QuickBooks.UpdateInput<QuickBooks.Preferences>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Preferences>
  ): void;
  findPreferenceses(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Preferences'>>
  ): void;
  findPreferenceses(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Preferences'>>
  ): void;
  createPurchase(
    entity: QuickBooks.CreatePurchaseInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Purchase>
  ): void;
  getPurchase(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Purchase>): void;
  updatePurchase(
    entity: QuickBooks.UpdateInput<QuickBooks.Purchase>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Purchase>
  ): void;
  deletePurchase(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'Purchase'>>
  ): void;
  findPurchases(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Purchase'>>
  ): void;
  findPurchases(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Purchase'>>
  ): void;
  createPurchaseOrder(
    entity: QuickBooks.CreatePurchaseOrderInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.PurchaseOrder>
  ): void;
  getPurchaseOrder(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.PurchaseOrder>
  ): void;
  updatePurchaseOrder(
    entity: QuickBooks.UpdateInput<QuickBooks.PurchaseOrder>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.PurchaseOrder>
  ): void;
  deletePurchaseOrder(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'PurchaseOrder'>>
  ): void;
  sendPurchaseOrder(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.PurchaseOrder>
  ): void;
  sendPurchaseOrder(
    id: string,
    sendTo: string | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.PurchaseOrder>
  ): void;
  findPurchaseOrders(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'PurchaseOrder'>>
  ): void;
  findPurchaseOrders(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'PurchaseOrder'>>
  ): void;
  createRefundReceipt(
    entity: QuickBooks.CreateRefundReceiptInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.RefundReceipt>
  ): void;
  getRefundReceipt(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.RefundReceipt>
  ): void;
  updateRefundReceipt(
    entity: QuickBooks.UpdateInput<QuickBooks.RefundReceipt>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.RefundReceipt>
  ): void;
  deleteRefundReceipt(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'RefundReceipt'>>
  ): void;
  findRefundReceipts(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'RefundReceipt'>>
  ): void;
  findRefundReceipts(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'RefundReceipt'>>
  ): void;
  createSalesReceipt(
    entity: QuickBooks.CreateSalesReceiptInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.SalesReceipt>
  ): void;
  getSalesReceipt(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.SalesReceipt>
  ): void;
  updateSalesReceipt(
    entity: QuickBooks.UpdateInput<QuickBooks.SalesReceipt>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.SalesReceipt>
  ): void;
  deleteSalesReceipt(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'SalesReceipt'>>
  ): void;
  getSalesReceiptPdf(id: string, callback: QuickBooks.QuickBooksCallback<Buffer>): void;
  sendSalesReceiptPdf(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.SalesReceipt>
  ): void;
  sendSalesReceiptPdf(
    id: string,
    sendTo: string | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.SalesReceipt>
  ): void;
  findSalesReceipts(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'SalesReceipt'>>
  ): void;
  findSalesReceipts(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'SalesReceipt'>>
  ): void;
  createTaxAgency(
    entity: QuickBooks.CreateTaxAgencyInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.TaxAgency>
  ): void;
  getTaxAgency(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.TaxAgency>): void;
  updateTaxAgency(
    entity: QuickBooks.UpdateInput<QuickBooks.TaxAgency>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.TaxAgency>
  ): void;
  findTaxAgencies(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'TaxAgency'>>
  ): void;
  findTaxAgencies(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'TaxAgency'>>
  ): void;
  getTaxCode(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.TaxCode>): void;
  updateTaxCode(
    entity: QuickBooks.UpdateInput<QuickBooks.TaxCode>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.TaxCode>
  ): void;
  findTaxCodes(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'TaxCode'>>
  ): void;
  findTaxCodes(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'TaxCode'>>
  ): void;
  getTaxRate(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.TaxRate>): void;
  updateTaxRate(
    entity: QuickBooks.UpdateInput<QuickBooks.TaxRate>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.TaxRate>
  ): void;
  findTaxRates(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'TaxRate'>>
  ): void;
  findTaxRates(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'TaxRate'>>
  ): void;
  createTaxService(
    taxService: Record<string, unknown>,
    callback: QuickBooks.QuickBooksCallback<Record<string, unknown>>
  ): void;
  createTerm(
    entity: QuickBooks.CreateTermInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Term>
  ): void;
  getTerm(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Term>): void;
  updateTerm(
    entity: QuickBooks.UpdateInput<QuickBooks.Term>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Term>
  ): void;
  findTerms(callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Term'>>): void;
  findTerms(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Term'>>
  ): void;
  createTimeActivity(
    entity: QuickBooks.CreateTimeActivityInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.TimeActivity>
  ): void;
  getTimeActivity(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.TimeActivity>
  ): void;
  updateTimeActivity(
    entity: QuickBooks.UpdateInput<QuickBooks.TimeActivity>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.TimeActivity>
  ): void;
  deleteTimeActivity(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'TimeActivity'>>
  ): void;
  findTimeActivities(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'TimeActivity'>>
  ): void;
  findTimeActivities(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'TimeActivity'>>
  ): void;
  createTransfer(
    entity: QuickBooks.CreateTransferInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Transfer>
  ): void;
  getTransfer(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Transfer>): void;
  updateTransfer(
    entity: QuickBooks.UpdateInput<QuickBooks.Transfer>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Transfer>
  ): void;
  deleteTransfer(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'Transfer'>>
  ): void;
  findTransfers(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Transfer'>>
  ): void;
  findTransfers(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Transfer'>>
  ): void;
  createVendor(
    entity: QuickBooks.CreateVendorInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Vendor>
  ): void;
  getVendor(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Vendor>): void;
  updateVendor(
    entity: QuickBooks.UpdateInput<QuickBooks.Vendor>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Vendor>
  ): void;
  findVendors(callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Vendor'>>): void;
  findVendors(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'Vendor'>>
  ): void;
  createVendorCredit(
    entity: QuickBooks.CreateVendorCreditInput,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.VendorCredit>
  ): void;
  getVendorCredit(
    id: string,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.VendorCredit>
  ): void;
  updateVendorCredit(
    entity: QuickBooks.UpdateInput<QuickBooks.VendorCredit>,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.VendorCredit>
  ): void;
  deleteVendorCredit(
    idOrEntity: string | QuickBooks.EntityVersion,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.DeleteResponse<'VendorCredit'>>
  ): void;
  findVendorCredits(
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'VendorCredit'>>
  ): void;
  findVendorCredits(
    criteria: QuickBooks.QueryCriteria | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.QueryResponseFor<'VendorCredit'>>
  ): void;
  getReports(id: string, callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportBalanceSheet(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportBalanceSheet(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportProfitAndLoss(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportProfitAndLoss(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportProfitAndLossDetail(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportProfitAndLossDetail(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportTrialBalance(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportTrialBalance(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportTrialBalanceFR(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportTrialBalanceFR(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportCashFlow(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportCashFlow(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportInventoryValuationSummary(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportInventoryValuationSummary(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportCustomerSales(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportCustomerSales(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportItemSales(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportItemSales(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportCustomerIncome(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportCustomerIncome(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportCustomerBalance(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportCustomerBalance(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportCustomerBalanceDetail(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportCustomerBalanceDetail(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportAgedReceivables(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportAgedReceivables(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportAgedReceivableDetail(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportAgedReceivableDetail(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportVendorBalance(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportVendorBalance(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportVendorBalanceDetail(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportVendorBalanceDetail(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportAgedPayables(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportAgedPayables(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportAgedPayableDetail(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportAgedPayableDetail(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportVendorExpenses(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportVendorExpenses(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportTransactionList(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportTransactionList(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportTransactionListWithSplits(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportTransactionListWithSplits(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportTransactionListByCustomer(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportTransactionListByCustomer(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportTransactionListByVendor(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportTransactionListByVendor(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportGeneralLedgerDetail(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportGeneralLedgerDetail(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportTaxSummary(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportTaxSummary(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportDepartmentSales(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportDepartmentSales(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportClassSales(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportClassSales(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportAccountListDetail(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportAccountListDetail(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  reportJournalReport(callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>): void;
  reportJournalReport(
    options: QuickBooks.ReportOptions | undefined,
    callback: QuickBooks.QuickBooksCallback<QuickBooks.Report>
  ): void;
  capitalize(s: string): string;
  pluralize(s: string): string;
}

declare namespace QuickBooks {
  export type Country2 = string;

  export type EstimateStatusOption = 'Accepted' | 'Closed' | 'Pending' | 'Rejected' | 'Converted';

  export type QuickBooksItemType = 'Inventory' | 'NonInventory' | 'Service' | 'Category' | 'Group';

  export type QuickBooksItemCategoryType = 'Product' | 'Service';

  export type QuickBooksAccountType =
    | 'Bank'
    | 'Accounts Receivable'
    | 'Other Current Asset'
    | 'Fixed Asset'
    | 'Other Asset'
    | 'Accounts Payable'
    | 'Credit Card'
    | 'Other Current Liability'
    | 'Long Term Liability'
    | 'Equity'
    | 'Income'
    | 'Cost of Goods Sold'
    | 'Expense'
    | 'Other Income'
    | 'Other Expense';

  export type QuickBooksAccountSubType = string;

  export type NameValuePair = {
    name?: string;
    value: string;
    type?: string;
  };

  export type ValueHolder = {
    value: string;
  };

  export interface QuickBooksRestEntity {
    readonly Id: string;
    SyncToken?: string;
    MetaData?: MetaData;
    domain?: string;
    sparse?: boolean;
  }

  export interface QuickBooksAttachable {
    Id: string | number;
    /** The default XML parser converts numeric upload values to numbers. */
    SyncToken?: string | number;
    AttachableRef?: Array<{
      EntityRef?: {
        type?: string;
        value?: string;
      };
    }>;
    FileName?: string;
    Size?: number;
    TempDownloadUri?: string;
    FileAccessUri?: string;
    ContentType?: string;
    Note?: string;
  }

  export interface QuickBooksAddress {
    Id?: string;
    City?: string;
    Line1?: string;
    Line2?: string;
    Line3?: string;
    Line4?: string;
    Line5?: string;
    PostalCode?: string;
    CountrySubDivisionCode?: string; //state
    Country?: string;
  }

  export interface QuickBooksAccount extends QuickBooksRestEntity {
    Name: string;
    AcctNum?: string;
    Description?: string;
    SubAccount?: boolean;
    ParentRef?: Ref;
    FullyQualifiedName?: string;
    Active?: boolean;
    Classification?: 'Asset' | 'Equity' | 'Expense' | 'Liability' | 'Revenue';
    AccountType: QuickBooksAccountType;
    AccountSubType?: QuickBooksAccountSubType;
    CurrentBalance?: number;
    CurrentBalanceWithSubAccounts?: number;
    CurrencyRef?: Ref;
    OnlineBankingEnabled?: boolean;
    FIName?: string;
    OpeningBalance?: number;
    OpeningBalanceDate?: string;
    SyncToken: string;
    MetaData?: MetaData;
  }

  export interface QuickBooksCustomer extends QuickBooksRestEntity {
    DisplayName: string;
    FullyQualifiedName: string;
    Active?: boolean;
    PrimaryEmailAddr?: {
      Address?: string;
    };
    PrimaryPhone?: {
      FreeFormNumber?: string;
    };
    CurrencyRef?: NameValuePair;
    BillAddr?: QuickBooksAddress;
    ShipAddr?: QuickBooksAddress;
    DefaultTaxCodeRef?: NameValuePair;
    Taxable?: boolean;
    Balance?: number;
    Job?: boolean;
    IsProject?: boolean;
    ParentRef?: NameValuePair | ValueHolder; // This is defined as a NameValuePair in the docs, but in practice the name is not always available.
    readonly BalanceWithJobs?: number;
    readonly SyncToken: string;
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
    GivenName?: string;
    Title?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
    CompanyName?: string;
    Notes?: string;
    PrintOnCheckName?: string;
    ResaleNum?: string;
    PrimaryTaxIdentifier?: string;
    SecondaryTaxIdentifier?: string;
    PreferredDeliveryMethod?: string;
    TaxExemptionReasonId?: number;
    AlternatePhone?: { FreeFormNumber?: string };
    OpenBalanceDate?: string;
    Mobile?: {
      FreeFormNumber?: string;
    };
    Fax?: {
      FreeFormNumber?: string;
    };
    WebAddr?: {
      URI?: string;
    };
    SalesTermRef?: NameValuePair;
  }

  export interface QuickBooksVendor extends QuickBooksRestEntity {
    DisplayName: string;
    PrimaryEmailAddr?: {
      Address?: string;
    };
    PrimaryPhone?: {
      FreeFormNumber?: string;
    };
    CurrencyRef?: NameValuePair;
    BillAddr?: QuickBooksAddress;
    DefaultTaxCodeRef?: NameValuePair;
    Vendor1099?: boolean;
    Balance?: number;
    GivenName?: string;
    Title?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
    CompanyName?: string;
    Mobile?: {
      FreeFormNumber?: string;
    };
    Fax?: {
      FreeFormNumber?: string;
    };
    WebAddr?: {
      URI?: string;
    };
    PrintOnCheckName?: string;
    CostRate?: number;
    BillRate?: number;
    readonly SyncToken: string;
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
    Active?: boolean;
  }

  export interface QuickBooksEmployee extends QuickBooksRestEntity {
    DisplayName: string;
    GivenName?: string;
    MiddleName?: string;
    FamilyName?: string;
    Suffix?: string;
    PrintOnCheckName?: string;
    Title?: string;
    EmployeeNumber?: string;
    Active?: boolean;
    PrimaryEmailAddr?: {
      Address?: string;
    };
    Mobile?: {
      FreeFormNumber?: string;
    };
    PrimaryPhone?: {
      FreeFormNumber?: string;
    };
    PrimaryAddr?: QuickBooksAddress;
    BillableTime?: boolean;
    BillRate?: number;
    HiredDate?: string;
    ReleasedDate?: string;
    readonly SyncToken: string;
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
  }

  export type QuickBooksTimeActivityNameOf = 'Employee' | 'Vendor';

  export type QuickBooksBillableStatus = 'NotBillable' | 'Billable' | 'HasBeenBilled';

  export interface QuickBooksTimeActivity extends QuickBooksRestEntity {
    TxnDate?: string;
    NameOf?: QuickBooksTimeActivityNameOf;
    EmployeeRef?: NameValuePair;
    VendorRef?: NameValuePair;
    CustomerRef?: NameValuePair;
    ItemRef?: NameValuePair;
    ClassRef?: NameValuePair;
    DepartmentRef?: NameValuePair;
    Hours?: number;
    Minutes?: number;
    HourlyRate?: number;
    BillableStatus?: QuickBooksBillableStatus;
    Taxable?: boolean;
    Description?: string;
    StartTime?: string;
    EndTime?: string;
    readonly SyncToken: string;
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
  }

  export interface QBOTxnTaxDetailTaxLine {
    DetailType: 'TaxLineDetail';
    TaxLineDetail: {
      TaxRateRef: NameValuePair;
      NetAmountTaxable?: number;
      PercentBased?: boolean;
      TaxInclusiveAmount?: number;
      OverrideDeltaAmount?: number;
      TaxPercent?: number;
    };
    Amount?: number;
  }

  export interface QBOTaxDetail {
    TxnTaxCodeRef?: NameValuePair;
    TotalTax?: number;
    TaxLine?: QBOTxnTaxDetailTaxLine[];
  }

  export interface QuickBooksCustomField {
    DefinitionId: string;
    Name: string;
    Type: 'StringType';
    StringValue: string;
  }

  export interface QuickBooksBaseTxn extends QuickBooksRestEntity {
    Line: Array<QuickBooksBaseTxnLine>;
    CustomerRef: NameValuePair;
    CurrencyRef?: NameValuePair;
    ClassRef?: NameValuePair;
    DepartmentRef?: NameValuePair;
    TxnDate?: string;
    PrivateNote?: string;
    CustomerMemo?: ValueHolder;
    TxnTaxDetail?: QBOTaxDetail;
    ApplyTaxAfterDiscount?: boolean;
    LinkedTxn?: Array<QuickBooksLinkedTransaction>;
    BillEmail?: { Address: string };
    BillAddr?: QuickBooksAddress;
    ShipAddr?: QuickBooksAddress;
    SalesTermRef?: NameValuePair;
    DueDate?: string;
    TotalAmt: number;
    DocNumber?: string;
    SyncToken?: string;
    CustomField?: QuickBooksCustomField[];
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
  }

  export interface QuickBooksInvoice extends QuickBooksBaseTxn {
    EmailStatus?: 'NotSet' | 'NeedToSend' | 'EmailSent';
    Deposit?: number;
    AllowOnlineACHPayment?: boolean;
    AllowOnlineCreditCardPayment?: boolean;
    Balance: number;
    // Customer-facing shareable URL for viewing/paying the invoice. Requires include=invoiceLink in query.
    InvoiceLink?: string;
  }

  export interface QuickBooksEstimate extends QuickBooksBaseTxn {
    TxnStatus?: EstimateStatusOption;
    ExpirationDate?: string;
    AcceptedDate?: string;
    AcceptedBy?: string;
  }

  export type QuickBooksBaseTxnLine = {
    Id?: string;
    Description?: string;
    LineNum?: number;
    ProjectRef?: NameValuePair;
  } & (
    | QuickBooksBaseTxnSalesItemLine
    | QuickBooksBaseTxnDescriptionOnlyLine
    | QuickBooksBaseTxnDiscountLine
    | QuickBooksBaseTxnSubTotalLine
    | QuickBooksBaseTxnGroupLine
  );

  export interface QuickBooksSalesItemLineDetail {
    ItemRef?: { value: string; name?: string; type?: string };
    Qty?: number;
    UnitPrice?: number;
    TaxCodeRef?: { value: string; name?: string; type?: string };
    ServiceDate?: string;
    TaxInclusiveAmt?: number;
    ClassRef?: NameValuePair;
    ItemAccountRef?: NameValuePair;
    /** Item automated sales-tax category. */
    TaxClassificationRef?: { value: string; name?: string } | null;
    MarkupInfo?: QuickBooksMarkupInfo;
  }

  export interface QuickBooksMarkupInfo {
    PercentBased?: boolean;
    Value?: number;
    Percent?: number;
    MarkUpIncomeAccountRef?: NameValuePair;
    PriceLevelRef?: NameValuePair;
  }

  export interface QuickBooksBaseTxnSalesItemLine {
    DetailType: 'SalesItemLineDetail';
    SalesItemLineDetail: QuickBooksSalesItemLineDetail;
    Amount: number;
    LinkedTxn?: QuickBooksLinkedTransaction[];
  }

  export interface QuickBooksBaseTxnDescriptionOnlyLine {
    DetailType: 'DescriptionOnly';
    DescriptionLineDetail: Record<string, unknown>;
  }

  export interface QuickBooksDiscountLineDetail {
    PercentBased?: boolean;
    DiscountPercent?: number;
    DiscountAccountRef?: NameValuePair;
    DiscountRef?: NameValuePair;
  }

  export interface QuickBooksBaseTxnDiscountLine {
    DetailType: 'DiscountLineDetail';
    DiscountLineDetail: QuickBooksDiscountLineDetail;
    Amount: number;
  }

  export interface QuickBooksTerm extends QuickBooksRestEntity {
    Name: string;
    DueDays?: number;
  }

  export interface QuickBooksClass extends QuickBooksRestEntity {
    Name: string;
    SubClass?: boolean;
    ParentRef?: NameValuePair;
    Active?: boolean;
    FullyQualifiedName?: string;
    SyncToken?: string;
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
  }

  export interface QuickBooksDepartment extends QuickBooksRestEntity {
    Name: string;
    SubDepartment?: boolean;
    ParentRef?: NameValuePair;
    Active?: boolean;
    FullyQualifiedName?: string;
    SyncToken?: string;
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
  }

  export interface QuickBooksItem extends QuickBooksRestEntity {
    Name: string;
    ClassRef?: NameValuePair;
    ParentRef?: NameValuePair; // Category (parent item) when using item categories
    SyncToken?: string; // required for update
    FullyQualifiedName?: string;
    Level?: number;
    ItemCategoryType?: QuickBooksItemCategoryType;
    Description?: string;
    UnitPrice?: number;
    Taxable?: boolean; // US only
    Type?: QuickBooksItemType;
    TrackQtyOnHand?: boolean; // Inventory only
    QtyOnHand?: number; // Inventory only; initial quantity is supplied on create
    InvStartDate?: string; // Inventory only; required when creating an initial quantity
    Sku?: string;
    SalesTaxIncluded?: boolean;
    PurchaseTaxIncluded?: boolean;
    ReorderPoint?: number;
    PurchaseDesc?: string;
    PurchaseCost?: number;
    SubItem?: boolean;
    Active?: boolean;
    IncomeAccountRef?: NameValuePair;
    AssetAccountRef?: NameValuePair; // Inventory only
    ExpenseAccountRef?: NameValuePair;
    TaxClassificationRef?: NameValuePair;
    ItemGroupDetail?: {
      ItemGroupLine: Array<{
        ItemRef: NameValuePair & {
          type?: Exclude<QuickBooksItemType, 'Category' | 'Group'>;
        };
        Qty: number;
      }>;
    };
    PrintGroupedItems?: boolean;
  }

  export interface QuickBooksItemBasedExpenseLine {
    Id?: string;
    ProjectRef?: NameValuePair;
    LinkedTxn?: QuickBooksLinkedTransaction[];
    DetailType: 'ItemBasedExpenseLineDetail';
    Amount: number;
    Description?: string;
    LineNum?: number;
    ItemBasedExpenseLineDetail: {
      TaxInclusiveAmt?: number;
      ItemRef?: NameValuePair;
      CustomerRef?: NameValuePair;
      ClassRef?: NameValuePair;
      PriceLevelRef?: NameValuePair;
      TaxCodeRef?: { value: string; name?: string; type?: string };
      BillableStatus?: 'NotBillable' | 'Billable' | 'HasBeenBilled';
      Qty?: number;
      UnitPrice?: number;
      ItemAccountRef?: NameValuePair;
      /** Item automated sales-tax category. */
      TaxClassificationRef?: { value: string; name?: string } | null;
      MarkupInfo?: QuickBooksMarkupInfo;
    };
  }

  export interface QuickBooksAccountBasedExpenseLine {
    Id?: string;
    ProjectRef?: NameValuePair;
    LinkedTxn?: QuickBooksLinkedTransaction[];
    DetailType: 'AccountBasedExpenseLineDetail';
    Amount: number;
    Description?: string;
    LineNum?: number;
    AccountBasedExpenseLineDetail: {
      AccountRef: NameValuePair;
      TaxAmount?: number;
      TaxInclusiveAmt?: number;
      TaxCodeRef?: { value: string; name?: string; type?: string };
      BillableStatus?: 'NotBillable' | 'Billable' | 'HasBeenBilled';
      CustomerRef?: NameValuePair;
      ClassRef?: NameValuePair;
      MarkupInfo?: QuickBooksMarkupInfo;
    };
  }

  export interface QuickBooksPurchase extends QuickBooksRestEntity {
    SyncToken?: string; // required for update
    Line: Array<QuickBooksItemBasedExpenseLine | QuickBooksAccountBasedExpenseLine>;
    PaymentType: 'Cash' | 'Check' | 'CreditCard';
    AccountRef: NameValuePair;
    EntityRef?: NameValuePair; // Vendor/Entity reference
    CurrencyRef?: NameValuePair; // required if multi-currency is enabled
    DepartmentRef?: NameValuePair | ValueHolder | null;
    PaymentMethodRef?: NameValuePair | ValueHolder | null;
    DocNumber?: string;
    TxnDate?: string;
    PrivateNote?: string;
    TotalAmt?: number; // read only
    Credit?: boolean;
  }

  export interface QuickBooksBill extends QuickBooksRestEntity {
    SyncToken?: string; // required for update
    VendorRef: NameValuePair; // required
    APAccountRef: NameValuePair; // accounts payable account
    TxnDate?: string;
    DueDate?: string;
    TotalAmt: number; // readonly
    Balance: number; // readonly, outstanding balance
    Line: Array<QuickBooksItemBasedExpenseLine | QuickBooksAccountBasedExpenseLine>;
    CurrencyRef?: NameValuePair;
    ExchangeRate?: number; // for multi-currency
    PrivateNote?: string;
    LinkedTxn?: Array<QuickBooksLinkedTransaction>; // linked transactions like payments
    CustomField?: QuickBooksCustomField[];
    DocNumber?: string; // optional document number
    SalesTermRef?: NameValuePair; // terms, if supported
    ClassRef?: NameValuePair; // class, if supported
    DepartmentRef?: NameValuePair;
    TxnTaxDetail?: QBOTaxDetail; // tax details, if applicable
    BillAddr?: QuickBooksAddress; // billing address
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
  }

  export interface QuickBooksPurchaseOrder extends QuickBooksRestEntity {
    SyncToken?: string;
    VendorRef: NameValuePair;
    APAccountRef?: NameValuePair;
    TxnDate?: string;
    DueDate?: string;
    TotalAmt?: number;
    POStatus?: string;
    Line: Array<QuickBooksItemBasedExpenseLine | QuickBooksAccountBasedExpenseLine>;
    CurrencyRef?: NameValuePair;
    ExchangeRate?: number;
    Memo?: string;
    PrivateNote?: string;
    LinkedTxn?: Array<QuickBooksLinkedTransaction>;
    CustomField?: QuickBooksCustomField[];
    DocNumber?: string;
    SalesTermRef?: NameValuePair;
    ClassRef?: NameValuePair;
    DepartmentRef?: NameValuePair;
    TxnTaxDetail?: QBOTaxDetail;
    VendorAddr?: QuickBooksAddress;
    ShipAddr?: QuickBooksAddress;
    POEmail?: { Address?: string };
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
  }

  export interface QuickBooksBillPaymentLine {
    Amount: number;
    LinkedTxn: QuickBooksLinkedTransaction[];
  }

  export interface QuickBooksBillPayment extends QuickBooksRestEntity {
    SyncToken?: string; // required for update
    VendorRef: NameValuePair; // required
    PayType: 'Check' | 'CreditCard';
    CheckPayment?: {
      BankAccountRef: NameValuePair;
    }; // if PayType is Check
    CreditCardPayment?: {
      CCAccountRef: NameValuePair;
    }; // if PayType is CreditCard
    TotalAmt: number;
    CurrencyRef?: NameValuePair;
    ExchangeRate?: number;
    PrivateNote?: string;
    TxnDate?: string;
    Line: QuickBooksBillPaymentLine[];
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
  }

  export interface QuickBooksSalesTaxCode extends QuickBooksRestEntity {
    // TAXCODE entity type
    Name: string;
    Description?: string;
    SalesTaxRateList?: {
      TaxRateDetail?: Array<{
        RateValue: number;
        TaxRateRef: NameValuePair;
      }>;
    };
  }

  export interface QBOSalesTaxRate extends QuickBooksRestEntity {
    Name: string;
    RateValue: number;
  }

  export type CurrencyRef = {
    value: string; // e.g., "USD"
    name?: string; // e.g., "United States Dollar"
  };

  export type CurrencyPrefs = {
    HomeCurrency: CurrencyRef;
    MultiCurrencyEnabled?: boolean;
    // Potentially other currency-related preferences
  };

  export type TaxPrefs = {
    /**
     * Indicates if sales tax is set up for the company.
     */
    UsingSalesTax: boolean;

    /**
     * Indicates the status of Automated Sales Tax (AST) for the company.
     * - `true`: AST is enabled, and sales tax is set up (`UsingSalesTax` is true).
     * - `false`: AST is enabled, but sales tax isn't set up (`UsingSalesTax` is false).
     * - `undefined`: The company isn't enabled for AST.
     */
    PartnerTaxEnabled?: boolean;
  };

  export type SalesPrefsCustomFieldUsage = {
    CustomField: {
      Name:
        | 'SalesFormsPrefs.UseSalesCustom1'
        | 'SalesFormsPrefs.UseSalesCustom2'
        | 'SalesFormsPrefs.UseSalesCustom3';
      Type: 'BooleanType';
      BooleanValue: boolean;
    }[];
  };

  export type SalesPrefsCustomFieldNames = {
    CustomField: {
      Name:
        | 'SalesFormsPrefs.SalesCustomName1'
        | 'SalesFormsPrefs.SalesCustomName2'
        | 'SalesFormsPrefs.SalesCustomName3';
      Type: 'StringType';
      StringValue: string;
    }[];
  };

  export type SalesFormsPrefs = {
    /**
     * Indicates if QuickBooks Online Payments is enabled. When true,
     * it allows both online credit card and ACH payments.
     */
    ETransactionPaymentEnabled?: boolean;
    CustomField?: [SalesPrefsCustomFieldUsage, SalesPrefsCustomFieldNames];
  };

  export type AccountingInfoPrefs = {
    ClassTrackingPerTxn?: boolean;
    ClassTrackingPerTxnLine?: boolean;
    TrackDepartments?: boolean;
  };

  export type ProductAndServicesPrefs = {
    ForSales?: boolean;
    ForPurchase?: boolean;
    InventoryAndPurchaseOrder?: boolean;
    QuantityWithPriceAndRate?: boolean;
    QuantityOnHand?: boolean;
    UOM?: string;
    RevenueRecognition?: boolean;
    RevenueRecognitionFrequency?: string;
  };

  export type QBOPreferences = {
    Id?: string;
    SyncToken?: string;
    TaxPrefs: TaxPrefs;
    SalesFormsPrefs: SalesFormsPrefs;
    AccountingInfoPrefs?: AccountingInfoPrefs;
    ProductAndServicesPrefs?: ProductAndServicesPrefs;
    CurrencyPrefs?: CurrencyPrefs; // Added CurrencyPrefs as optional
    OtherPrefs?: {
      ProjectsEnabled?: boolean;
      NameValue?: Array<{
        Name?: string;
        Value?: string;
      }>;
    };
  };

  export type QBOCompanyInfo = {
    Id?: string;
    SyncToken?: string;
    CompanyName: string;
    Country?: string;
    Email?: { Address?: string };
    WebAddr?: { URI?: string };
    NameValue?: { Name: string; Value: string }[];
  };

  export type QuickBooksLinkedTransaction = {
    TxnId: string;
    TxnType: string;
    TxnLineId?: string;
  };

  export type QuickBooksPaymentLine = {
    Id?: string;
    LineNum?: number;
    Amount?: number;
    LinkedTxn?: QuickBooksLinkedTransaction[];
  };

  export interface QuickBooksPayment extends QuickBooksRestEntity {
    CustomerRef: NameValuePair;
    ARAccountRef?: NameValuePair;
    DepositToAccountRef?: NameValuePair;
    TxnDate?: string;
    TotalAmt?: number;
    UnappliedAmt?: number;
    PaymentMethodRef?: NameValuePair;
    PaymentRefNum?: string;
    PaymentType?: 'Cash' | 'Check' | 'CreditCard' | 'Other';
    ProcessPayment?: boolean;
    CurrencyRef?: NameValuePair;
    ExchangeRate?: number;
    PrivateNote?: string;
    DepartmentRef?: NameValuePair;
    DocNumber?: string;
    TxnSource?: string;
    SyncToken?: string;
    readonly MetaData?: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
    Line?: QuickBooksPaymentLine[];
  }

  export type QBOFaultType = 'AuthorizationFault' | 'ValidationFault' | (string & {});

  export type QBOFaultErrorItem = {
    Message?: string;
    message?: string;
    Detail?: string;
    detail?: string;
    code?: number | string;
    element?: string;
  };

  export type QBOFault = {
    Error?: QBOFaultErrorItem[];
    error?: QBOFaultErrorItem[];
    type?: QBOFaultType;
  };

  export type Account = QuickBooksAccount;

  export type Attachable = QuickBooksAttachable;

  export type Bill = QuickBooksBill;

  export type BillPayment = QuickBooksBillPayment;

  export type Class = QuickBooksClass;

  export type CompanyInfo = QBOCompanyInfo;

  export type Customer = QuickBooksCustomer;

  export type Department = QuickBooksDepartment;

  export type Employee = QuickBooksEmployee;

  export type Estimate = QuickBooksEstimate;

  export type Invoice = QuickBooksInvoice;

  export type Item = QuickBooksItem;

  export type Payment = QuickBooksPayment;

  export type Preferences = QBOPreferences;

  export type Purchase = QuickBooksPurchase;

  export type PurchaseOrder = QuickBooksPurchaseOrder;

  export type TaxCode = QuickBooksSalesTaxCode;

  export type TaxRate = QBOSalesTaxRate;

  export type Term = QuickBooksTerm;

  export type TimeActivity = QuickBooksTimeActivity;

  export type Vendor = QuickBooksVendor;

  export type OAuthVersion = '1.0' | '1.0a' | '2.0';

  export type Config = {
    consumerKey: string;
    consumerSecret: string;
    token: string;
    realmId: string;
    useSandbox?: boolean;
    debug?: boolean;
    minorversion?: number | string | null;
    refreshToken?: string | null;
  } & (
    | { oauthversion: '2.0'; tokenSecret?: string | false | null }
    | { oauthversion?: '1.0' | '1.0a'; tokenSecret: string }
  );

  export interface MetaData {
    CreateTime?: string;
    LastUpdatedTime?: string;
  }

  export interface Ref {
    value: string;
    name?: string;
    type?: string;
  }

  /** Common Intuit error bodies; callbacks accept unknown because HTTP errors may contain arbitrary bodies. */
  export type QuickBooksError = Error | QBOFault | QBOFaultEnvelope | string;
  export interface QBOFaultEnvelope {
    Fault?: QBOFault;
    fault?: QBOFault;
    time?: string;
  }

  /** Entity callbacks receive the unwrapped entity; data can be absent or null on failure. */
  export type QuickBooksCallback<T> = (
    err: unknown,
    data?: T | null,
    res?: AxiosResponse<unknown>
  ) => void;

  export interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in?: number;
    x_refresh_token_expires_in?: number;
    x_refresh_token_hard_expires_in?: number;
    token_type?: string;
    id_token?: string;
  }

  /** Refresh success returns token data; failure returns the HTTP response and its body. */
  export type RefreshTokenCallback = (
    err: unknown,
    data?: RefreshTokenResponse | AxiosResponse<unknown>,
    body?: unknown
  ) => void;
  export type OAuthResponseCallback = (
    err: unknown,
    response?: AxiosResponse<unknown>,
    body?: unknown
  ) => void;

  export interface ConnectionResponse {
    ErrorCode: number;
    ErrorMessage?: string;
    [field: string]: unknown;
  }

  export type QueryValue = string | number | boolean | null | Date;
  export type QueryOperator = '=' | 'IN' | '<' | '>' | '<=' | '>=' | 'LIKE';
  export interface QueryCriteriaObject {
    fetchAll?: boolean;
    limit?: number;
    offset?: number;
    count?: boolean;
    desc?: string;
    asc?: string;
    [field: string]: QueryValue | readonly QueryValue[] | undefined;
  }
  export type QueryCriteriaArrayEntry =
    | { field: string; value: QueryValue | readonly QueryValue[]; operator?: QueryOperator }
    | (QueryCriteriaObject & { field?: never });
  export type QueryCriteriaArray = readonly QueryCriteriaArrayEntry[];
  /** A string is the criteria/where suffix, not a complete SQL query. */
  export type QueryCriteria = QueryCriteriaObject | QueryCriteriaArray | string;
  export interface QueryOptions {
    qs?: Record<string, string | number | boolean | undefined>;
    headers?: Record<string, string>;
  }
  export interface QueryMetadata {
    startPosition?: number;
    maxResults?: number;
    totalCount?: number;
  }
  export interface QueryResponseData<T> {
    QueryResponse: T & QueryMetadata;
    time?: string;
  }
  /** Legacy entity-only generic. Prefer QueryResponseFor or QueryResponseData for named collections. */
  export type QueryResponse<T> = QueryResponseData<Record<string, T[] | number | undefined>>;
  export type CanonicalEntityName<K extends string> = K extends unknown
    ? Lowercase<K> extends Lowercase<keyof EntityMap>
      ? { [N in keyof EntityMap]: Lowercase<K> extends Lowercase<N> ? N : never }[keyof EntityMap]
      : K
    : never;
  export type EntityFor<K extends string> =
    CanonicalEntityName<K> extends infer N
      ? N extends keyof EntityMap
        ? EntityMap[N]
        : QuickBooksRestEntity
      : never;
  export type QueryResponseFor<K extends string> = string extends K
    ? QueryResponse<QuickBooksRestEntity>
    : QueryResponseData<{ [N in CanonicalEntityName<K>]?: EntityFor<N>[] }>;

  /** Envelope types apply to raw void/delete responses, not ordinary CRUD callbacks. */
  export interface EntityResponse<T> {
    [entity: string]: T | string | undefined;
    time?: string;
  }
  export type EntityResponseFor<K extends keyof EntityMap> = { [N in K]: EntityMap[N] } & {
    time?: string;
  };
  export type DeleteResponse<K extends keyof EntityMap> = { [N in K]: DeletedEntity } & {
    time?: string;
  };
  export interface DeletedEntity {
    Id: string;
    status: 'Deleted';
    domain?: string;
    MetaData?: MetaData;
  }
  export type ChangeDataCaptureQueryResponse = QueryMetadata & {
    [K in keyof EntityMap]?: Array<EntityMap[K] | DeletedEntity>;
  };
  export interface ChangeDataCaptureResponse {
    CDCResponse: Array<{ QueryResponse: ChangeDataCaptureQueryResponse[] }>;
    time?: string;
    Fault?: QBOFault;
  }

  export type BatchItemRequest =
    | { bId: string; query: string; operation?: 'query' }
    | { bId: string; operation: 'create' | 'update' | 'delete'; [entity: string]: unknown };
  export type QuickBooksBatchItem = {
    bId?: string;
    Fault?: QBOFault;
    QueryResponse?: QueryMetadata & Record<string, unknown>;
    [entity: string]: unknown;
  };
  export interface QuickBooksBatchResponse {
    BatchItemResponse?: QuickBooksBatchItem[];
    time?: string;
  }

  export interface ReportOptions {
    start_date?: string;
    end_date?: string;
    accounting_method?: 'Cash' | 'Accrual';
    [parameter: string]: string | number | boolean | undefined;
  }
  export interface ReportColumnData {
    value?: string;
    id?: string;
  }
  export interface ReportRow {
    type?: string;
    group?: string;
    ColData?: ReportColumnData[];
    Header?: { ColData?: ReportColumnData[] };
    Summary?: { ColData?: ReportColumnData[] };
    Rows?: { Row?: ReportRow[] };
  }
  export interface Report {
    Header?: {
      Time?: string;
      ReportName?: string;
      StartPeriod?: string;
      EndPeriod?: string;
      Currency?: string;
      ReportBasis?: string;
      Option?: Array<{ Name: string; Value: string }>;
    };
    Columns?: {
      Column?: Array<{
        ColTitle?: string;
        ColType?: string;
        MetaData?: Array<{ Name: string; Value: string }>;
      }>;
    };
    Rows?: { Row?: ReportRow[] };
  }

  export type EntityVersion<SyncToken extends string | number = string> = {
    Id: string | number;
    SyncToken: SyncToken;
  };
  export interface WriteOptions {
    requestId?: string;
    allowDuplicateDocNum?: boolean;
    sparse?: boolean;
    void?: boolean;
  }
  /** Optional references may be explicitly cleared; required references remain required. */
  export type WriteFields<T> = {
    [K in keyof T]: K extends `${string}Ref` ? (undefined extends T[K] ? T[K] | null : T[K]) : T[K];
  };
  /** Creates omit identity and metadata. Updates are sparse by default in the implementation. */
  export type CreateInput<T, RequiredFields extends keyof T = never> = Partial<
    WriteFields<Omit<T, 'Id' | 'SyncToken' | 'MetaData' | 'domain' | 'sparse'>>
  > &
    Required<Pick<T, RequiredFields>> &
    WriteOptions;
  export type UpdateInput<T, SyncToken extends string | number = string> = Partial<
    WriteFields<Omit<T, 'Id' | 'SyncToken' | 'MetaData' | 'domain'>>
  > &
    EntityVersion<SyncToken> &
    WriteOptions;
  export type UpdateItemInput = UpdateInput<Item> & { doNotUpdateAccountOnTxns?: boolean };
  export type ExchangeRateInput = Omit<ExchangeRate, 'Id' | 'SyncToken' | 'MetaData'> &
    WriteOptions;

  export interface QuickBooksBaseTxnSubTotalLine {
    DetailType: 'SubTotalLineDetail';
    SubTotalLineDetail?: { ItemRef?: Ref };
    Amount: number;
  }
  export interface QuickBooksBaseTxnGroupLine {
    DetailType: 'GroupLineDetail';
    GroupLineDetail: { GroupItemRef: Ref; Quantity?: number; Line?: QuickBooksBaseTxnLine[] };
    Amount?: number;
  }

  export interface Budget extends QuickBooksRestEntity {
    Name?: string;
  }
  export interface CompanyCurrency extends QuickBooksRestEntity {
    Code?: string;
  }
  export interface CreditMemo extends QuickBooksBaseTxn {
    RemainingCredit?: number;
  }
  export interface CustomerType extends QuickBooksRestEntity {
    Name?: string;
  }
  export interface Deposit extends QuickBooksRestEntity {
    DepositToAccountRef: Ref;
    TxnDate?: string;
    TotalAmt?: number;
    Line: Array<{
      Id?: string;
      Amount: number;
      Description?: string;
      DetailType: 'DepositLineDetail';
      DepositLineDetail: {
        AccountRef?: Ref;
        Entity?: Ref;
        PaymentMethodRef?: Ref;
        CheckNum?: string;
      };
    }>;
  }
  export interface JournalCode extends QuickBooksRestEntity {
    Name: string;
    Type?: string;
  }
  export interface JournalEntry extends QuickBooksRestEntity {
    TxnDate?: string;
    DocNumber?: string;
    PrivateNote?: string;
    CurrencyRef?: Ref;
    ExchangeRate?: number;
    Line: Array<{
      Id?: string;
      Amount: number;
      Description?: string;
      DetailType: 'JournalEntryLineDetail';
      JournalEntryLineDetail: {
        PostingType: 'Debit' | 'Credit';
        AccountRef: Ref;
        Entity?: { Type?: string; EntityRef?: Ref };
        ClassRef?: Ref;
        DepartmentRef?: Ref;
        TaxCodeRef?: Ref;
      };
    }>;
  }
  export interface PaymentMethod extends QuickBooksRestEntity {
    Name: string;
    Type?: string;
    Active?: boolean;
  }
  export interface RefundReceipt extends QuickBooksBaseTxn {
    PaymentMethodRef?: Ref;
    DepositToAccountRef?: Ref;
  }
  export interface SalesReceipt extends QuickBooksBaseTxn {
    PaymentMethodRef?: Ref;
    DepositToAccountRef?: Ref;
  }
  export interface TaxAgency extends QuickBooksRestEntity {
    DisplayName: string;
  }
  export interface Transfer extends QuickBooksRestEntity {
    FromAccountRef: Ref;
    ToAccountRef: Ref;
    Amount: number;
    TxnDate?: string;
    PrivateNote?: string;
    CurrencyRef?: Ref;
  }
  export interface VendorCredit extends QuickBooksRestEntity {
    VendorRef: Ref;
    Line: Array<QuickBooksItemBasedExpenseLine | QuickBooksAccountBasedExpenseLine>;
    TotalAmt?: number;
    TxnDate?: string;
    APAccountRef?: Ref;
    CurrencyRef?: Ref;
    PrivateNote?: string;
    DocNumber?: string;
  }
  export interface ExchangeRate {
    Id?: string;
    SyncToken?: string;
    SourceCurrencyCode: string;
    TargetCurrencyCode?: string;
    Rate: number;
    AsOfDate?: string;
    MetaData?: MetaData;
  }

  export interface EntityMap {
    Account: Account;
    Attachable: Attachable;
    Bill: Bill;
    BillPayment: BillPayment;
    Budget: Budget;
    Class: Class;
    CompanyInfo: CompanyInfo;
    CompanyCurrency: CompanyCurrency;
    CreditMemo: CreditMemo;
    Customer: Customer;
    CustomerType: CustomerType;
    Department: Department;
    Deposit: Deposit;
    Employee: Employee;
    Estimate: Estimate;
    Invoice: Invoice;
    Item: Item;
    JournalCode: JournalCode;
    JournalEntry: JournalEntry;
    Payment: Payment;
    PaymentMethod: PaymentMethod;
    Preferences: Preferences;
    Purchase: Purchase;
    PurchaseOrder: PurchaseOrder;
    RefundReceipt: RefundReceipt;
    SalesReceipt: SalesReceipt;
    TaxAgency: TaxAgency;
    TaxCode: TaxCode;
    TaxRate: TaxRate;
    Term: Term;
    TimeActivity: TimeActivity;
    Transfer: Transfer;
    Vendor: Vendor;
    VendorCredit: VendorCredit;
    ExchangeRate: ExchangeRate;
  }

  export type CreateAccountInput = CreateInput<Account, 'Name' | 'AccountType'>;
  export type CreateAttachableInput = CreateInput<Attachable>;
  export type CreateBillInput = CreateInput<Bill, 'VendorRef' | 'Line'>;
  export type CreateBillPaymentInput = CreateInput<
    BillPayment,
    'VendorRef' | 'PayType' | 'TotalAmt'
  >;
  export type CreateClassInput = CreateInput<Class, 'Name'>;
  export type CreateCreditMemoInput = CreateInput<CreditMemo, 'CustomerRef' | 'Line'>;
  export type CreateCustomerInput = CreateInput<Customer, 'DisplayName'>;
  export type CreateDepartmentInput = CreateInput<Department, 'Name'>;
  export type CreateDepositInput = CreateInput<Deposit, 'DepositToAccountRef' | 'Line'>;
  export type CreateEmployeeInput = CreateInput<Employee, 'DisplayName'>;
  export type CreateEstimateInput = CreateInput<Estimate, 'CustomerRef' | 'Line'>;
  export type CreateInvoiceInput = CreateInput<Invoice, 'CustomerRef' | 'Line'>;
  export type CreateItemInput = CreateInput<Item, 'Name'>;
  export type CreateJournalCodeInput = CreateInput<JournalCode, 'Name'>;
  export type CreateJournalEntryInput = CreateInput<JournalEntry, 'Line'>;
  export type CreatePaymentInput = CreateInput<Payment, 'CustomerRef' | 'TotalAmt'>;
  export type CreatePaymentMethodInput = CreateInput<PaymentMethod, 'Name'>;
  export type CreatePurchaseInput = CreateInput<Purchase, 'PaymentType' | 'AccountRef' | 'Line'>;
  export type CreatePurchaseOrderInput = CreateInput<PurchaseOrder, 'VendorRef' | 'Line'>;
  export type CreateRefundReceiptInput = CreateInput<RefundReceipt, 'CustomerRef' | 'Line'>;
  export type CreateSalesReceiptInput = CreateInput<SalesReceipt, 'CustomerRef' | 'Line'>;
  export type CreateTaxAgencyInput = CreateInput<TaxAgency, 'DisplayName'>;
  export type CreateTermInput = CreateInput<Term, 'Name'>;
  export type CreateTimeActivityInput = CreateInput<TimeActivity>;
  export type CreateTransferInput = CreateInput<
    Transfer,
    'FromAccountRef' | 'ToAccountRef' | 'Amount'
  >;
  export type CreateVendorInput = CreateInput<Vendor, 'DisplayName'>;
  export type CreateVendorCreditInput = CreateInput<VendorCredit, 'VendorRef' | 'Line'>;
}

export = QuickBooks;
