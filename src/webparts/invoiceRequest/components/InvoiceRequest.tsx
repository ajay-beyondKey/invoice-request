import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
} from "./store/invoice/invoiceActions";

import InvoiceForm from "./InvoiceForm";
import { RootState } from "./store/rootReducer";
import styles from "./InvoiceRequest.module.scss";
import InvoiceList from "./InvoiceList";
import { invoiceService } from "./services/invoiceService";
// @ts-ignore
import InvoiceImage from "../assets/companyLogo.png";

interface IInvoice {
    id?: number;
    invoiceNumber?: string;
    amount?: number;
    date?: string;
    description?: string;
    [key: string]: any;
}

const InvoiceRequest: React.FC = () => {
    const dispatch = useDispatch();
    const invoices = useSelector((state: RootState) => state.invoice.items);
    const loading = useSelector((state: RootState) => state.invoice.loading);
    const [editing, setEditing] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchInvoices() as any);
    }, [dispatch]);

    const handleAdd = (data: any) => {
        dispatch(addInvoice(data) as any);
    };

    const handleUpdate = (id: number, data: any) => {
        dispatch(updateInvoice(id, data) as any);
        setEditing(null);
    };

    const handleDelete = (id: number) => {
        if (confirm("Delete this invoice?")) {
            dispatch(deleteInvoice(id) as any);
        }
    };

    const handleEditClick = (item: any) => {
        setEditing(item);
        const el = document.getElementById("formWrapper");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleAddWithFile = async (data: IInvoice, file?: File) => {
        await invoiceService.createWithAttachment(data as any, file);
        dispatch(fetchInvoices() as any);
    };

    const handleUpdateWithFile = async (
        id: number,
        data: IInvoice,
        file?: File
    ) => {
        await invoiceService.updateWithAttachment(id, data as any, file);
        dispatch(fetchInvoices() as any);
    };

    const onCancel = () => {
        setEditing(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={styles.invoiceRequest}>
            <div className={styles.titleWrapper}>
                <img
                    className={styles.invoiceImage}
                    src={InvoiceImage}
                    alt="Invoice Icon"
                />
                <h2>Invoice request</h2>
                <h5>
                    Use the below form to submit an invoice creation request to
                    the Accounts team.
                </h5>
            </div>
            <InvoiceForm
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onAddWithFile={handleAddWithFile}
                onUpdateWithFile={handleUpdateWithFile}
                editingItem={editing}
                onCancel={onCancel}
            />
            <hr />
            {!loading ? (
                <div>Loading...</div>
            ) : (
                <InvoiceList
                    items={invoices}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default InvoiceRequest;
