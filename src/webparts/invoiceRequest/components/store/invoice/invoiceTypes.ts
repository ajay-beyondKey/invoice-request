export const FETCH_INVOICES_REQUEST = "invoice/FETCH_REQUEST";
export const FETCH_INVOICES_SUCCESS = "invoice/FETCH_SUCCESS";
export const FETCH_INVOICES_FAILURE = "invoice/FETCH_FAILURE";

export const ADD_INVOICE_REQUEST = "invoice/ADD_REQUEST";
export const ADD_INVOICE_SUCCESS = "invoice/ADD_SUCCESS";
export const ADD_INVOICE_FAILURE = "invoice/ADD_FAILURE";

export const UPDATE_INVOICE_REQUEST = "invoice/UPDATE_REQUEST";
export const UPDATE_INVOICE_SUCCESS = "invoice/UPDATE_SUCCESS";
export const UPDATE_INVOICE_FAILURE = "invoice/UPDATE_FAILURE";

export const DELETE_INVOICE_REQUEST = "invoice/DELETE_REQUEST";
export const DELETE_INVOICE_SUCCESS = "invoice/DELETE_SUCCESS";
export const DELETE_INVOICE_FAILURE = "invoice/DELETE_FAILURE";

import { IInvoice } from "../../models/IInvoice";

export interface InvoiceState {
    items: IInvoice[];
    loading: boolean;
    error?: string | null;
}

export interface FetchInvoicesSuccessPayload {
    items: IInvoice[];
}

export interface AddInvoiceSuccessPayload {
    item: IInvoice;
}

export interface UpdateInvoiceSuccessPayload {
    id: number;
    item: IInvoice;
}
