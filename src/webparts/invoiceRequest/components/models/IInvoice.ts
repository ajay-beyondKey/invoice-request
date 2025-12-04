export interface IInvoice {
    Id?: number;
    id?: number;
    Email?: string;
    CompanyName?: string;
    FirstName?: string;
    LastName?: string;
    StreetAddress?: string;
    StateRegion?: string;
    CountryRegion?: string;
    PostalCode?: string;
    PhoneNumber?: string;
    Product?: string;
    Price?: number;
    InvoiceDueDate?: string;
    InvoiceNumber?: string;
    InvoiceInstructions?: string;
    AttachmentFileName?: string;
    AttachmentUrl?: string;
    [key: string]: any;
}
