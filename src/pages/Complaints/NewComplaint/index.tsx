import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useComplaint} from '../../../hooks/complaint';

import states from './states';

import {
  Container,
  ContentContainer,
  SectionContainer,
  Title,
  Description,
  FormContainer,
  SelectContainer,
  SelectLabel,
  Select,
  SelectError,
  NextStep,
  NextStepText,
} from './styles';

import {useDatabase} from '@nozbe/watermelondb/hooks';
import UnionsRepository from '../../../repositories/UnionsRepository';
import CompaniesRepository from '../../../repositories/CompaniesRepository';

const NewComplaint: React.FC = () => {
  const {
    dispatch,
    state: complaintState,
    handleCreateComplaint,
    handleUpdateComplaint,
  } = useComplaint();

  const navigation = useNavigation();
  const database = useDatabase();
  const [unions, setUnions] = useState<any>([]);
  const [companies, setCompanies] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [selectedState, setSelectedState] = useState<string>(
    complaintState.complaint.state || '',
  );
  const [selectedType, setSelectedType] = useState<string>(
    complaintState.complaint.type || '',
  );
  const [selectedCompany, setSelectedCompany] = useState<any>(
    complaintState.complaint.companyId || '',
  );
  const [selectedCity, setSelectedCity] = useState<any>(
    complaintState.complaint.cityId || '',
  );
  const [selectedSindycate, setSelectedSyndicate] = useState<any>(
    complaintState.complaint.syndicateId || '',
  );

  const companyRef = useRef<any>(null);

  const unionsRepository = useMemo(() => {
    return new UnionsRepository(database);
  }, []);

  const companiesRepository = useMemo(() => {
    return new CompaniesRepository(database);
  }, []);

  const createComplaint = useCallback(
    async values => {
      const {type, company, state, city, syndicate} = values;

      setLoading(true);

      if (complaintState.complaint.id) {
        const complaint = await handleUpdateComplaint({
          type,
          company,
          state,
          city,
          syndicate,
          id: complaintState.complaint.id,
        });
        navigation.navigate('ShowComplaint', {
          complaint_id: complaint.id,
          complaint_status: 'show-complaint',
        });
      } else {
        const complaint = await handleCreateComplaint({
          type,
          company,
          state,
          city,
          syndicate,
        });

        navigation.navigate('ShowComplaint', {
          complaint_id: complaint.id,
          complaint_status: 'new-complaint',
        });
      }
    },
    [complaintState, handleUpdateComplaint, handleCreateComplaint, setLoading],
  );

  const updateUnionsList = useCallback(async (state: string, type: string) => {
    const loadedUnions = await unionsRepository.getAll({state, type});
    setUnions(loadedUnions);
  }, []);

  const handleSelectedCompany = useCallback(async id => {
    setSelectedCompany(id);
    const loadedCities = await companiesRepository.getCities(id);
    setCities(loadedCities);
  }, []);

  useEffect(() => {
    async function loadData() {
      const loadedUnions = await unionsRepository.getAll();
      const loadedCompanies = await companiesRepository.getAll();

      setUnions(loadedUnions);
      setCompanies(loadedCompanies);
    }

    loadData();

    if (complaintState.complaint.id) {
      handleSelectedCompany(complaintState.complaint.companyId);
    }
  }, []);

  const validateComplaint = Yup.object().shape({
    state: Yup.string().required('* Campo obrigatório.'),
    type: Yup.string().required('* Campo obrigatório.'),
    company: Yup.string().uuid().required('* Campo obrigatório.'),
    city: Yup.string().uuid().required('* Campo obrigatório.'),
    syndicate: Yup.string().required('* Campo obrigatório.'),
  });

  return (
    <Container>
      <ContentContainer>
        <SectionContainer>
          <Title>Relatar problema</Title>
          <Description>
            Preencha os dados abaixo para iniciar a uma denúncia.
          </Description>

          <Formik
            initialValues={{
              state: complaintState.complaint.state
                ? complaintState.complaint.state
                : '',
              type: complaintState.complaint.type
                ? complaintState.complaint.type
                : '',
              company: complaintState.complaint.companyId
                ? complaintState.complaint.companyId
                : '',
              city: complaintState.complaint.cityId
                ? complaintState.complaint.cityId
                : '',
              syndicate: complaintState.complaint.syndicateId
                ? complaintState.complaint.syndicateId
                : '',
            }}
            onSubmit={values => createComplaint(values)}
            validationSchema={validateComplaint}>
            {({handleChange, handleSubmit, setFieldValue, errors, values}) => (
              <FormContainer>
                <SelectContainer>
                  <SelectLabel>Selecione um Estado</SelectLabel>
                  <Select
                    selectedValue={selectedState}
                    onValueChange={async (value: any) => {
                      handleChange('state');
                      setFieldValue('state', value);
                      setSelectedState(value);
                      await updateUnionsList(value, values.type);
                    }}>
                    <Picker.Item
                      label="Escolha um Estado"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    {states.map(state => (
                      <Picker.Item
                        label={state.label}
                        value={state.value}
                        key={state.value}
                      />
                    ))}
                  </Select>
                </SelectContainer>
                {errors.company && <SelectError>{errors.company}</SelectError>}

                <SelectContainer>
                  <SelectLabel>Selecione um tipo</SelectLabel>
                  <Select
                    selectedValue={selectedType}
                    onValueChange={async (value: any) => {
                      handleChange('type');
                      setSelectedType(value);
                      setFieldValue('type', value);
                      await updateUnionsList(values.state, value);
                    }}>
                    <Picker.Item
                      label="Escolha um tipo"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    <Picker.Item label="Rural" value="rural" key="1" />
                    <Picker.Item
                      label="Industrial"
                      value="industrial"
                      key="2"
                    />
                    <Picker.Item label="Comércio" value="market" key="3" />
                    <Picker.Item
                      label="Serviço Público"
                      value="public-service"
                      key="4"
                    />
                  </Select>
                </SelectContainer>
                {errors.company && <SelectError>{errors.company}</SelectError>}

                <SelectContainer>
                  <SelectLabel>Selecione uma empresa</SelectLabel>
                  <Select
                    ref={companyRef}
                    selectedValue={selectedCompany}
                    onValueChange={value => {
                      handleChange('company');
                      handleSelectedCompany(value);
                      setFieldValue('company', value);
                    }}>
                    <Picker.Item
                      label="Escolha uma empresa"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    {companies.map(({_raw: company}: {_raw: any}) => {
                      return (
                        <Picker.Item
                          label={company.nome_fantasia}
                          value={company.id}
                          key={company.id}
                        />
                      );
                    })}
                  </Select>
                </SelectContainer>
                {errors.company && <SelectError>{errors.company}</SelectError>}

                <SelectContainer>
                  <SelectLabel>Cidade da empresa</SelectLabel>
                  <Select
                    selectedValue={selectedCity}
                    onValueChange={value => {
                      setSelectedCity(value);
                      setFieldValue('city', value);
                    }}>
                    <Picker.Item
                      label="Selecione a cidade da empresa"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    {cities.map(({_raw: city}: {_raw: any}) => {
                      return (
                        <Picker.Item
                          label={city.name}
                          value={city.id}
                          key={city.id}
                        />
                      );
                    })}
                  </Select>
                </SelectContainer>
                {errors.city && <SelectError>{errors.city}</SelectError>}

                <SelectContainer>
                  <SelectLabel>Selecione o seu sindicato</SelectLabel>
                  <Select
                    selectedValue={selectedSindycate}
                    onValueChange={value => {
                      setSelectedSyndicate(value);
                      setFieldValue('syndicate', value);
                    }}>
                    <Picker.Item
                      label="Indique um sindicato para a denúncia"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    <Picker.Item label="Não sei meu sindicato" value="0" />
                    {unions.map(({_raw: syndicate}: any) => {
                      return (
                        <Picker.Item
                          label={syndicate.nome_fantasia}
                          value={syndicate.id}
                          key={syndicate.id}
                        />
                      );
                    })}
                  </Select>
                </SelectContainer>
                {errors.syndicate && (
                  <SelectError>{errors.syndicate}</SelectError>
                )}

                <NextStep onPress={() => handleSubmit()} enabled={!loading}>
                  {!loading ? (
                    <NextStepText>Próxima etapa</NextStepText>
                  ) : (
                    <ActivityIndicator size="small" color="#ffffff" />
                  )}
                </NextStep>
              </FormContainer>
            )}
          </Formik>
        </SectionContainer>
      </ContentContainer>
    </Container>
  );
};

export default NewComplaint;
