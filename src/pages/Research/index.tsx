import React, { useState, useEffect, useCallback } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import InnerPages from  '../../components/InnerPages';
import AppLoadingState from '../../components/AppLoadingState';
import { Formik, FieldArray } from 'formik';
import { useAuth } from '../../hooks/auth';
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { Alert } from 'react-native';

import api from '../../services/api';

import {
  LoadingWrapper,
  Container,
  Content,
  TitleWrapper,
  Title,
  QuestionsContainer,
  QuestionWrapper,
  QuestionText,
  AnswersWrapper,
  SelectContainer,
  RadioContainer,
  RadioLabelContainer,
  RadioLabel,
  RadioButtonContainer,
  NextStep,
  NextStepText,
} from './styles';

type StackParamsList = {
  A: undefined;
  B: {
    id: string;
  };
}

interface IAnswer {
  id: string;
  text: string;
}

interface IQuestion {
  id: string;
  text: string;
  type: string;
  answers: IAnswer[];
}

interface IResearch {
  id: string;
  title: string;
  description: string;
  start_date: string;
  finish_date: string;
  status: string;
  questions: IQuestion[]
}

interface IAnswerForm {
  questionId: string;
  answer: string;
}

const Research: React.FC = () => {
  const route = useRoute<RouteProp<StackParamsList, 'B'>>();
  const { id } = route.params;

  const navigation = useNavigation();

  const { worker } = useAuth();

  const [loading, setLoading] = useState(true);
  const [research, setResearch] = useState<IResearch>({} as IResearch);

  const handleSubmitResearch = useCallback(async (values)=>{
    try{
      await api.post('/research/worker-answer', values);

      navigation.reset({
        index: 0,
        routes: [{ name: 'ResearchSuccess' }]
      });

    }catch(error){
      Alert.alert('Não foi possível completar a sua solicitação. Por favor, tente novamente mais tarde.');
    }
  }, []);

  useEffect(()=>{
    const loadData = async () => {
      const loadedResearch = await api.get(`/research/${id}`);
      setResearch(loadedResearch.data);
      setLoading(false);
    };

    if(loading){
      loadData();
    }

    return () => {
      setLoading(true);
      setResearch({} as IResearch);
    }
  }, []);

  return (
    <InnerPages name="Pesquisa">
      <Container>
        {loading && (
          <LoadingWrapper>
            <AppLoadingState />
          </LoadingWrapper>
        )}

        {(!loading && research) && (
          <Formik
            initialValues={{
              workerId: worker.id,
              researchId: id,
              answers: [] as IAnswerForm[],
            }}
            onSubmit={handleSubmitResearch}
          >
            {({ handleSubmit, values })=>(
              <Content>
                <TitleWrapper>
                  <Title>{research.title}</Title>
                </TitleWrapper>
                <FieldArray name="answers">
                  {({ insert, replace, remove })=>(
                    <QuestionsContainer>
                      {research.questions.map((question, index) => (
                        question.type === 'radio' ? (
                          <QuestionWrapper key={question.id}>
                            <QuestionText>{question.text}</QuestionText>
                            <AnswersWrapper>
                              <SelectContainer>
                                <RadioContainer>
                                  <RadioButton.Group
                                    onValueChange={value => replace(index, { questionId: question.id, answer: value })}
                                    value={`${values.answers[index] ? values.answers[index].answer : ''}`}
                                  >
                                    {question.answers.map((answer)=>(
                                      <RadioLabelContainer key={answer.id}>
                                        <RadioButton value={`${answer.text}`} />
                                        <RadioLabel>{answer.text}</RadioLabel>
                                      </RadioLabelContainer>
                                    ))}
                                  </RadioButton.Group>
                                </RadioContainer>
                              </SelectContainer>
                            </AnswersWrapper>
                          </QuestionWrapper>
                        ) : (
                          <QuestionWrapper key={question.id}>
                            <QuestionText>{question.text}</QuestionText>
                            <AnswersWrapper>
                              <SelectContainer>
                                <RadioContainer>
                                  {question.answers.map((answer)=>(
                                    <RadioLabelContainer key={answer.id}>
                                      <CheckBox
                                        value={false}
                                        onValueChange={(value) => {
                                          if(value){
                                            return insert(index, { questionId: question.id, answer: answer.text });
                                          }else{
                                            return remove(index);
                                          }
                                        }}
                                        style={{
                                          transform: [
                                            { scaleX: 0.8 },
                                            { scaleY: 0.8 }
                                          ],
                                          marginLeft: 8,
                                        }}
                                        boxType="square"
                                        onCheckColor="#006633"
                                        onTintColor="#006633"
                                        />
                                      <RadioLabel>{answer.text}</RadioLabel>
                                    </RadioLabelContainer>
                                  ))}
                                </RadioContainer>
                              </SelectContainer>
                            </AnswersWrapper>
                          </QuestionWrapper>
                        )
                      ))}
                      </QuestionsContainer>
                    )}
                  </FieldArray>

                <NextStep onPress={() => handleSubmit()}>
                  <NextStepText>Finalizar</NextStepText>
                </NextStep>

              </Content>
            )}
          </Formik>
        )}
      </Container>
    </InnerPages>
  );
};

export default Research;
