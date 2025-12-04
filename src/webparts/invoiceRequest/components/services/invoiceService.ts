// src/webparts/invoiceRequest/components/services/invoiceService.ts
import { getSp } from "../utils/spSetup";
import { IInvoice } from "../models/IInvoice";

const LIST_NAME = "InvoiceRequests";

export const invoiceService = {
    async getAll(): Promise<IInvoice[]> {
        try {
            const sp = getSp();

            // Fetch all items from the SharePoint list
            const items = await sp.web.lists
                .getByTitle(LIST_NAME)
                .items.select(
                    "Id",
                    "Title",
                    "Email",
                    "CompanyName",
                    "FirstName",
                    "LastName",
                    "StreetAddress",
                    "StateRegion",
                    "CountryRegion",
                    "PostalCode",
                    "PhoneNumber",
                    "Product",
                    "Price",
                    "InvoiceDueDate",
                    "InvoiceNumber",
                    "InvoiceInstructions",
                    "Created",
                    "Modified",
                    "Attachments",
                    "AttachmentFiles"
                )
                .expand("AttachmentFiles")
                .orderBy("Created", false)(); // Order by creation date, descending

            // Map SharePoint items to IInvoice format
            const invoices: IInvoice[] = items.map((item: any) => ({
                Id: item.Id,
                id: item.Id,
                Email: item.Email,
                CompanyName: item.CompanyName,
                FirstName: item.FirstName,
                LastName: item.LastName,
                StreetAddress: item.StreetAddress,
                StateRegion: item.StateRegion,
                CountryRegion: item.CountryRegion,
                PostalCode: item.PostalCode,
                PhoneNumber: item.PhoneNumber,
                Product: item.Product,
                Price: item.Price,
                InvoiceDueDate: item.InvoiceDueDate,
                InvoiceNumber: item.InvoiceNumber,
                InvoiceInstructions: item.InvoiceInstructions,
                CreatedAt: item.Created,
                UpdatedAt: item.Modified,
                AttachmentUrl:
                    item.AttachmentFiles && item.AttachmentFiles.length > 0
                        ? item.AttachmentFiles[0].ServerRelativeUrl
                        : undefined,
                AttachmentFileName:
                    item.AttachmentFiles && item.AttachmentFiles.length > 0
                        ? item.AttachmentFiles[0].FileName
                        : undefined,
            }));

            return invoices;
        } catch (error) {
            console.error("Error fetching invoices:", error);
            throw error;
        }
    },

    async getById(id: number): Promise<IInvoice> {
        try {
            const sp = getSp();

            const item = await sp.web.lists
                .getByTitle(LIST_NAME)
                .items.getById(id)
                .select(
                    "Id",
                    "Title",
                    "Email",
                    "CompanyName",
                    "FirstName",
                    "LastName",
                    "StreetAddress",
                    "StateRegion",
                    "CountryRegion",
                    "PostalCode",
                    "PhoneNumber",
                    "Product",
                    "Price",
                    "InvoiceDueDate",
                    "InvoiceNumber",
                    "InvoiceInstructions",
                    "Created",
                    "Modified",
                    "Attachments",
                    "AttachmentFiles"
                )
                .expand("AttachmentFiles")();

            return {
                Id: item.Id,
                id: item.Id,
                Email: item.Email,
                CompanyName: item.CompanyName,
                FirstName: item.FirstName,
                LastName: item.LastName,
                StreetAddress: item.StreetAddress,
                StateRegion: item.StateRegion,
                CountryRegion: item.CountryRegion,
                PostalCode: item.PostalCode,
                PhoneNumber: item.PhoneNumber,
                Product: item.Product,
                Price: item.Price,
                InvoiceDueDate: item.InvoiceDueDate,
                InvoiceNumber: item.InvoiceNumber,
                InvoiceInstructions: item.InvoiceInstructions,
                CreatedAt: item.Created,
                UpdatedAt: item.Modified,
                AttachmentUrl:
                    item.AttachmentFiles && item.AttachmentFiles.length > 0
                        ? item.AttachmentFiles[0].ServerRelativeUrl
                        : undefined,
                AttachmentFileName:
                    item.AttachmentFiles && item.AttachmentFiles.length > 0
                        ? item.AttachmentFiles[0].FileName
                        : undefined,
            };
        } catch (error) {
            console.error(`Error fetching invoice with id ${id}:`, error);
            throw error;
        }
    },

    async createWithAttachment(invoice: IInvoice, file?: File) {
        const sp = getSp();
        const body = {
            Title: [invoice.FirstName, invoice.LastName]
                .filter(Boolean)
                .join(" "),
            Email: invoice.Email,
            CompanyName: invoice.CompanyName,
            FirstName: invoice.FirstName,
            LastName: invoice.LastName,
            StreetAddress: invoice.StreetAddress,
            StateRegion: invoice.StateRegion,
            CountryRegion: invoice.CountryRegion,
            PostalCode: invoice.PostalCode,
            PhoneNumber: invoice.PhoneNumber,
            Product: invoice.Product,
            Price: invoice.Price,
            InvoiceDueDate: invoice.InvoiceDueDate,
            InvoiceNumber: invoice.InvoiceNumber,
            InvoiceInstructions: invoice.InvoiceInstructions,
        };

        const addRes = await sp.web.lists.getByTitle(LIST_NAME).items.add(body);

        const createdId = addRes?.data?.Id || addRes?.data?.ID;

        if (file && createdId) {
            const arrayBuffer = await file.arrayBuffer();
            await sp.web.lists
                .getByTitle(LIST_NAME)
                .items.getById(createdId)
                .attachmentFiles.add(file.name, arrayBuffer);
        }

        // Fetch the complete created item to return
        return await this.getById(Number(createdId));
    },

    async updateWithAttachment(id: number, invoice: IInvoice, file?: File) {
        const sp = getSp();
        const body: any = {
            Title: [invoice.FirstName, invoice.LastName]
                .filter(Boolean)
                .join(" "),
            Email: invoice.Email,
            CompanyName: invoice.CompanyName,
            FirstName: invoice.FirstName,
            LastName: invoice.LastName,
            StreetAddress: invoice.StreetAddress,
            StateRegion: invoice.StateRegion,
            CountryRegion: invoice.CountryRegion,
            PostalCode: invoice.PostalCode,
            PhoneNumber: invoice.PhoneNumber,
            Product: invoice.Product,
            Price: invoice.Price,
            InvoiceDueDate: invoice.InvoiceDueDate,
            InvoiceNumber: invoice.InvoiceNumber,
            InvoiceInstructions: invoice.InvoiceInstructions,
        };

        await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).update(body);

        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            await sp.web.lists
                .getByTitle(LIST_NAME)
                .items.getById(id)
                .attachmentFiles.add(file.name, arrayBuffer);
        }

        return await this.getById(id);
    },

    async delete(id: number): Promise<void> {
        try {
            const sp = getSp();
            await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).delete();
        } catch (error) {
            console.error(`Error deleting invoice with id ${id}:`, error);
            throw error;
        }
    },

    async removeAllAttachments(id: number) {
        const sp = getSp();
        const files = await sp.web.lists
            .getByTitle(LIST_NAME)
            .items.getById(id)
            .attachmentFiles();

        if (files && files.length) {
            for (const f of files) {
                await sp.web.lists
                    .getByTitle(LIST_NAME)
                    .items.getById(id)
                    .attachmentFiles.getByName(f.FileName)
                    .delete();
            }
        }
    },
};
