import React from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import PhoneComplaintConfirmation from '../components/PhoneComplaintConfirmation';
import { useComplaint } from '../hooks/complaint';

const AuthStack = createStackNavigator();

//pages
import SignIn from '../pages/SignIn';
import ComplaintsList from '../pages/Complaints/ComplaintsList';
import NewComplaint from '../pages/Complaints/NewComplaint';
import ShowComplaint from '../pages/Complaints/ShowComplaint';
import NewCovidComplaint from '../pages/CovidComplaints/NewCovidComplaint';

import AccountCreated from '../pages/SignUp/AccountCreated';
import SignUp from '../pages/SignUp';
import ShowCovidComplaint from '../pages/CovidComplaints/ShowCovidComplaint';

const AuthRoutes: React.FC = () => {
  const { dispatch } = useComplaint();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false, headerBackTitle: 'Início'}}
      />
      <AuthStack.Screen
        name="NewComplaint"
        component={NewComplaint}
        options={({ navigation }) => ({
          title: 'Nova denúncia',
          headerBackTitle: 'Voltar',
          headerLeft: () => (
            <HeaderBackButton
              tintColor="#ffffff"
              onPress={() => {
                dispatch({ type: 'CLEAR_STATE' });
                navigation.navigate('SignIn');
              }}
              label="Voltar"
            />
          ),
          headerStyle: {
            backgroundColor: '#006633',
            elevation: 0,
            shadowOpacity: 0,
            height: 124,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'AvenirNextLTPro-Demi',
          },
        })}
      />
      <AuthStack.Screen
        name="NewCovidComplaint"
        component={NewCovidComplaint}
        options={{
          title: 'Problemas Covid19',
          headerBackTitle: 'Voltar',
          headerStyle: {
            backgroundColor: '#006633',
            elevation: 0,
            shadowOpacity: 0,
            height: 124,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'AvenirNextLTPro-Demi',
          },
        }}
      />
      <AuthStack.Screen
        name="CreateAccount"
        component={SignUp}
        options={{
          title: 'Criar conta',
          headerBackTitle: 'Voltar',
          headerStyle: {
            backgroundColor: '#006633',
            elevation: 0,
            shadowOpacity: 0,
            height: 124,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'AvenirNextLTPro-Demi',
          },
        }}
      />
      <AuthStack.Screen
        name="AccountCreated"
        component={AccountCreated}
        options={{
          title: 'Nova conta cadastrada',
          headerBackTitle: 'Voltar',
          headerStyle: {
            backgroundColor: '#006633',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'AvenirNextLTPro-Demi',
          },
        }}
      />
      <AuthStack.Screen
        name="ComplaintsList"
        component={ComplaintsList}
        options={({navigation}) => ({
          title: 'Denúncias',
          headerBackTitle: 'Voltar',
          headerLeft: () => (
            <HeaderBackButton
              tintColor="#ffffff"
              onPress={() => navigation.navigate('SignIn')}
              label="Voltar"
            />
          ),
          headerStyle: {
            backgroundColor: '#006633',
            elevation: 0,
            shadowOpacity: 0,
            height: 124,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'AvenirNextLTPro-Demi',
          },
        })}
      />
      <AuthStack.Screen
        name="ShowComplaint"
        component={ShowComplaint}
        options={({navigation, route}: {navigation: any; route: any}) => ({
          title: 'Denúncias',
          headerLeft: () => {
            if (route.params.complaint_status !== 'new-complaint') {
              return (
                <HeaderBackButton
                  tintColor="#ffffff"
                  onPress={() => navigation.navigate('ComplaintsList')}
                  label="Voltar"
                />
              );
            } else {
              return (
                <HeaderBackButton
                  tintColor="#ffffff"
                  onPress={() => navigation.navigate('NewComplaint')}
                  label="Voltar"
                />
              )
            }
          },
          headerRight: () => {
            if (route.params.complaint_status === 'new-complaint') {
              return (
                <PhoneComplaintConfirmation
                  complaint_id={route.params.complaint_id}
                />
              );
            }
          },
          headerStyle: {
            backgroundColor: '#006633',
            elevation: 0,
            shadowOpacity: 0,
            height: 124,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'AvenirNextLTPro-Demi',
          },
        })}
      />
      <AuthStack.Screen
        name="ShowCovidComplaint"
        component={ShowCovidComplaint}
        options={({navigation, route}: {navigation: any; route: any}) => ({
          title: 'Denúncias',
          headerLeft: () => {
            if (route.params.complaint_status !== 'new-covid-complaint') {
              return (
                <HeaderBackButton
                  tintColor="#ffffff"
                  onPress={() => navigation.navigate('ComplaintsList')}
                  label="Voltar"
                />
              );
            }
          },
          headerRight: () => {
            if (route.params.complaint_status === 'new-covid-complaint') {
              return (
                <PhoneComplaintConfirmation
                  complaint_id={route.params.complaint_id}
                />
              );
            }
          },
          headerStyle: {
            backgroundColor: '#006633',
            elevation: 0,
            shadowOpacity: 0,
            height: 124,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'AvenirNextLTPro-Demi',
          },
        })}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
