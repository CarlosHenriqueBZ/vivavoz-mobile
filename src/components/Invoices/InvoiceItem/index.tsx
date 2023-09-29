import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { getDate, format, getMonth, isAfter, isBefore } from 'date-fns';

import {
  InvoiceContainer,
  InvoiceData,
  InvoiceDateText,
  InvoiceStatusText,
  InvoiceInfoContainer,
  InvoiceValue,
  InvoiceValueText
} from './styles';

interface IInvoice {
  id: string;
  order: number;
  value: number;
  is_paid: boolean;
  invoice_date: Date;
  due_date: Date;
}

interface IProps {
  invoice: IInvoice;
}

const InvoiceItem: React.FC<IProps> = ({ invoice })=>{

  const parseValue = useCallback((value)=>{
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }, []);

  const parseInvoiceDate = useCallback((date: Date)=>{
    let month;
    switch(getMonth(date)){
      case 0:
        month = 'JAN';
        break;
      case 1:
        month = 'FEV';
        break;
      case 2:
        month = 'MAR';
        break;
      case 3:
        month = 'ABR';
        break;
      case 4:
        month = 'MAI';
        break;
      case 5:
        month = 'JUN';
        break;
      case 6:
        month = 'JUL';
        break;
      case 7:
        month = 'AGO';
        break;
      case 8:
        month = 'SET';
        break;
      case 9:
        month = 'OUT';
        break;
      case 10:
        month = 'NOV';
        break;
      case 11:
        month = 'DEZ';
        break;
      default:
        month = 'JAN';
    }

    return `${month} (${format(new Date(date), 'dd/MM/yyyy')})`;
  }, []);
  return (
    <InvoiceContainer>
      {invoice.is_paid && (
        <InvoiceData>
          <Icon name="check-circle" size={24} color="#006633" />
          <InvoiceInfoContainer>
            <InvoiceDateText>{parseInvoiceDate(new Date(invoice.invoice_date))}</InvoiceDateText>
            <InvoiceStatusText status="success">Pago</InvoiceStatusText>
          </InvoiceInfoContainer>
        </InvoiceData>
      )}
      {(invoice.is_paid === false && isBefore(new Date(), new Date(invoice.due_date))) && (
        <InvoiceData>
          <Icon name="alert-circle" color="#ffcc00" size={24} />
          <InvoiceInfoContainer>
          <InvoiceDateText>{parseInvoiceDate(new Date(invoice.invoice_date))}</InvoiceDateText>
            <InvoiceStatusText status="warning">A vencer</InvoiceStatusText>
          </InvoiceInfoContainer>
        </InvoiceData>
      )}
      {(invoice.is_paid === false && isAfter(new Date(), new Date(invoice.due_date))) && (
        <InvoiceData>
          <Icon name="alert-triangle" color="#cc3300" size={24} />
          <InvoiceInfoContainer>
          <InvoiceDateText>{parseInvoiceDate(new Date(invoice.invoice_date))}</InvoiceDateText>
            <InvoiceStatusText status="danger">Vencido</InvoiceStatusText>
          </InvoiceInfoContainer>
        </InvoiceData>
      )}
      <InvoiceValue>
        <InvoiceValueText>{parseValue(invoice.value)}</InvoiceValueText>
      </InvoiceValue>
    </InvoiceContainer>
  );
};

export default InvoiceItem;
