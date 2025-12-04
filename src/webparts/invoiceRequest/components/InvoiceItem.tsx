// src/webparts/invoiceRequest/components/InvoiceItem.tsx
import * as React from 'react';
import { IInvoice } from './models/IInvoice';
import styles from './InvoiceRequest.module.scss';

interface IProps {
  item: IInvoice;
  onEdit: () => void;
  onDelete: () => void;
}

const InvoiceItem: React.FC<IProps> = ({ item, onEdit, onDelete }) => {
  const title = item.CompanyName || `${item.FirstName || ''} ${item.LastName || ''}`.trim() || '—';
  const subtitle = item.Email || item.PhoneNumber || '';
  const price = item.Price ? `₹ ${item.Price}` : '';

  const initials = (() => {
    const name = (item.FirstName || item.CompanyName || item.Email || '').trim();
    if (!name) return 'I';
    return name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
  })();

  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.meta}>
          <div className={styles.title}>{title}</div>
          <div className={styles.sub}>{subtitle}</div>
        </div>
      </div>

      <div className={styles.cardRight}>
        <div className={styles.price}>{price}</div>
        <div className={styles.controls}>
          <button className={styles.edit} onClick={onEdit}>Edit</button>
          <button className={styles.delete} onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
