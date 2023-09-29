import React, {useReducer, createContext, useContext, useCallback} from 'react';
import Complaint from '../data/models/Complaint';
import {v4 as uuid} from 'uuid';
import analytics from '@react-native-firebase/analytics';

import {useDatabase} from '@nozbe/watermelondb/hooks';
import ComplaintsRepository from '../repositories/ComplaintsRepository';
import MessagesRepository from '../repositories/MessagesRepository';
import {useSync} from './sync';

type ContextProviderData = {
  dispatch: React.Dispatch<Action>;
  state: State;
  handleCreateComplaint: (data: any) => Promise<any>;
  handleCreateCovidComplaint: (data: any) => Promise<any>;
  handleUpdateComplaint: (data: any) => Promise<any>;
  handleUpdateCovidComplaint: (data: any) => Promise<any>;
  handleCreateFirstMessage: (id: string) => Promise<any>;
  complaint: Partial<Complaint>;
};

const initialState = {
  complaint: {} as Complaint,
};

type State = {
  complaint: Partial<Complaint>;
};

type ActionTypes = 'SET_COMPLAINT' | 'CLEAR_STATE';

type Action = {type: ActionTypes; payload?: any};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_COMPLAINT':
      return {...state, complaint: action.payload};
    case 'CLEAR_STATE':
      return initialState;
    default:
      throw new Error();
  }
}

const ComplaintContext = createContext<ContextProviderData>(
  {} as ContextProviderData,
);
const ComplaintProvider: React.FC = ({children}) => {
  const {syncData} = useSync();
  const database = useDatabase();
  const complaintsRepository = new ComplaintsRepository(database);
  const messagesRepository = new MessagesRepository(database);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCreateComplaint = useCallback(async (data: any) => {
    const {type, company, state, city, syndicate} = data;
    const id = uuid();

    const {_raw} = await complaintsRepository.create({
      id,
      status: 1,
      state,
      type,
      company,
      city,
      syndicate,
    });

    const createdComplaint = await complaintsRepository.findById(_raw.id);

    dispatch({type: 'SET_COMPLAINT', payload: createdComplaint});

    await syncData();

    await analytics().logEvent('NewComplaint');

    return createdComplaint;
  }, []);

  const handleCreateCovidComplaint = useCallback(async (data: any) => {
    const {
      type,
      company,
      state,
      city,
      syndicate,
      gotCovid,
      gotCovidMore,
      whereGotCovid,
      howManyGotCovid,
      covidRisk,
      worker,
    } = data;
    const id = uuid();

    const {_raw} = await complaintsRepository.create({
      id,
      status: 1,
      state,
      type,
      company,
      city,
      syndicate,
      gotCovid,
      gotCovidMore,
      whereGotCovid,
      howManyGotCovid,
      covidRisk,
      iscovid: true,
      worker: worker,
    });

    const createdComplaint = await complaintsRepository.findById(_raw.id);

    dispatch({type: 'SET_COMPLAINT', payload: createdComplaint});

    await syncData();

    await analytics().logEvent('NewCovidComplaint');

    return createdComplaint;
  }, []);

  const handleUpdateComplaint = useCallback(async (data: any) => {
    const {city, company, state, syndicate, type, id} = data;
    const {_raw} = await complaintsRepository.update({
      id,
      cityId: city,
      companyId: company,
      state,
      syndicateId: syndicate,
      type,
    });
    const updatedComplaint = await complaintsRepository.findById(_raw.id);
    dispatch({type: 'SET_COMPLAINT', payload: updatedComplaint});
    return updatedComplaint;
  }, []);

  const handleUpdateCovidComplaint = useCallback(async (data: any) => {
    const {
      id,
      type,
      company,
      state,
      city,
      syndicate,
      gotCovid,
      gotCovidMore,
      whereGotCovid,
      howManyGotCovid,
      covidRisk,
      worker,
    } = data;
    const {_raw} = await complaintsRepository.update({
      id,
      cityId: city,
      companyId: company,
      state,
      syndicateId: syndicate,
      type,
      gotCovid,
      gotCovidMore,
      whereGotCovid,
      howManyGotCovid,
      covidRisk,
      isCovid: true,
      workerId: worker,
    });
    const updatedComplaint = await complaintsRepository.findById(_raw.id);
    dispatch({type: 'SET_COMPLAINT', payload: updatedComplaint});
    return updatedComplaint;
  }, []);

  const handleCreateFirstMessage = useCallback(
    async (id: string) => {
      try {
        const complaint = await complaintsRepository.findById(id);

        const message = await messagesRepository.createMessage({
          keyFromMe: 'incoming',
          status: 1,
          needPush: 0,
          messageType: 'text',
          data: 'Olá, aqui você pode escrever, gravar mensagem e anexar fotos para relatar problemas presentes no seu local de trabalho! É seguro, anônimo e confiável! Sua voz será criptografada e modificada no destino final para sua proteção.',
          complaint: complaint,
        });

        return message;
      } catch (error) {
        console.error('Não foi possível criar a primeira mensagem');
        console.error(error);
      }
    },
    [state.complaint],
  );

  return (
    <ComplaintContext.Provider
      value={{
        complaint: state.complaint,
        dispatch,
        state,
        handleCreateComplaint,
        handleCreateCovidComplaint,
        handleUpdateComplaint,
        handleUpdateCovidComplaint,
        handleCreateFirstMessage,
      }}>
      {children}
    </ComplaintContext.Provider>
  );
};

function useComplaint(): ContextProviderData {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('Complaint context must be used with a ComplaintProvider');
  }
  return context;
}

export {ComplaintProvider, useComplaint};
