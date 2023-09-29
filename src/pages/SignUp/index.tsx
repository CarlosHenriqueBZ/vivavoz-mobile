import React, {useState, useCallback} from 'react';
import {KeyboardAvoidingView, Platform, Linking, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import {RadioButton, Switch} from 'react-native-paper';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {TextInputMask} from 'react-native-masked-text';
import {View} from 'react-native';
import analytics from '@react-native-firebase/analytics';

import api from '../../services/api';

import {
  Container,
  BasePage,
  Intro,
  Main,
  FormContainer,
  Input,
  RadioContainer,
  RadioLabelContainer,
  RadioLabel,
  SelectContainer,
  SelectLabel,
  Select,
  SelectError,
  RadioButtonContainer,
  SwitchContainer,
  SwitchLabel,
  NextStep,
  NextStepText,
} from './styles';

const SignUp: React.FC = () => {
  const [activityProfile, setActivityProfile] = useState();
  const [genre, setGenre] = useState();

  const navigation = useNavigation();

  const [isPeasant, setIsPeasant] = useState<string | boolean>();
  const [isOutsourced, setIsOutsourced] = useState<string | boolean>();
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  const onToggleSwitch = (value: boolean) => {
    setIsSwitchOn(value);
  };

  const handleCreateAccount = useCallback(async values => {
    try {
      await api.post('/workers', values);
      await analytics().logSignUp({
        method: 'email',
      });
      navigation.navigate('AccountCreated');
    } catch {
      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer o cadastro, cheque as credenciais ou tente fazer o login.',
      );
    }
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório.'),
    cpf: Yup.string()
      .required('O CPF é obrigatório')
      .min(11, 'O CPF deve conter 11 dígitos.'),
    phone: Yup.string().required('O telefone é obrigatório.'),
    activity_profile: Yup.string().required('A atividade é obrigatória.'),
    is_peasant: Yup.boolean(),
    is_outsourced: Yup.boolean(),
    genre: Yup.string().required('O gênero é obrigatório.'),
    password: Yup.string()
      .required('Uma senha é obrigatória')
      .min(8, 'A senha deve conter no mínimo 8 dígitos.'),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'A confirmação da senha deve ser idêntica a senha.',
    ),
    is_lgpd_agreed: Yup.boolean()
      .oneOf([true], 'É necessário concordar com os termos para se cadastrar.')
      .required('Este campo é obrigatório'),
  });

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <BasePage>
          <Intro>
            Preencha os campos abaixo para se cadastrar no Viva Voz!
          </Intro>

          <Main>
            <Formik
              initialValues={{
                name: '',
                cpf: '',
                phone: '',
                activity_profile: '',
                is_peasant: false,
                is_outsourced: false,
                genre: '',
                password: '',
                password_confirmation: '',
                is_lgpd_agreed: false,
              }}
              onSubmit={values => handleCreateAccount(values)}
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
                    <SelectLabel>Nome</SelectLabel>
                    <Input
                      placeholder="Digite aqui o seu nome completo"
                      keyboardType="default"
                      autoCorrect={false}
                      autoCapitalize="words"
                      returnKeyType="next"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                    />
                  </SelectContainer>
                  {errors.name && <SelectError>{errors.name}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>CPF</SelectLabel>
                    <TextInputMask
                      type={'cpf'}
                      placeholder="Digite aqui o seu CPF"
                      value={values.cpf}
                      onChangeText={handleChange('cpf')}
                      onBlur={handleBlur('cpf')}
                      keyboardType="number-pad"
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType="next"
                      style={{paddingTop: 8, paddingBottom: 8}}
                    />
                  </SelectContainer>
                  {errors.cpf && <SelectError>{errors.cpf}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>Celular</SelectLabel>
                    <TextInputMask
                      type={'cel-phone'}
                      options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) ',
                      }}
                      placeholder="Digite aqui o seu celular"
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      keyboardType="number-pad"
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType="next"
                      style={{paddingTop: 8, paddingBottom: 8}}
                    />
                  </SelectContainer>
                  {errors.phone && <SelectError>{errors.phone}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>Perfil de atividade</SelectLabel>
                    <Select
                      selectedValue={activityProfile}
                      onValueChange={(value: any) => {
                        setFieldValue('activity_profile', value);
                        setActivityProfile(value);
                      }}>
                      <Picker.Item
                        label="Selecione o seu perfil de atividade"
                        value=""
                        color={'#b2b2b2'}
                        key="0"
                      />
                      <Picker.Item label="Rural" value="rural" key="rural" />
                      <Picker.Item
                        label="Industrial"
                        value="industrial"
                        key="industrial"
                      />
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
                  {errors.activity_profile && (
                    <SelectError>{errors.activity_profile}</SelectError>
                  )}

                  {activityProfile === 'rural' && (
                    <SelectContainer>
                      <SelectLabel>Safrista?</SelectLabel>
                      <RadioContainer>
                        <RadioButton.Group
                          onValueChange={value => {
                            setIsPeasant(value);
                            setFieldValue('is_peasant', value);
                          }}
                          value={`${values.is_peasant}`}>
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
                  )}
                  {errors.is_peasant && (
                    <SelectError>{errors.is_peasant}</SelectError>
                  )}

                  {activityProfile === 'industrial' && (
                    <SelectContainer>
                      <SelectLabel>Terceirizado?</SelectLabel>
                      <RadioContainer>
                        <RadioButton.Group
                          onValueChange={value => {
                            setIsOutsourced(value);
                            setFieldValue('is_outsourced', value);
                          }}
                          value={`${values.is_peasant}`}>
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
                  )}
                  {errors.is_outsourced && (
                    <SelectError>{errors.is_outsourced}</SelectError>
                  )}

                  <SelectContainer>
                    <SelectLabel>Gênero</SelectLabel>
                    <Select
                      selectedValue={genre}
                      onValueChange={(value: any) => {
                        setGenre(value);
                        setFieldValue('genre', value);
                      }}>
                      <Picker.Item
                        label="Selecione o gênero"
                        value=""
                        color={'#b2b2b2'}
                        key="0"
                      />
                      <Picker.Item label="Masculino" value="male" key="male" />
                      <Picker.Item
                        label="Feminino"
                        value="female"
                        key="female"
                      />
                      <Picker.Item label="Outro" value="other" key="other" />
                    </Select>
                  </SelectContainer>
                  {errors.genre && <SelectError>{errors.genre}</SelectError>}

                  <SelectContainer>
                    <SelectLabel>Senha</SelectLabel>
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
                  {errors.password && (
                    <SelectError>{errors.password}</SelectError>
                  )}

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
                  {errors.password_confirmation && (
                    <SelectError>{errors.password_confirmation}</SelectError>
                  )}

                  <SwitchContainer>
                    <View>
                      <Switch
                        value={isSwitchOn}
                        onValueChange={value => {
                          onToggleSwitch(value);
                          setFieldValue('is_lgpd_agreed', value);
                        }}
                      />
                    </View>
                    <SwitchLabel
                      onPress={() =>
                        Linking.openURL('https://www.tse.jus.br/transparencia-e-prestacao-de-contas/politica-de-privacidade-e-termos-de-uso?SearchableText=pol%C3%ADtica%20de%20privacidade')
                      }>
                      Aceito os termos de uso.
                    </SwitchLabel>
                  </SwitchContainer>
                  {errors.is_lgpd_agreed && (
                    <SelectError>{errors.is_lgpd_agreed}</SelectError>
                  )}

                  <NextStep onPress={() => handleSubmit()}>
                    <NextStepText>Cadastrar</NextStepText>
                  </NextStep>
                </FormContainer>
              )}
            </Formik>
          </Main>
        </BasePage>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignUp;
