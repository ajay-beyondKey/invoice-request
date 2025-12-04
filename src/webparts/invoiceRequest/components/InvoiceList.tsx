// src/webparts/invoiceRequest/components/InvoiceList.tsx
import * as React from "react";
import InvoiceItem from "./InvoiceItem";
import { IInvoice } from "./models/IInvoice";
import styles from "./InvoiceRequest.module.scss";

interface IProps {
    items: IInvoice[];
    onEdit: (item: IInvoice) => void;
    onDelete: (id: number) => void;
}

// Dummy data for testing

const itemsDummy: IInvoice[] = [
    {
        Title: "Test Member",
        Email: "test@gmail.com",
        CompanyName: "Test Compony",
        FirstName: "Test",
        LastName: "Member",
        StreetAddress: "Test Street, Sample Pune",
        StateRegion: "Maharashtra",
        CountryRegion: "India",
        PostalCode: "411027",
        PhoneNumber: "9911223344",
        Product: "Another Product",
        Price: 50000,
        InvoiceDueDate: "2025-11-30",
        InvoiceNumber: "23142343",
        InvoiceInstructions: "Text sample invoice instruction",
    },
];

const InvoiceList: React.FC<IProps> = ({ items, onEdit, onDelete }) => {
    if (!items || items.length === 0) return <div>No invoices yet.</div>;

    return (
        <div className={styles.listWrap}>
            {itemsDummy.map((it) => (
                <InvoiceItem
                    key={it.Id}
                    item={it}
                    onEdit={() => onEdit(it)}
                    onDelete={() => onDelete(it.Id!)}
                />
            ))}
        </div>
    );
};

export default InvoiceList;
