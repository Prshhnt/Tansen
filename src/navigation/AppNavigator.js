import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import FaceDetectorHome from '../mini-apps/face-detector/screens/FaceDetectorHome';
import EnrollmentScreen from '../mini-apps/face-detector/screens/EnrollmentScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6750a4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Tansen',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="FaceDetectorHome"
          component={FaceDetectorHome}
          options={{
            title: 'Face Detector',
          }}
        />
        <Stack.Screen
          name="Enrollment"
          component={EnrollmentScreen}
          options={{
            title: 'Enroll Faces',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
