import React, {useEffect, useState, useMemo} from 'react';
import ComplaintsRepository from '../../../repositories/ComplaintsRepository';

import {Container, ListContainer, ComplaintContainer} from './styles';

import SyncIndicator from '../../../components/SyncIndicator';

import ComplaintItem from '../../../components/ComplaintChat/ComplaintItem';
import {database} from '../../../data/database';
import withObservables from '@nozbe/with-observables';
import Complaint from '../../../data/models/Complaint';
import {Q} from '@nozbe/watermelondb';

import SearchComplaint from '../../../components/SearchComplaint';
import {sync} from '../../../services/sync';

const ComplaintsList: React.FC = () => {
  const complaintsRepository = useMemo(
    () => new ComplaintsRepository(database),
    [],
  );

  const [complaintsList, setComplaintsList] = useState<any>([]);

  useEffect(() => {
    const loadData = async () => {
      const complaints = await complaintsRepository.getAllComplaints();
      setComplaintsList(complaints.reverse());

      await sync();
    };

    loadData();
  }, []);

  return (
    <Container>
      {/* <SyncIndicator /> */}
      <ListContainer>
        <SearchComplaint />
        <ComplaintContainer
          data={complaintsList}
          keyExtractor={(item: any) => item._raw.id}
          renderItem={({item}: any) => <ComplaintItem complaint={item} />}
        />
      </ListContainer>
    </Container>
  );
};

export default ComplaintsList;
