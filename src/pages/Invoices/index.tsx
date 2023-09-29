import React, { useEffect, useCallback, useState } from 'react';
import InnerPages from '../../components/InnerPages';
import Icon from 'react-native-vector-icons/Feather';
import Loading from '../../components/Loading';
import { useAuth } from '../../hooks/auth';
import { getDate, format, getMonth, isAfter, isBefore } from 'date-fns';
import { FlatList } from 'react-native';
import InvoiceItem from '../../components/Invoices/InvoiceItem';

import api from '../../services/api';

import {
  Container,
  PageContent,
  SubscriptionsInfoContainer,
  SubscriptionText,
  SubscriptionDate,
} from './styles';

interface ISubscription {
  id: string;
  invoice_date: Date;
}

interface IInvoice {
  id: string;
  order: number;
  value: number;
  is_paid: boolean;
  invoice_date: Date;
  due_date: Date;
}

const Invoices: React.FC = () => {
  const { worker } = useAuth();

  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>();
  const [invoices, setInvoices] = useState<IInvoice[]>();

  useEffect(()=>{
    let mounted = true;

    const loadData = async () => {
      const loadedSubscriptions = await api.get('/financial/invoices', { params: { worker_id: worker.id, showAll: true } });
      const loadedInvoices = await api.get('/financial/invoices', { params: { worker_id: worker.id, showAll: true} })
      if(mounted){
        setSubscriptions(loadedSubscriptions.data);
        setInvoices(loadedInvoices.data);
        setLoading(false);
      }
    };

    if(mounted){
      loadData();
    }

    return () => {
      mounted = false;
    }
  }, []);

  return (
    <InnerPages name="Contribuições">
      <Container>
        <PageContent>
          {loading && <Loading />}
          {(!loading && subscriptions) && (
            <>
              {subscriptions.map((subscription)=>(
                <SubscriptionsInfoContainer key={subscription.id}>
                  <SubscriptionText>Data de pagamento</SubscriptionText>
                  <SubscriptionDate>{getDate(new Date(subscription.invoice_date))}</SubscriptionDate>
                </SubscriptionsInfoContainer>
              ))}

              <FlatList
                data={invoices}
                keyExtractor={(invoice) => invoice.id}
                renderItem={({ item }) => <InvoiceItem invoice={item} />}
              />
            </>
          )}
        </PageContent>
      </Container>
    </InnerPages>
  );
};

export default Invoices;
