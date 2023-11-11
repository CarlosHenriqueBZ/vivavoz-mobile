import React, {useCallback, useState, useEffect, useMemo} from  'react';
import { Text, View, Alert } from 'react-native';
import { Formik } from  'formik';
import * as Yup from 'yup';
import analytics from '@react-native-firebase/analytics';
import {Picker} from '@react-native-picker/picker';
import {TextInputMask} from 'react-native-masked-text';
import {useNavigation} from '@react-navigation/native';
import { RadioButton, Switch } from 'react-native-paper';
import UnionsRepository from '../../../repositories/UnionsRepository';
import {useDatabase} from '@nozbe/watermelondb/hooks';

import api from '../../../services/api';

import {
  FormContainer,
  SelectContainer,
  SelectLabel,
  Select,
  Input,
  SwitchContainer,
  SwitchLabel,
  SelectError,
  NextStep,
  NextStepText,
  RadioContainer,
  RadioLabelContainer,
  RadioLabel,
} from './styles';
import states from './states';

console.log
interface IState{
  nome: string;
  uf: string;
}

interface ICity{
  id: number;
  nome: string;
}

interface ISyndicate {
  id: string;
  nomeFantasia: string;
  discountPercentage: number;
}

interface IProps{
  handleLoading: (value: boolean)=>void;
  handleWorker: (worker: any)=>void;
  worker: any;
}

const IsSyndicateApprovedFalse: React.FC<IProps> = ({handleLoading, handleWorker, worker})=>{
  const navigation = useNavigation();
  const database = useDatabase();

  const unionsRepository = useMemo(()=>{
    return new UnionsRepository(database);
  }, [])


  const [cities, setCities] = useState<ICity[]>([]);
  const [originCities, setOriginCities] = useState<ICity[]>([])
  const [unions, setUnions] = useState<ISyndicate[]>([]);
  const [showOriginAddress, setShowOriginAddress] = useState(false);

  //Field
  const [fieldSituation, setFieldSituation] = useState();
  const [fieldState, setFieldState] = useState();
  const [fieldOriginState, setFieldOriginState] = useState();
  const [fieldCity, setFieldCity] = useState();
  const [fieldOriginCity, setFieldOriginCity] = useState();
  const [fieldSalaryRange, setFieldSalaryRange] = useState();
  const [fieldSyndicate, setFieldSyndicate] = useState();
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);


  const onToggleSwitch = (value: boolean)=>{
    setIsSwitchOn(value);
  }

  const handleStateChange = useCallback(async (value)=>{
    await api.get(`/ibge/cities/${value}`).then((response)=>{
      setCities(response.data);
      setOriginCities(response.data);
    })
  }, []);

  const handleSubmitUnionization = useCallback(async (values)=>{
    try{
    handleLoading(true);

    const responseUnionization = await api.patch(`/workers/require-unionization/${worker.id}`, values);
    const updatedWorker = await api.get(`/workers/${responseUnionization.data.id}`)
    handleWorker(updatedWorker.data);

    await analytics().logEvent('UnionizationRequest');

    handleLoading(false);

    navigation.navigate('UnionizationConfirmation');
    }catch(error){
      Alert.alert('Não foi possível solicitar a sua sindicalização. Tente novamente mais tarde.')
    }
  }, [])

  const validationSchema = Yup.object().shape({
    rg: Yup.string().required('Este campo é obrigatório.'),
    situation: Yup.string().required('Este campo é obrigatório.'),
    address: Yup.string().required('Este campo é obrigatório.'),
    city_id: Yup.number().required('Este campo é obrigatório.'),
    state: Yup.string().required('Este campo é obrigatório.'),
    postal_code: Yup.string().required('Este campo é obrigatório.'),
    is_temporary_address: Yup.boolean().required('Este campo é obrigatório.'),
    origin_address: Yup.string(),
    origin_city_id: Yup.number(),
    origin_state: Yup.string(),
    origin_postal_code: Yup.string(),
    salary_range: Yup.number().required('Este campo é obrigatório.'),
    syndicate_id: Yup.string().required('Este campo é obrigatório.'),
    is_discount_agreed: Yup.boolean().oneOf([true], 'É necessário concordar com os termos para poder solicitar a sindicalização.').required('Este campo é obrigatório.'),
  });

  const updateUnionsList = useCallback(async (state: string) => {
    await unionsRepository.getAll({ state }).then((response)=>setUnions(response));
  }, []);

  const handleDiscountValue = useCallback((id: string | undefined)=>{
    const syndicate = unions.find((syndicate) => syndicate.id === id);
    switch(syndicate?.discountPercentage){
      case 0.01:
        return `1% (um por cento)`;
        break;
      case 0.02:
        return `2% (dois por cento)`;
        break;
      case 0.03:
        return `3% (três por cento)`;
        break;
      case 0.04:
        return `4% (quatro por cento)`;
        break;
      case 0.05:
        return `5% (cinco por cento)`;
        break;
      default:
        return `1% (um por cento)`;
        break;
    }
  }, []);

  useEffect(()=>{
    const loadData = async () => {
      await unionsRepository.getAll().then((response) => setUnions(response));
    }

    loadData();
  }, [])

  return (
    <>
      <Text style={{fontSize: 16}}>
        Sindicalize-se preenchendo o formulário abaixo:
      </Text>

      <Formik
        initialValues={{
          rg: undefined,
          situation: undefined,
          address: undefined,
          city_id: undefined,
          state: undefined,
          postal_code: undefined,
          is_temporary_address: undefined,
          origin_address: undefined,
          origin_city_id: undefined,
          origin_state: undefined,
          origin_postal_code: undefined,
          salary_range: 0,
          syndicate_id: undefined,
          is_discount_agreed: false,
        }}
        onSubmit={values => handleSubmitUnionization(values)}
        validationSchema={validationSchema}>
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
        }) => (
          <FormContainer>
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
              <SelectLabel>Situação de trabalho</SelectLabel>
              <Select
                selectedValue={fieldSituation}
                onValueChange={(value: any) => {
                  setFieldSituation(value);
                  setFieldValue('situation', value);
                }}>
                <Picker.Item
                  label="Selecione o seu perfil de atividade"
                  value=""
                  color={'#b2b2b2'}
                  key="0"
                />
                <Picker.Item
                  label="Permanente"
                  value="permanent"
                  key="permanent"
                />
                <Picker.Item
                  label="Temporário"
                  value="temporary"
                  key="temporary"
                />
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
                onValueChange={async (value: any) => {
                  setFieldState(value);
                  handleStateChange(value);
                  setFieldValue('state', value);
                  await updateUnionsList(value);
                }}>
                <Picker.Item
                  label="Selecione o seu Estado"
                  value=""
                  color={'#b2b2b2'}
                  key="0"
                />
                {states.map(state => (
                  <Picker.Item
                    label={state.label}
                    value={state.value}
                    key={state.label}
                  />
                ))}
              </Select>
            </SelectContainer>
            {errors.state && <SelectError>{errors.state}</SelectError>}

            <SelectContainer>
              <SelectLabel>Cidade</SelectLabel>
              <Select
                selectedValue={fieldCity}
                onValueChange={(value: any) => {
                  setFieldCity(value);
                  setFieldValue('city_id', value);
                }}>
                <Picker.Item
                  label="Selecione a sua Cidade"
                  value=""
                  color={'#b2b2b2'}
                  key="0"
                />
                {cities.map(city => (
                  <Picker.Item
                    label={city.nome}
                    value={city.id}
                    key={city.id}
                  />
                ))}
              </Select>
            </SelectContainer>
            {errors.city_id && <SelectError>{errors.city_id}</SelectError>}

            <SelectContainer>
              <SelectLabel>CEP</SelectLabel>
              <TextInputMask
                type={'zip-code'}
                placeholder="Digite aqui o seu CEP completo"
                keyboardType="number-pad"
                returnKeyType="next"
                onBlur={handleBlur('postal_code')}
                value={values.postal_code}
                onChangeText={handleChange('postal_code')}
                style={{paddingVertical: 8}}
              />
            </SelectContainer>
            {errors.postal_code && (
              <SelectError>{errors.postal_code}</SelectError>
            )}

            <SelectContainer>
              <SelectLabel>É um endereço temporário?</SelectLabel>
              <RadioContainer>
                <RadioButton.Group
                  onValueChange={value => {
                    let parsedValue = value === 'true';
                    setShowOriginAddress(parsedValue);
                    setFieldValue('is_temporary_address', parsedValue);
                  }}
                  value={`${values.is_temporary_address}`}>
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
            {errors.is_temporary_address && (
              <SelectError>{errors.is_temporary_address}</SelectError>
            )}

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
                    selectedValue={fieldState}
                    onValueChange={(value: any) => {
                      setFieldOriginState(value);
                      handleStateChange(value);
                      setFieldValue('origin_state', value);
                    }}>
                    <Picker.Item
                      label="Selecione o seu Estado de origem"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    {states.map(state => (
                      <Picker.Item
                        label={state.nome}
                        value={state.uf}
                        key={state.uf}
                      />
                    ))}
                  </Select>
                </SelectContainer>
                {errors.origin_state && (
                  <SelectError>{errors.origin_state}</SelectError>
                )}

                <SelectContainer>
                  <SelectLabel>Cidade de origem</SelectLabel>
                  <Select
                    selectedValue={fieldOriginCity}
                    onValueChange={(value: any) => {
                      setFieldOriginCity(value);
                      setFieldValue('origin_city_id', value);
                    }}>
                    <Picker.Item
                      label="Selecione a sua Cidade de origem"
                      value=""
                      color={'#b2b2b2'}
                      key="0"
                    />
                    {cities.map(city => (
                      <Picker.Item
                        label={city.nome}
                        value={city.id}
                        key={city.id}
                      />
                    ))}
                  </Select>
                </SelectContainer>
                {errors.origin_city_id && (
                  <SelectError>{errors.origin_city_id}</SelectError>
                )}

                <SelectContainer>
                  <SelectLabel>CEP de origem</SelectLabel>
                  <TextInputMask
                    type={'zip-code'}
                    placeholder="Digite aqui o seu CEP completo"
                    keyboardType="number-pad"
                    returnKeyType="next"
                    onBlur={handleBlur('origin_postal_code')}
                    value={values.origin_postal_code}
                    onChangeText={handleChange('origin_postal_code')}
                  />
                </SelectContainer>
                {errors.origin_postal_code && (
                  <SelectError>{errors.origin_postal_code}</SelectError>
                )}
              </>
            )}
            <SelectContainer>
              <SelectLabel>Faixa salarial</SelectLabel>
              <Select
                selectedValue={fieldSalaryRange}
                onValueChange={(value: any) => {
                  setFieldSalaryRange(value);
                  setFieldValue('salary_range', value);
                }}>
                <Picker.Item
                  label="Selecione uma faixa salarial"
                  value=""
                  color={'#b2b2b2'}
                  key="0"
                />
                <Picker.Item label="Menos de R$1.100,00" value="1" key="1" />
                <Picker.Item label="Até R$1.100,00" value="2" key="2" />
                <Picker.Item
                  label="De R$1.101,00 a R$2.200,00"
                  value="3"
                  key="3"
                />
                <Picker.Item
                  label="De R$2.201,00 a R$4.400,00"
                  value="4"
                  key="4"
                />
                <Picker.Item label="Maior que R$4.401,00" value="5" key="5" />
              </Select>
            </SelectContainer>
            {errors.salary_range && (
              <SelectError>{errors.salary_range}</SelectError>
            )}

            <SelectContainer>
              <SelectLabel>Sindicato</SelectLabel>
              <Select
                selectedValue={fieldSyndicate}
                onValueChange={(value: any) => {
                  setFieldSyndicate(value);
                  setFieldValue('syndicate_id', value);
                }}>
                <Picker.Item
                  label="Selecione um sindicato"
                  value=""
                  color={'#b2b2b2'}
                  key="0"
                />
                {unions.map(syndicate => (
                  <Picker.Item
                    label={syndicate.nomeFantasia}
                    value={syndicate.id}
                    key={syndicate.id}
                  />
                ))}
              </Select>
            </SelectContainer>
            {errors.syndicate_id && (
              <SelectError>{errors.syndicate_id}</SelectError>
            )}

            <SwitchContainer>
              <View>
                <Switch
                  value={isSwitchOn}
                  onValueChange={value => {
                    onToggleSwitch(value);
                    setFieldValue('is_discount_agreed', value);
                  }}
                />
              </View>
              <SwitchLabel>{`Autorizo o desconto das mensalidades em folha de pagamento, nos termos da legislação em vigor, o valor de ${handleDiscountValue(
                values.syndicate_id,
              )}, do meu vencimento em favor da entidade consignatária indicada.`}</SwitchLabel>
            </SwitchContainer>
            {errors.is_discount_agreed && (
              <SelectError>{errors.is_discount_agreed}</SelectError>
            )}

            <NextStep onPress={() => handleSubmit()}>
              <NextStepText>Solicitar sindicalização</NextStepText>
            </NextStep>
          </FormContainer>
        )}
      </Formik>
    </>
  );
}

export default IsSyndicateApprovedFalse;
