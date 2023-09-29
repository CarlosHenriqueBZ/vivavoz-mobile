import React, { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Loading from '../../../components/Loading';
import { useAuth } from '../../../hooks/auth';
import { format, isAfter, isBefore } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import api from '../../../services/api';

import {
  Container,
  TitleContainer,
  TitleText,
  InvoiceContainer,
  InvoiceData,
  InvoiceValue,
  InvoiceDueDate,
  InvoiceStatus,
  InvoiceStatusText,
  ButtonContainer,
  ButtonText,
  NoAvailableText
} from './styles';

interface IInvoice {
  id: string;
  order: number;
  worker_id: string;
  syndicate_id: string;
  is_paid: boolean;
  invoice_date: Date;
  due_date: Date;
  subscription_id: string;
  value: number;
}

const FinancialSection: React.FC = ()=>{
  const { worker } = useAuth();
  const navigation = useNavigation();

  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<IInvoice>();

  const parseValue = useCallback((value)=>{
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }, []);

  useEffect(()=>{
    let mounted = true;

    const loadData = async () => {
      try{
        const loadedInvoice = await api.get(`/financial/invoices/last-worker-invoice/${worker.id}`);
        if(mounted && loadedInvoice.status === 200){
            setInvoice(loadedInvoice.data);
            setLoading(false);
        }
      }catch(error){
        setShow(false);
      }
    };

    if(mounted && loading){
      loadData();
    }

    return ()=>{
      mounted = false;
    }
  }, []);

  return (
    <>
    {show && (
    <Container>
      {loading && <Loading />}
      {!loading && invoice && (
        <>
          <TitleContainer>
            <TitleText>Última contribuição</TitleText>
          </TitleContainer>
          <InvoiceContainer>
            <InvoiceData>
              <InvoiceValue>{parseValue(invoice.value)}</InvoiceValue>
              <InvoiceDueDate>Vencimento: {format(new Date(invoice.due_date), 'dd/MM/yyyy')}</InvoiceDueDate>
            </InvoiceData>
            {invoice.is_paid && (
              <InvoiceStatus>
                <Icon name="check-circle" color="#006633" size={24} />
                <InvoiceStatusText status="success">Pago</InvoiceStatusText>
              </InvoiceStatus>
            )}
            {(invoice.is_paid === false && isBefore(new Date(), new Date(invoice.due_date))) && (
              <InvoiceStatus>
                <Icon name="alert-circle" color="#ffcc00" size={24} />
                <InvoiceStatusText status="warning">A vencer</InvoiceStatusText>
              </InvoiceStatus>
            )}
            {(invoice.is_paid === false && isAfter(new Date(), new Date(invoice.due_date))) && (
              <InvoiceStatus>
                <Icon name="alert-triangle" color="#cc3300" size={24} />
                <InvoiceStatusText status="danger">Vencida</InvoiceStatusText>
              </InvoiceStatus>
            )}
          </InvoiceContainer>
          <ButtonContainer onPress={() => navigation.navigate('Invoices')}>
            <ButtonText>Ver histórico de contribuições</ButtonText>
          </ButtonContainer>
        </>
      )}
    </Container>
    )}
    </>
  );
};

export default FinancialSection;
