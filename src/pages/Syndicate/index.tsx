import React, {useState, useEffect} from 'react';
import InnerPages from '../../components/InnerPages';

import {useAuth} from '../../hooks/auth';

import IsSyndicateApprovedFalse from './IsSyndicateApprovedFalse';
import IsSyndicateApprovedWaiting from './IsSyndicateApprovedWaiting';
import IsSyndicateApprovedTrue from './IsSyndicateApprovedTrue';

import {
  Container,
  PageContent,
} from './styles';

const Syndicate: React.FC = ()=>{
  const {worker, updateWorker} = useAuth();

  const [loadingData, setLoadingData] = useState(true);

  useEffect(()=>{
    const loadData = async ()=>{
      setLoadingData(false);
    }

    if(!worker.state && loadingData){
      loadData();
    }

  }, []);

  return(
    <InnerPages name="Sindicato">
      <Container>
        {worker.is_syndicate_approved === null && (
          <PageContent>
            <IsSyndicateApprovedFalse worker={worker} handleLoading={setLoadingData} handleWorker={updateWorker} />
          </PageContent>
        )}
        {worker.is_syndicate_approved === false && <IsSyndicateApprovedWaiting worker={worker} />}
        {worker.is_syndicate_approved === true && <IsSyndicateApprovedTrue worker={worker} />}
      </Container>
    </InnerPages>
  )
}

export default Syndicate;
