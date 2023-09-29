import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {FieldArray, Formik} from 'formik';
import * as Yup from 'yup';
import analytics from '@react-native-firebase/analytics';

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
  Label,
  ContainerView,
  RadioCustom,
  RadioCustomChecked,
  RadioView,
  RadioLabel,
  CheckBoxView,
  CheckBoxCustom,
  CheckBoxCustomChecked,
  CheckBoxLabel,
  PageDots,
  PageDotsView,
  PageDotsCheck,
  ContainerFlex,
} from './styles';

import {useDatabase} from '@nozbe/watermelondb/hooks';
import ComplaintsRepository from '../../../repositories/ComplaintsRepository';
import UnionsRepository from '../../../repositories/UnionsRepository';
import CompaniesRepository from '../../../repositories/CompaniesRepository';
import {Colors, IconButton, RadioButton, Text} from 'react-native-paper';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import covid_risks from './covid_risks';
import {useAuth} from '../../../hooks/auth';
import {useComplaint} from '../../../hooks/complaint';

const NewCovidComplaint: React.FC = () => {
  const {worker} = useAuth();
  const {
    dispatch,
    state: complaintState,
    handleCreateCovidComplaint,
    handleUpdateCovidComplaint,
  } = useComplaint();

  const navigation = useNavigation();
  const database = useDatabase();
  const [unions, setUnions] = useState<any>([]);
  const [companies, setCompanies] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [page, setPage] = useState<any>(1);
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

  const [gotCovid, setGotCovid] = useState<string>('');
  const [gotCovidMore, setGotCovidMore] = useState<string>('');
  const [whereGotCovid, setWhereGotCovid] = useState<any[]>([]);
  const [howManyGotCovid, setHowManyGotCovid] = useState<any>('');
  const [covidRisk, setCovidRisk] = useState<any[]>([]);

  const [title, setTitle] = useState<string>('Relatar problema');
  const [description, setDescription] = useState<string>(
    'Preencha os dados abaixo para relatar um problema no seu local de trabalho',
  );

  const whereGotCovidArray = [
    {label: 'Na empresa onde trabalho', value: 1},
    {label: 'Através de alguém da família', value: 2},
    {label: 'No transporte público ou da empresa', value: 3},
    {label: 'Não sei', value: 4},
  ];

  const covidRiskArray = covid_risks;

  const unionsRepository = useMemo(() => {
    return new UnionsRepository(database);
  }, []);

  const companiesRepository = useMemo(() => {
    return new CompaniesRepository(database);
  }, []);

  const createComplaint = useCallback(
    async values => {
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
      } = values;

      setLoading(true);

      if (complaintState.complaint.id) {
        const complaint = await handleUpdateCovidComplaint({
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
          worker: worker ? worker.id : undefined,
        });
        navigation.navigate('ShowComplaint', {
          complaint_id: complaint.id,
          complaint_status: 'show-complaint',
        });
      } else {
        const complaint = await handleCreateCovidComplaint({
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
          worker: worker ? worker.id : undefined,
        });

        navigation.navigate('ShowComplaint', {
          complaint_id: complaint.id,
          complaint_status: 'new-complaint',
        });
      }
    },
    [
      complaintState,
      handleUpdateCovidComplaint,
      handleUpdateCovidComplaint,
      setLoading,
    ],
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
      setPage(1);
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
    gotCovid: Yup.string().required('* Campo obrigatório.'),
    gotCovidMore: Yup.string().required('* Campo obrigatório.'),
    whereGotCovid: Yup.array().min(1, '* Escolha pelo menos uma opção'),
    howManyGotCovid: Yup.string().required('* Campo obrigatório.'),
    covidRisk: Yup.array().min(1, '* Escolha pelo menos uma opção'),
  });

  const scrollViewRef = useRef();
  const scrollRef = useRef<ScrollView>();
  const onFabPress = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  return (
    <Container>
      <ContentContainer ref={scrollRef}>
        <SectionContainer>
          <ContainerFlex>
            {page > 1 && (
              <IconButton
                icon="arrow-left"
                size={26}
                color={Colors.green900}
                onPress={() => (page > 1 ? setPage(page - 1) : '')}
              />
            )}

            <PageDotsView>
              <PageDots>{page === 1 && <PageDotsCheck />}</PageDots>
              <PageDots>{page === 2 && <PageDotsCheck />}</PageDots>
              <PageDots>{page === 3 && <PageDotsCheck />}</PageDots>
            </PageDotsView>
          </ContainerFlex>

          <Title>{title}</Title>
          <Description>{description}</Description>
          <Formik
            initialValues={{
              state: '',
              type: '',
              company: '',
              city: '',
              syndicate: '',
              gotCovid: '',
              gotCovidMore: '',
              whereGotCovid: [],
              howManyGotCovid: '',
              covidRisk: [],
            }}
            onSubmit={values => createComplaint(values)}
            validationSchema={validateComplaint}>
            {({handleChange, handleSubmit, setFieldValue, errors, values}) =>
              page == 1 ? (
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
                  {errors.company && (
                    <SelectError>{errors.company}</SelectError>
                  )}

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
                  {errors.company && (
                    <SelectError>{errors.company}</SelectError>
                  )}

                  <SelectContainer>
                    <SelectLabel>Selecione uma empresa</SelectLabel>
                    <Select
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
                  {errors.company && (
                    <SelectError>{errors.company}</SelectError>
                  )}

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
                      {/* <Picker.Item
                        label="Não sei meu sindicato"
                        value="duh181b2lg4g12g87bv12vc"
                      /> */}
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

                  <NextStep
                    onPress={() => {
                      if (
                        !errors.state &&
                        !errors.type &&
                        !errors.company &&
                        !errors.city &&
                        !errors.syndicate
                      ) {
                        setTitle('Pesquisa sobre adoecimento');
                        setDescription('');
                        setPage(2);
                        onFabPress();
                      }
                    }}>
                    <NextStepText>Próxima etapa</NextStepText>
                  </NextStep>
                </FormContainer>
              ) : page == 2 ? (
                <FormContainer>
                  <ContainerView>
                    <Label>Você já teve covid?</Label>

                    <RadioView>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('gotCovid');
                          setFieldValue('gotCovid', 'sim');
                        }}>
                        <RadioCustom>
                          {values.gotCovid == 'sim' && <RadioCustomChecked />}
                        </RadioCustom>
                      </TouchableOpacity>
                      <RadioLabel>Sim</RadioLabel>
                    </RadioView>

                    <RadioView>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('gotCovid');
                          setFieldValue('gotCovid', 'nao');
                        }}>
                        <RadioCustom>
                          {values.gotCovid == 'nao' && <RadioCustomChecked />}
                        </RadioCustom>
                      </TouchableOpacity>
                      <RadioLabel>Não</RadioLabel>
                    </RadioView>
                    <RadioView>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('gotCovid');
                          setFieldValue('gotCovid', 'talvez');
                        }}>
                        <RadioCustom>
                          {values.gotCovid == 'talvez' && (
                            <RadioCustomChecked />
                          )}
                        </RadioCustom>
                      </TouchableOpacity>
                      <RadioLabel>
                        Não sei, mas adoeci com sintomas de covid
                      </RadioLabel>
                    </RadioView>
                  </ContainerView>
                  {errors.gotCovid && (
                    <SelectError>{errors.gotCovid}</SelectError>
                  )}

                  <ContainerView>
                    <Label>Você já teve covid mais de uma vez?</Label>

                    <RadioView>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('gotCovidMore');
                          setFieldValue('gotCovidMore', 'sim');
                        }}>
                        <RadioCustom>
                          {values.gotCovidMore == 'sim' && (
                            <RadioCustomChecked />
                          )}
                        </RadioCustom>
                      </TouchableOpacity>
                      <RadioLabel>Sim</RadioLabel>
                    </RadioView>

                    <RadioView>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('gotCovidMore');
                          setFieldValue('gotCovidMore', 'nao');
                        }}>
                        <RadioCustom>
                          {values.gotCovidMore == 'nao' && (
                            <RadioCustomChecked />
                          )}
                        </RadioCustom>
                      </TouchableOpacity>
                      <RadioLabel>Não</RadioLabel>
                    </RadioView>
                    <RadioView>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('gotCovidMore');
                          setFieldValue('gotCovidMore', 'talvez');
                        }}>
                        <RadioCustom>
                          {values.gotCovidMore == 'talvez' && (
                            <RadioCustomChecked />
                          )}
                        </RadioCustom>
                      </TouchableOpacity>
                      <RadioLabel>
                        Não sei, mas adoeci com sintomas de covid
                      </RadioLabel>
                    </RadioView>
                  </ContainerView>
                  {errors.gotCovidMore && (
                    <SelectError>{errors.gotCovidMore}</SelectError>
                  )}

                  <ContainerView>
                    <Label>Onde acha que se contaminou?</Label>
                    {whereGotCovidArray.length > 0 &&
                      whereGotCovidArray.map((where, index) => (
                        <FieldArray key={index} name="whereGotCovid">
                          {({insert, remove, push}) => (
                            <CheckBoxView>
                              <TouchableOpacity
                                onPress={() => {
                                  const index = (
                                    values.whereGotCovid as number[]
                                  ).indexOf(where.value);

                                  if (index > -1) {
                                    remove(index);
                                  } else {
                                    push(where.value);
                                  }
                                  handleChange('whereGotCovid');
                                }}>
                                <CheckBoxCustom>
                                  {values.whereGotCovid.find(
                                    it => it === where.value,
                                  ) && <CheckBoxCustomChecked />}
                                </CheckBoxCustom>
                              </TouchableOpacity>
                              <CheckBoxLabel>{where.label}</CheckBoxLabel>
                            </CheckBoxView>
                          )}
                        </FieldArray>
                      ))}
                    {/* <Text> {values.whereGotCovid}</Text> */}
                  </ContainerView>
                  {errors.whereGotCovid && (
                    <SelectError>{errors.whereGotCovid}</SelectError>
                  )}

                  <ContainerView>
                    <Label>
                      Quantos colegas de trabalho você teve noticias que
                      adoeceram de covid?
                    </Label>

                    <RadioView>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('howManyGotCovid');
                          setFieldValue('howManyGotCovid', 'nenhum');
                        }}>
                        <RadioCustom>
                          {values.howManyGotCovid == 'nenhum' && (
                            <RadioCustomChecked />
                          )}
                        </RadioCustom>
                      </TouchableOpacity>
                      <RadioLabel>Nenhum colega</RadioLabel>
                    </RadioView>

                    <RadioView>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('howManyGotCovid');
                          setFieldValue('howManyGotCovid', '1-10');
                        }}>
                        <RadioCustom>
                          {values.howManyGotCovid == '1-10' && (
                            <RadioCustomChecked />
                          )}
                        </RadioCustom>
                      </TouchableOpacity>
                      <RadioLabel>De 1 a 10 colegas</RadioLabel>
                    </RadioView>
                    <RadioView>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('howManyGotCovid');
                          setFieldValue('howManyGotCovid', '10-50');
                        }}>
                        <RadioCustom>
                          {values.howManyGotCovid == '10-50' && (
                            <RadioCustomChecked />
                          )}
                        </RadioCustom>
                      </TouchableOpacity>
                      <RadioLabel>De 10 a 50 colegas</RadioLabel>
                    </RadioView>
                    <RadioView>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('howManyGotCovid');
                          setFieldValue('howManyGotCovid', '50+');
                        }}>
                        <RadioCustom>
                          {values.howManyGotCovid == '50+' && (
                            <RadioCustomChecked />
                          )}
                        </RadioCustom>
                      </TouchableOpacity>
                      <RadioLabel>Acima de 50 colegas</RadioLabel>
                    </RadioView>
                  </ContainerView>
                  {errors.howManyGotCovid && (
                    <SelectError>{errors.howManyGotCovid}</SelectError>
                  )}

                  <NextStep
                    onPress={() => {
                      if (
                        !errors.gotCovid &&
                        !errors.gotCovidMore &&
                        !errors.whereGotCovid &&
                        !errors.howManyGotCovid
                      ) {
                        setTitle(
                          'Que risco de contaminação existe na empresa onde trabalha?',
                        );
                        setDescription('');
                        setPage(3);
                        onFabPress();
                      }
                    }}>
                    <NextStepText>Próxima etapa</NextStepText>
                  </NextStep>
                </FormContainer>
              ) : page == 3 ? (
                <FormContainer>
                  <ContainerView>
                    {covidRiskArray.length > 0 &&
                      covidRiskArray.map((risk, index) => (
                        <FieldArray key={index} name="covidRisk">
                          {({insert, remove, push}) => (
                            <CheckBoxView>
                              <TouchableOpacity
                                onPress={() => {
                                  const index = (
                                    values.covidRisk as number[]
                                  ).indexOf(risk.value);

                                  if (index > -1) {
                                    remove(index);
                                  } else {
                                    push(risk.value);
                                  }
                                  handleChange('covidRisk');
                                }}>
                                <CheckBoxCustom>
                                  {values.covidRisk.find(
                                    it => it === risk.value,
                                  ) && <CheckBoxCustomChecked />}
                                </CheckBoxCustom>
                              </TouchableOpacity>
                              <CheckBoxLabel>{risk.label}</CheckBoxLabel>
                            </CheckBoxView>
                          )}
                        </FieldArray>
                      ))}
                    {/* <Text> {values.covidRisk}</Text> */}
                    {errors.covidRisk && (
                      <SelectError>{errors.covidRisk}</SelectError>
                    )}
                  </ContainerView>

                  <NextStep onPress={() => handleSubmit()} enabled={!loading}>
                    {!loading ? (
                      <NextStepText>Enviar Pesquisa</NextStepText>
                    ) : (
                      <ActivityIndicator size="small" color="#ffffff" />
                    )}
                  </NextStep>
                </FormContainer>
              ) : (
                <Container></Container>
              )
            }
          </Formik>
        </SectionContainer>
      </ContentContainer>
    </Container>
  );
};

export default NewCovidComplaint;
