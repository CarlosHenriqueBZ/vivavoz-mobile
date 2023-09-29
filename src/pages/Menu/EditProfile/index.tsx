import React, { useState, useCallback, useEffect } from 'react';
import {Alert} from 'react-native';
import InnerPages from '../../../components/InnerPages';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { RadioButton, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import AppLoadingState from '../../../components/AppLoadingState';
import { format } from 'date-fns';
import * as Yup from 'yup';

import api from '../../../services/api';

import {
  Container,
  Main,
  Title,
  Description,
  Line,
  FormContainer,
  Input,
  InputMask,
  SelectContainer,
  SelectLabel,
  Select,
  SelectError,
  RadioContainer,
  RadioLabelContainer,
  RadioLabel,
  RadioButtonContainer,
  SwitchContainer,
  NextStep,
  NextStepText,
 } from './styles';


interface IState{
  nome: string;
  uf: string;
}

interface ICity{
  id: number;
  nome: string;
}

interface IUnions{
  id: string;
  nome_fantasia: string;
}

const EditProfile: React.FC = ()=>{
  const { worker, updateWorker } = useAuth();
  const navigation = useNavigation();

  //Other states
  const [loading, setLoading] = useState(true);

  //Form data
  const [activityProfile, setActivityProfile] = useState('');
  const [genre, setGenre] = useState('');
  const [isPeasant, setIsPeasant] = useState<string | boolean>();
  const [isOutsourced, setIsOutsourced] = useState<string | boolean>();
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [originStates, setOriginStates] = useState<IState[]>([]);
  const [originCities, setOriginCities] = useState<ICity[]>([])
  const [showOriginAddress, setShowOriginAddress] = useState(false);
  const [fieldSituation, setFieldSituation] = useState('');
  const [fieldState, setFieldState] = useState('');
  const [fieldOriginState, setFieldOriginState] = useState();
  const [fieldCity, setFieldCity] = useState<number | string>();
  const [fieldOriginCity, setFieldOriginCity] = useState();
  const [fieldSalaryRange, setFieldSalaryRange] = useState<number | string>();

  const handleStateChange = useCallback(async (value)=>{
    await api.get(`/ibge/cities/${value}`).then((response)=>{
      setCities(response.data);
    })
  }, []);

  const handleOriginStateChange = useCallback(async (value)=>{
    await api.get(`/ibge/cities/${value}`).then((response)=>{
      setOriginCities(response.data);
    })
  }, []);

  const handleUpdateProfile = useCallback(async (values)=>{
    try{
      const { id, ...rest } = values;
      await api.put(`/workers/${id}`, rest);

      const updatedWorker = await api.get(`/workers/${id}`);

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso.');

      await updateWorker(updatedWorker.data);

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Menu',
            params: {
              editedProfile: 'success',
            }
          }
        ]
      });
    }catch(error){
      Alert.alert('Erro na atualização', 'Ocorreu um erro ao tentar atualizar o seu perfil.');
    }
  }, []);

  useEffect(()=>{
    const loadData = async ()=>{
      const loadedStates = await api.get('/ibge/states');
      setOriginStates(loadedStates.data);
    };

    if(showOriginAddress){
      loadData();
    } else {
      setOriginCities([]);
      setOriginStates([]);
    }
  }, [showOriginAddress])

  useEffect(()=>{
    const loadData = async ()=>{
      const loadedStates = await api.get('/ibge/states');
      const loadedCities = await api.get(`/ibge/cities/${worker.state}`);

      if(worker.is_temporary_address){
        const loadedOriginCities = await api.get(`/ibge/cities/${worker.origin_state}`);
        setOriginStates(loadedStates.data);
        setFieldOriginCity(loadedOriginCities.data);
      }

      setActivityProfile(worker.activity_profile);
      setStates(loadedStates.data);
      setCities(loadedCities.data);
      setFieldCity(worker.city_id);
      setFieldSalaryRange(worker.salary_range);
      setGenre(worker.genre);
      setFieldState(worker.state);
      setFieldSituation(worker.situation);

      setLoading(false);
    };

    if(loading){
      loadData();
    }
  }, [])

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8, 'A senha deve conter no mínimo 8 dígitos.'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'A confirmação da senha deve ser idêntica a senha.'),
  })

  return (
    <InnerPages name="Editar perfil">
      {loading && <AppLoadingState />}
      {!loading && (
      <Container>
        <Main>
          <Title>Editar perfil</Title>
          <Description>
            Verifique ou complemente o seu perfil no aplicativo abaixo.
          </Description>

          <Line />

          <Formik
            initialValues={{
              id: worker.id,
              cpf: worker.cpf,
              first_name: worker.first_name,
              last_name: worker.last_name,
              rg: worker.rg,
              birth_date: format(new Date(worker.birth_date), 'dd/MM/yyyy'),
              activity_profile: worker.activity_profile,
              is_peasant: worker.is_peasant,
              is_outsourced: worker.is_outsourced,
              worker_function: worker.worker_function,
              genre: worker.genre,
              phone: worker.phone,
              situtation: worker.situation,
              email: worker.email,
              address: worker.address,
              city_id: worker.city_id,
              state: worker.state,
              postal_code: worker.postal_code,
              is_temporary_address: worker.is_temporary_address,
              origin_address: worker.origin_address,
              origin_city_id: worker.origin_city_id,
              origin_state: worker.origin_state,
              origin_postal_code: worker.origin_postal_code,
              salary_range:  worker.salary_range,
              old_password: '',
              password: '',
              password_confirmation: '',
            }}
            onSubmit={handleUpdateProfile}
            validationSchema={validationSchema}
          >
            {({setFieldValue, errors, values, handleChange, handleSubmit, handleBlur})=>(
              <FormContainer>

                  <SelectContainer>
                    <SelectLabel>CPF</SelectLabel>
                    <InputMask
                    type={'cpf'}
                    placeholder="Digite aqui o seu CPF"
                    value={values.cpf}
                    onChangeText={handleChange('cpf')}
                    onBlur={handleBlur('cpf')}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    editable={false}
                    style={{backgroundColor: '#dedede'}}
                  />
                  </SelectContainer>
                  {errors.cpf && <SelectError>{errors.cpf}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>Nome</SelectLabel>
                    <Input
                    placeholder="Digite aqui o seu nome completo"
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="words"
                    returnKeyType="next"
                    value={values.first_name}
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                  />
                  </SelectContainer>
                  {errors.first_name && <SelectError>{errors.first_name}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>Sobrenome</SelectLabel>
                    <Input
                    placeholder="Digite aqui o seu nome completo"
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="words"
                    returnKeyType="next"
                    value={values.last_name}
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                  />
                  </SelectContainer>
                  {errors.last_name && <SelectError>{errors.last_name}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>RG</SelectLabel>
                    <Input
                    placeholder="Digite aqui o RG"
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="characters"
                    returnKeyType="next"
                    onBlur={handleBlur('rg')}
                    value={values.rg}
                    onChangeText={handleChange('rg')}
                  />
                  </SelectContainer>
                  {errors.rg && <SelectError>{errors.rg}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>E-mail</SelectLabel>
                    <Input
                    placeholder="Digite aqui o E-mail"
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="characters"
                    returnKeyType="next"
                    onBlur={handleBlur('email')}
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  </SelectContainer>
                  {errors.email && <SelectError>{errors.email}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>Data de nascimento</SelectLabel>
                    <InputMask
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY'
                    }}
                    placeholder="Digite aqui a sua data de nascimento"
                    value={`${values.birth_date}`}
                    onChangeText={handleChange('birth_date')}
                    onBlur={handleBlur('birth_date')}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  </SelectContainer>
                  {errors.birth_date && <SelectError>{errors.birth_date}</SelectError>}

                  <SelectContainer>
                  <SelectLabel>Perfil de atividade</SelectLabel>
                  <Select
                    selectedValue={activityProfile}
                    onValueChange={(value: any)=>{
                      setFieldValue('activity_profile', value)
                      setActivityProfile(value)
                      }}
                  >
                    <Picker.Item
                      label="Selecione o seu perfil de atividade"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    <Picker.Item label="Rural" value="rural" key="rural" />
                    <Picker.Item label="Industrial" value="industrial" key="industrial" />
                    <Picker.Item
                      label="Comércio"
                      value="market"
                      key="market"
                    />
                    <Picker.Item
                      label="Serviço Público"
                      value="public-service"
                      key="public-service"
                    />
                  </Select>
                </SelectContainer>
                {errors.activity_profile && <SelectError>{errors.activity_profile}</SelectError>}

                  {activityProfile === 'rural' && (
                    <SelectContainer>
                    <SelectLabel>Safrista?</SelectLabel>
                      <RadioContainer>
                        <RadioButton.Group
                          onValueChange={value => {
                            setIsPeasant(value);
                            setFieldValue('is_peasant', value);
                          }}
                          value={`${values.is_peasant}`}
                        >
                          <RadioLabelContainer>
                                <RadioButton value="true" />
                            <RadioLabel>Sim</RadioLabel>
                          </RadioLabelContainer>

                          <RadioLabelContainer>
                              <RadioButton value="false" />
                          <RadioLabel>Não</RadioLabel>
                        </RadioLabelContainer>

                        </RadioButton.Group>
                      </RadioContainer>
                  </SelectContainer>)}
                  {errors.is_peasant && <SelectError>{errors.is_peasant}</SelectError>}

                  {activityProfile === 'industrial' && (
                    <SelectContainer>
                    <SelectLabel>Terceirizado?</SelectLabel>
                    <RadioContainer>
                      <RadioButton.Group
                        onValueChange={value => {
                          setIsOutsourced(value);
                          setFieldValue('is_outsourced', value);
                        }}
                        value={`${values.is_peasant}`}
                      >
                      <RadioLabelContainer>
                        <RadioButton value="true" />
                        <RadioLabel>Sim</RadioLabel>
                      </RadioLabelContainer>

                      <RadioLabelContainer>
                        <RadioButton value="false" />
                        <RadioLabel>Não</RadioLabel>
                      </RadioLabelContainer>
                      </RadioButton.Group>
                    </RadioContainer>
                  </SelectContainer>)}
                  {errors.is_outsourced && <SelectError>{errors.is_outsourced}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>Função</SelectLabel>
                    <Input
                    placeholder="Digite aqui a sua função"
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="words"
                    returnKeyType="next"
                    value={values.worker_function}
                    onChangeText={handleChange('worker_function')}
                    onBlur={handleBlur('worker_function')}
                  />
                  </SelectContainer>
                  {errors.worker_function && <SelectError>{errors.worker_function}</SelectError>}


                  <SelectContainer>
                    <SelectLabel>Gênero</SelectLabel>
                    <Select
                      selectedValue={genre}
                      onValueChange={(value: any)=>{
                        setGenre(value);
                        setFieldValue('genre', value);
                      }}
                    >
                      <Picker.Item
                        label="Selecione o gênero"
                        value=""
                        color={'#b2b2b2'}
                        key="0"
                      />
                      <Picker.Item label="Masculino" value="male" key="male" />
                      <Picker.Item label="Feminino" value="female" key="female" />
                      <Picker.Item label="Outro" value="other" key="other" />
                    </Select>
                  </SelectContainer>
                  {errors.genre && <SelectError>{errors.genre}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>Celular</SelectLabel>
                    <InputMask
                    type={'cel-phone'}
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) '
                    }}
                    placeholder="Digite aqui o seu celular"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                </SelectContainer>
                {errors.phone && <SelectError>{errors.phone}</SelectError>}

                <SelectContainer>
                  <SelectLabel>Situação de trabalho</SelectLabel>
                  <Select
                    selectedValue={fieldSituation}
                    onValueChange={(value: any)=>{
                      setFieldSituation(value);
                      setFieldValue('situation', value);
                    }}
                  >
                    <Picker.Item
                      label="Selecione o seu perfil de atividade"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    <Picker.Item label="Permanente" value="permanent" key="permanent" />
                    <Picker.Item label="Temporário" value="temporary" key="temporary" />
                  </Select>
                </SelectContainer>

                <SelectContainer>
                  <SelectLabel>Endereço</SelectLabel>
                  <Input
                  placeholder="Digite aqui o seu endereço completo"
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onBlur={handleBlur('address')}
                  value={values.address}
                  onChangeText={handleChange('address')}
                />
                </SelectContainer>
                {errors.address && <SelectError>{errors.address}</SelectError>}

                <SelectContainer>
                  <SelectLabel>Estado</SelectLabel>
                  <Select
                    selectedValue={fieldState}
                    onValueChange={(value: any)=>{
                      setFieldState(value);
                      handleStateChange(value);
                      setFieldValue('state', value);
                  }}
                  >
                    <Picker.Item
                      label="Selecione o seu Estado"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    {states.map((state)=>(
                      <Picker.Item label={state.nome} value={state.uf} key={state.uf} />
                    ))}
                  </Select>
                </SelectContainer>
                {errors.state && <SelectError>{errors.state}</SelectError>}

                <SelectContainer>
                  <SelectLabel>Cidade</SelectLabel>
                  <Select
                    selectedValue={fieldCity}
                    onValueChange={(value: any)=>{
                      setFieldCity(value);
                      setFieldValue('city_id', value);
                  }}
                  >
                    <Picker.Item
                      label="Selecione a sua Cidade"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    {cities.map((city)=>(
                      <Picker.Item label={city.nome} value={city.id} key={city.id} />
                    ))}
                  </Select>
                </SelectContainer>
                {errors.city_id && <SelectError>{errors.city_id}</SelectError>}

                <SelectContainer>
                  <SelectLabel>CEP</SelectLabel>
                  <InputMask
                  type={'zip-code'}
                  placeholder="Digite aqui o seu CEP completo"
                  keyboardType="number-pad"
                  returnKeyType="next"
                  onBlur={handleBlur('postal_code')}
                  value={values.postal_code}
                  onChangeText={handleChange('postal_code')}
                />
                </SelectContainer>
                {errors.postal_code && <SelectError>{errors.postal_code}</SelectError>}

                <SelectContainer>
                  <SelectLabel>É um endereço temporário?</SelectLabel>
                  <RadioContainer>
                    <RadioButton.Group
                      onValueChange={value => {
                        let parsedValue = (value === 'true');
                        setShowOriginAddress(parsedValue);
                        setFieldValue('is_temporary_address', parsedValue);
                      }}
                      value={`${values.is_temporary_address}`}
                    >
                      <RadioLabelContainer>
                            <RadioButton value="true" />
                        <RadioLabel>Sim</RadioLabel>
                      </RadioLabelContainer>

                      <RadioLabelContainer>
                          <RadioButton value="false" />
                      <RadioLabel>Não</RadioLabel>
                    </RadioLabelContainer>

                    </RadioButton.Group>
                  </RadioContainer>
                </SelectContainer>
                {errors.is_temporary_address && <SelectError>{errors.is_temporary_address}</SelectError>}

                {showOriginAddress && (
                  <>
                    <SelectContainer>
                      <SelectLabel>Endereço de origem</SelectLabel>
                      <Input
                      placeholder="Digite aqui o seu endereço de origem"
                      keyboardType="default"
                      autoCorrect={false}
                      autoCapitalize="words"
                      returnKeyType="next"
                      onBlur={handleBlur('origin_address')}
                      value={values.origin_address}
                      onChangeText={handleChange('origin_address')}
                    />
                    </SelectContainer>
                    <SelectContainer>
                      <SelectLabel>Estado de origem</SelectLabel>
                      <Select
                      selectedValue={fieldOriginState}
                      onValueChange={(value: any)=>{
                        setFieldOriginState(value);
                        handleOriginStateChange(value);
                        setFieldValue('origin_state', value);
                    }}>
                        <Picker.Item
                          label="Selecione o seu Estado de origem"
                          value=""
                          color={'#b2b2b2'}
                          key="0"
                        />
                        {originStates.map((state)=>(
                          <Picker.Item label={state.nome} value={state.uf} key={state.uf} />
                        ))}
                      </Select>
                    </SelectContainer>
                    {errors.origin_state && <SelectError>{errors.origin_state}</SelectError>}

                    <SelectContainer>
                    <SelectLabel>Cidade de origem</SelectLabel>
                    <Select
                      selectedValue={fieldOriginCity}
                      onValueChange={(value: any)=>{
                        setFieldOriginCity(value);
                        setFieldValue('origin_city_id', value);
                    }}
                    >
                      <Picker.Item
                        label="Selecione a sua Cidade de origem"
                        value=""
                        color={'#b2b2b2'}
                        key="0"
                      />
                      {originCities.map((city)=>(
                        <Picker.Item label={city.nome} value={city.id} key={city.id} />
                      ))}
                    </Select>
                  </SelectContainer>
                  {errors.origin_city_id && <SelectError>{errors.origin_city_id}</SelectError>}

                    <SelectContainer>
                      <SelectLabel>CEP de origem</SelectLabel>
                      <InputMask
                      type={'zip-code'}
                      placeholder="Digite aqui o seu CEP completo"
                      keyboardType="number-pad"
                      returnKeyType="next"
                      onBlur={handleBlur('origin_postal_code')}
                      value={values.origin_postal_code}
                      onChangeText={handleChange('origin_postal_code')}
                    />
                    </SelectContainer>
                    {errors.origin_postal_code && <SelectError>{errors.origin_postal_code}</SelectError>}
                </>
                )}

                <SelectContainer>
                  <SelectLabel>Faixa salarial</SelectLabel>
                  <Select
                    selectedValue={`${fieldSalaryRange}`}
                    onValueChange={(value: any)=>{
                      setFieldSalaryRange(value);
                      setFieldValue('salary_range', value);
                  }}
                  >
                    <Picker.Item
                      label="Selecione uma faixa salarial"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    <Picker.Item label="Menos de R$1.100,00" value="1" key="1" />
                    <Picker.Item label="Até R$1.100,00" value="2" key="2" />
                    <Picker.Item label="De R$1.101,00 a R$2.200,00" value="3" key="3" />
                    <Picker.Item label="De R$2.201,00 a R$4.400,00" value="4" key="4" />
                    <Picker.Item label="Maior que R$4.401,00" value="5" key="5" />
                  </Select>
                </SelectContainer>
                {errors.salary_range && <SelectError>{errors.salary_range}</SelectError>}

                <SelectContainer>
                  <SelectLabel>Senha antiga</SelectLabel>
                  <Input
                  placeholder="Digite aqui a sua senha"
                  value={values.old_password}
                  onChangeText={handleChange('old_password')}
                  onBlur={handleBlur('old_password')}
                  keyboardType="default"
                  autoCorrect={false}
                  secureTextEntry
                  autoCapitalize="none"
                  returnKeyType="next"
                />
                </SelectContainer>
                {errors.password && <SelectError>{errors.password}</SelectError>}

                <SelectContainer>
                  <SelectLabel>Nova senha</SelectLabel>
                  <Input
                  placeholder="Digite aqui a sua senha"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  keyboardType="default"
                  autoCorrect={false}
                  secureTextEntry
                  autoCapitalize="none"
                  returnKeyType="next"
                />
                </SelectContainer>
                {errors.password && <SelectError>{errors.password}</SelectError>}

                <SelectContainer>
                  <SelectLabel>Confirmação de senha</SelectLabel>
                  <Input
                  placeholder="Digite novamente a sua senha"
                  value={values.password_confirmation}
                  onChangeText={handleChange('password_confirmation')}
                  onBlur={handleBlur('password_confirmation')}
                  keyboardType="default"
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="next"
                />
                </SelectContainer>
                {errors.password_confirmation && <SelectError>{errors.password_confirmation}</SelectError>}


                <NextStep onPress={() => handleSubmit()}>
                  <NextStepText>Salvar</NextStepText>
                </NextStep>

              </FormContainer>
            )}
          </Formik>

        </Main>
      </Container>
      )}
    </InnerPages>
  );
};

export default EditProfile;
