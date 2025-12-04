// src/webparts/invoiceRequest/components/InvoiceForm.tsx
import * as React from "react";
import { useEffect, useState } from "react";
import { IInvoice } from "./models/IInvoice";
import styles from "./InvoiceRequest.module.scss";

interface IProps {
    onAdd: (data: IInvoice) => void;
    onUpdate: (id: number, data: IInvoice) => void;
    onAddWithFile: (data: IInvoice, file?: File) => Promise<void>;
    onUpdateWithFile: (
        id: number,
        data: IInvoice,
        file?: File
    ) => Promise<void>;
    editingItem?: IInvoice | null;
    onCancel?: () => void;
}

const empty: IInvoice = {
    Email: "",
    CompanyName: "",
    FirstName: "",
    LastName: "",
    StreetAddress: "",
    StateRegion: "",
    CountryRegion: "",
    PostalCode: "",
    PhoneNumber: "",
    Product: "Employee Directory",
    Price: 0,
    InvoiceDueDate: "",
    InvoiceNumber: "",
    InvoiceInstructions: "",
};

const InvoiceForm: React.FC<IProps> = ({
    onAdd,
    onUpdate,
    onAddWithFile,
    onUpdateWithFile,
    editingItem,
    onCancel,
}) => {
    const [form, setForm] = useState<IInvoice>(empty);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (editingItem) setForm(editingItem);
        else setForm(empty);
        setFile(undefined);
    }, [editingItem]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f =
            e.target.files && e.target.files.length
                ? e.target.files[0]
                : undefined;
        setFile(f);
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("form =>", form);
        console.log("file =>", file);

        try {
            setUploading(true);
            if (editingItem && editingItem.Id) {
                if (onUpdateWithFile) {
                    await onUpdateWithFile(editingItem.Id, form, file);
                } else {
                    onUpdate(editingItem.Id, form);
                    if (file)
                        console.warn(
                            "File provided but onUpdateWithFile handler not supplied."
                        );
                }
                if (onCancel) onCancel();
            } else {
                if (onAddWithFile) {
                    await onAddWithFile(form, file);
                } else {
                    onAdd(form);
                    if (file)
                        console.warn(
                            "File provided but onAddWithFile handler not supplied."
                        );
                }
                setForm(empty);
                setFile(undefined);
            }
        } finally {
            setUploading(false);
        }
    };

    const removeFile = () => setFile(undefined);

    return (
        <div id="formWrapper" className={styles.formWrap}>
            <form className={styles.grid} onSubmit={submit}>
                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Email</span>
                    <input
                        name="Email"
                        type="email"
                        value={form.Email || ""}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Company name</span>
                    <input
                        name="CompanyName"
                        type="text"
                        value={form.CompanyName || ""}
                        onChange={handleChange}
                    />
                </label>

                <div className={styles.colSpan2}>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>First name</span>
                        <input
                            name="FirstName"
                            type="text"
                            value={form.FirstName || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>Last name</span>
                        <input
                            name="LastName"
                            type="text"
                            value={form.LastName || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className={styles.colSpan3}>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>
                            Street address
                        </span>
                        <input
                            name="StreetAddress"
                            type="text"
                            value={form.StreetAddress || ""}
                            onChange={handleChange}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>
                            State / Region
                        </span>
                        <input
                            name="StateRegion"
                            type="text"
                            value={form.StateRegion || ""}
                            onChange={handleChange}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>
                            Country / Region
                        </span>
                        <input
                            name="CountryRegion"
                            type="text"
                            value={form.CountryRegion || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Postal code</span>
                    <input
                        name="PostalCode"
                        type="text"
                        value={form.PostalCode || ""}
                        onChange={handleChange}
                    />
                </label>
                <label className={styles.field}>
                    <span className={styles.fieldLabel}>Phone number</span>
                    <input
                        name="PhoneNumber"
                        type="tel"
                        value={form.PhoneNumber || ""}
                        onChange={handleChange}
                    />
                </label>

                <div className={styles.colSpan3}>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>Product</span>
                        <select
                            name="Product"
                            value={form.Product}
                            onChange={handleChange}
                        >
                            <option>Employee Directory</option>
                            <option>Another Product</option>
                        </select>
                    </label>

                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>Price</span>
                        <input
                            name="Price"
                            type="text"
                            value={form.Price || ""}
                            onChange={handleChange}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>
                            Invoice due date
                        </span>
                        <input
                            name="InvoiceDueDate"
                            type="date"
                            value={form.InvoiceDueDate?.slice?.(0, 10) || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <label className={`${styles.field}`}>
                    <span className={styles.fieldLabel}>Invoice number</span>
                    <input
                        name="InvoiceNumber"
                        type="text"
                        value={form.InvoiceNumber || ""}
                        onChange={handleChange}
                    />
                </label>

                <label className={`${styles.field}`}>
                    <span className={styles.fieldLabel}>
                        Purchase order (attachment)
                    </span>
                    <input
                        type="file"
                        name="purchaseOrder"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    {file && (
                        <div
                            style={{
                                marginTop: 8,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            <div style={{ fontSize: 13, color: "#333" }}>
                                {file.name}
                            </div>
                            <button
                                type="button"
                                className={styles.secondary}
                                onClick={removeFile}
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </label>

                <label className={`${styles.field} ${styles.full}`}>
                    <span className={styles.fieldLabel}>
                        Invoice Instructions
                    </span>
                    <textarea
                        name="InvoiceInstructions"
                        value={form.InvoiceInstructions || ""}
                        onChange={handleChange}
                    />
                </label>

                <div className={`${styles.actions}  ${styles.full}`}>
                    <button
                        type="submit"
                        className={styles.primary}
                        disabled={uploading}
                    >
                        {uploading
                            ? "Saving..."
                            : editingItem
                            ? "Update"
                            : "Submit"}
                    </button>
                    {editingItem && (
                        <button
                            type="button"
                            className={styles.secondary}
                            onClick={() => onCancel && onCancel()}
                        >
                            Cancel
                        </button>
                    )}
                    {!editingItem && (
                        <button
                            type="button"
                            className={styles.secondary}
                            onClick={() => {
                                setForm(empty);
                                setFile(undefined);
                            }}
                        >
                            Reset
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default InvoiceForm;
