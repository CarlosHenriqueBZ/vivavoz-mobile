import 'es6-symbol/implement';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React, {useEffect, useRef} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import Toast from 'react-native-toast-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import OneSignal from 'react-native-onesignal';

import {Buffer} from 'buffer';
global.Buffer = Buffer;
//test
import AuthProvider from './hooks';

import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {database} from './data/database';

import Routes from './routes';

const App: React.FC = () => {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<any>(null);

  useEffect(() => {
    SplashScreen.hide();

    const load = async () => {
      await database.write(async () => {
        await database.unsafeResetDatabase();
      });
    };

    // load();

    //OneSignal Setup
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('96293900-5b66-4986-b312-9baed2b67267');
  });

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK

          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <StatusBar
        translucent
        backgroundColor="#006633"
        barStyle="light-content"
      />
      <DatabaseProvider database={database}>
        <SafeAreaProvider
          initialMetrics={{
            frame: {x: 0, y: 0, width: 0, height: 0},
            insets: {top: 0, left: 0, right: 0, bottom: 0},
          }}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </SafeAreaProvider>
      </DatabaseProvider>
    </NavigationContainer>
  );
};

export default App;
