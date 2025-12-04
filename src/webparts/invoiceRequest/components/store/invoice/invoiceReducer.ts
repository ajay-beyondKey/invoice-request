import {
    FETCH_INVOICES_REQUEST,
    FETCH_INVOICES_SUCCESS,
    FETCH_INVOICES_FAILURE,
    ADD_INVOICE_SUCCESS,
    UPDATE_INVOICE_SUCCESS,
    DELETE_INVOICE_SUCCESS,
} from "./invoiceTypes";
import { IInvoice } from "../../models/IInvoice";

type InvoiceState = {
    items: IInvoice[];
    loading: boolean;
    error: string | null;
};

const initialState: InvoiceState = {
    items: [],
    loading: false,
    error: null,
};

function normalizeInvoice(raw: any): IInvoice {
    const normalized: IInvoice = {
        ...raw,
        Id: raw.Id ?? raw.id ?? raw.ID ?? undefined,
        id:
            raw.Id ?? raw.id ?? raw.ID
                ? Number(raw.Id ?? raw.id ?? raw.ID)
                : undefined,

        InvoiceNumber:
            raw.InvoiceNumber ??
            raw.invoiceNumber ??
            raw.Invoice_No ??
            undefined,
        InvoiceNumberNormalized:
            raw.InvoiceNumber ?? raw.invoiceNumber ?? undefined,

        Price:
            raw.Price ?? raw.amount ?? raw.Amount ?? raw.PriceText ?? undefined,

        InvoiceDueDate:
            raw.InvoiceDueDate ??
            raw.invoiceDueDate ??
            raw.dueDate ??
            undefined,

        AttachmentUrl:
            raw.AttachmentUrl ??
            raw.attachmentUrl ??
            raw.FileRef ??
            raw.FileLeafRef ??
            undefined,
        AttachmentFileName: raw.AttachmentFileName ?? raw.FileName ?? undefined,

        CreatedAt: raw.CreatedAt ?? raw.createdAt ?? raw.created ?? undefined,
        UpdatedAt: raw.UpdatedAt ?? raw.updatedAt ?? raw.modified ?? undefined,
    } as IInvoice;

    return normalized;
}

export default function invoiceReducer(
    state = initialState,
    action: any
): InvoiceState {
    switch (action.type) {
        case FETCH_INVOICES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_INVOICES_SUCCESS:
            return {
                ...state,
                loading: false,
                items: (action.payload.items || []).map(normalizeInvoice),
            };
        case FETCH_INVOICES_FAILURE:
            return { ...state, loading: false, error: action.payload?.error };
        case ADD_INVOICE_SUCCESS:
            return {
                ...state,
                items: [normalizeInvoice(action.payload.item), ...state.items],
                loading: false,
                error: null,
            };
        case UPDATE_INVOICE_SUCCESS: {
            const updated = normalizeInvoice(action.payload.item);
            return {
                ...state,
                items: state.items.map((i) =>
                    (
                        i.id !== undefined && updated.id !== undefined
                            ? i.id === updated.id
                            : i.Id === updated.Id
                    )
                        ? { ...i, ...updated }
                        : i
                ),
                loading: false,
                error: null,
            };
        }
        case DELETE_INVOICE_SUCCESS: {
            const deletedId = action.payload.id ?? action.payload.Id;
            return {
                ...state,
                items: state.items.filter(
                    (i) =>
                        !(
                            (i.id !== undefined &&
                                deletedId !== undefined &&
                                i.id === Number(deletedId)) ||
                            (i.Id !== undefined &&
                                deletedId !== undefined &&
                                i.Id === deletedId)
                        )
                ),
                loading: false,
                error: null,
            };
        }
        default:
            return state;
    }
}
