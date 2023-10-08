import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Syndicate from '../pages/Syndicate';
import UnionizationConfirmation from '../pages/Syndicate/UnionizationConfirmation';
import UnionsPartners from '../pages/UnionsPartners';
import UnionsListPartners from '../pages/UnionsPartners/ListPartners';
import Menu from '../pages/Menu';
import NewComplaint from '../pages/Complaints/NewComplaint';
import ComplaintsList from '../pages/Complaints/ComplaintsList';
import ShowComplaint from '../pages/Complaints/ShowComplaint';
import PhoneComplaintConfirmation from '../components/PhoneComplaintConfirmation';
import Research from '../pages/Research';
import Success from '../pages/Research/Success';
import EditProfile from '../pages/Menu/EditProfile';
import About from '../pages/About';
import Terms from '../pages/Terms';


// import Notifications from '../pages/Notifications'
import Invoices from '../pages/Invoices';
import ResearchSection from '../pages/ResearchSection';


import News from '../pages/News';
import ShowNews from '../pages/News/Show';

import TabBarNavigation from '../components/TabBarNavigation';
import NewCovidComplaint from '../pages/CovidComplaints/NewCovidComplaint';
import ShowCovidComplaint from '../pages/CovidComplaints/ShowCovidComplaint';

import { useComplaint } from '../hooks/complaint';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
// const NotificationsStack = createStackNavigator();
const SyndicateStack = createStackNavigator();
const ComplaintsStack = createStackNavigator();
const MenuStack = createStackNavigator();
const NewsStack = createStackNavigator();
const StackNavigation = createStackNavigator();

// const NotificationsNav: React.FC = ()=>{
//   return (
//     <NotificationsStack.Navigator>
//         <NotificationsStack.Screen
//           name="Notifications"
//           component={Notifications}
//           options={{
//             title: 'Notificações',
//             headerBackTitleVisible: false,
//             headerShown: false,
//             headerStyle: {
//               backgroundColor: '#006633',
//               elevation: 0,
//               shadowOpacity: 0,
//             },
//             headerTintColor: '#ffffff',
//             headerTitleStyle: {
//               fontFamily: 'AvenirNextLTPro-Demi',
//             },
//           }}
//         />
//     </NotificationsStack.Navigator>
//   );
// }

const HomeTab: React.FC = () => {
  const { dispatch } = useComplaint();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{headerShown: false}}
        name="Dashboard"
        component={Dashboard}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name="Research"
        component={Research}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name="ResearchSuccess"
        component={Success}
      />
      <HomeStack.Screen
        name="NewComplaint"
        component={NewComplaint}
        options={({navigation}) => ({
          title: 'Nova denúncia',
          headerLeft: () => (
            <HeaderBackButton
              tintColor="#ffffff"
              onPress={() => {
                dispatch({type: 'CLEAR_STATE'});
                navigation.navigate('Dashboard');
              }}
              label="Voltar"
            />
          ),
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#006633',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'AvenirNextLTPro-Demi',
          },
        })}
      />
      <HomeStack.Screen
        name="ComplaintsList"
        component={ComplaintsList}
        options={{
          title: 'Relatar problemas',
          headerBackTitleVisible: false,
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
      <HomeStack.Screen
        name="NewCovidComplaint"
        component={NewCovidComplaint}
        options={{
          title: 'Problemas Covid19',
          headerBackTitleVisible: false,
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
      <HomeStack.Screen
        name="ResearchSection"
        component={ResearchSection}
        options={{headerShown: false}}
      />
      {/* <HomeStack.Screen
          name="Notifications"
          component={NotificationsNav}
          options={{headerShown: false}}
        /> */}
    </HomeStack.Navigator>
  );
};

const SyndicateTab: React.FC = () => {
  return (
    <SyndicateStack.Navigator>
      <SyndicateStack.Screen
        options={{headerShown: false}}
        name="Syndicate"
        component={Syndicate}
      />
      <SyndicateStack.Screen
        options={{headerShown: false}}
        name="UnionizationConfirmation"
        component={UnionizationConfirmation}
      />
      <SyndicateStack.Screen
        name="NewComplaint"
        component={NewComplaint}
        options={{
          title: 'Nova denúncia',
          headerBackTitleVisible: false,
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
      <SyndicateStack.Screen
        name="ComplaintsList"
        component={ComplaintsList}
        options={{
          title: 'Relatar problemas',
          headerBackTitleVisible: false,
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
      <SyndicateStack.Screen
        name="UnionsPartners"
        component={UnionsPartners}
        options={{headerShown: false}}
      />
      <SyndicateStack.Screen
        name="UnionsListPartners"
        component={UnionsListPartners}
        options={{headerShown: false}}
      />
      <SyndicateStack.Screen
        name="Invoices"
        component={Invoices}
        options={{headerShown: false}}
      />

      {/* <SyndicateStack.Screen name="Notifications" component={NotificationsNav} options={{headerShown: false}} /> */}
    </SyndicateStack.Navigator>
  );
};

const MenuTab: React.FC = () => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        options={{headerShown: false}}
        name="Menu"
        component={Menu}
      />
      <MenuStack.Screen
        options={{headerShown: false}}
        name="EditProfile"
        component={EditProfile}
      />

      <MenuStack.Screen
        options={{headerShown: false}}
        name="About"
        component={About}
      />

      <MenuStack.Screen
        options={{headerShown: false}}
        name="Terms"
        component={Terms}
      />
      {/* <MenuStack.Screen options={{headerShown: false}} name="Notifications" component={NotificationsNav} /> */}
    </MenuStack.Navigator>
  );
};

const NewsTab: React.FC = () => {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        options={{headerShown: false}}
        name="News"
        component={News}
      />
      <NewsStack.Screen
        options={{headerShown: false}}
        name="ShowNews"
        component={ShowNews}
      />
      {/* <NewsStack.Screen options={{headerShown: false }} name="Notifications" component={Notifications} /> */}
    </NewsStack.Navigator>
  );
};

const TabsNav: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <TabBarNavigation {...props} />}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#F38725',
        inactiveTintColor: '#cccccc',
      }}>
      <Tab.Screen
        name="Início"
        component={HomeTab}
        options={{tabBarIcon: () => 'home'}}
      />
      <Tab.Screen
        name="Sindicato"
        component={SyndicateTab}
        options={{tabBarIcon: () => 'handshake-o'}}
      />
      <Tab.Screen
        name="Notícias"
        component={NewsTab}
        options={{tabBarIcon: () => 'file-text'}}
      />
      <Tab.Screen
        name="Cadastro"
        component={MenuTab}
        options={{tabBarIcon: () => 'user'}}
      />
    </Tab.Navigator>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <StackNavigation.Navigator
      screenOptions={{headerShown: false, headerBackTitle: 'Voltar'}}>
      <StackNavigation.Screen name="Dashboard" component={TabsNav} />
      <StackNavigation.Screen
        name="ShowComplaint"
        component={ShowComplaint}
        options={({navigation, route}: {navigation: any; route: any}) => ({
          headerShown: true,
          headerLeft: () => {
            if (route.params.complaint_status !== 'new-complaint') {
              return (
                <HeaderBackButton
                  tintColor="#ffffff"
                  onPress={() => navigation.navigate('Dashboard')}
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
              );
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
          title: 'Relatar problemas',
          headerBackTitleVisible: false,
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
      <StackNavigation.Screen
        name="ShowCovidComplaint"
        component={ShowCovidComplaint}
        options={({navigation, route}: {navigation: any; route: any}) => ({
          headerShown: true,
          headerLeft: () => {
            if (route.params.complaint_status !== 'new-covid-complaint') {
              return (
                <HeaderBackButton
                  tintColor="#ffffff"
                  onPress={() => navigation.navigate('Dashboard')}
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
          title: 'Acompanhar denúncias covid',
          headerBackTitleVisible: false,
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
    </StackNavigation.Navigator>
  );
};

export default AppRoutes;
