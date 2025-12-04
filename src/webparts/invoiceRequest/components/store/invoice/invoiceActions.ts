import { Dispatch } from "redux";
import {
    FETCH_INVOICES_REQUEST,
    FETCH_INVOICES_SUCCESS,
    FETCH_INVOICES_FAILURE,
    ADD_INVOICE_REQUEST,
    ADD_INVOICE_SUCCESS,
    ADD_INVOICE_FAILURE,
    UPDATE_INVOICE_REQUEST,
    UPDATE_INVOICE_SUCCESS,
    UPDATE_INVOICE_FAILURE,
    DELETE_INVOICE_REQUEST,
    DELETE_INVOICE_SUCCESS,
    DELETE_INVOICE_FAILURE,
} from "./invoiceTypes";
import { IInvoice } from "../../models/IInvoice";
import { invoiceService } from "../../services/invoiceService";

export const fetchInvoices = () => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_INVOICES_REQUEST });

    try {
        const res =
            invoiceService && (invoiceService as any).getAll
                ? await (invoiceService as any).getAll()
                : [];

        dispatch({ type: FETCH_INVOICES_SUCCESS, payload: { items: res } });
    } catch (err: any) {
        dispatch({
            type: FETCH_INVOICES_FAILURE,
            payload: { error: err?.message || "Fetch failed" },
        });
    }
};

export const addInvoice =
    (data: IInvoice, file?: File) => async (dispatch: Dispatch) => {
        dispatch({ type: ADD_INVOICE_REQUEST });
        try {
            let created = await invoiceService.createWithAttachment(data, file);
            dispatch({ type: ADD_INVOICE_SUCCESS, payload: { item: created } });
        } catch (err: any) {
            dispatch({
                type: ADD_INVOICE_FAILURE,
                payload: { error: err?.message || "Add failed" },
            });
        }
    };

export const updateInvoice =
    (id: number, data: IInvoice, file?: File) => async (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_INVOICE_REQUEST });
        try {
            let updated;
            if (file) {
                updated = await invoiceService.updateWithAttachment(
                    id,
                    data,
                    file
                );
            } else {
                updated = await invoiceService.updateWithAttachment(id, data);
            }
            dispatch({
                type: UPDATE_INVOICE_SUCCESS,
                payload: { item: updated },
            });
        } catch (err: any) {
            dispatch({
                type: UPDATE_INVOICE_FAILURE,
                payload: { error: err?.message || "Update failed" },
            });
        }
    };

export const deleteInvoice = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_INVOICE_REQUEST });
    try {
        await (invoiceService as any).delete(id);
        dispatch({ type: DELETE_INVOICE_SUCCESS, payload: { id } });
    } catch (err: any) {
        dispatch({
            type: DELETE_INVOICE_FAILURE,
            payload: { error: err?.message || "Delete failed" },
        });
    }
};
