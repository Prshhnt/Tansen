import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {onAuthStateChanged} from '../services/auth';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import FaceDetectorHome from '../mini-apps/face-detector/screens/FaceDetectorHome';
import EnrollmentScreen from '../mini-apps/face-detector/screens/EnrollmentScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    // You can replace this with a loading screen component
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Auth"}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6750a4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {user ? (
          // Screens for authenticated users
          <>
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
          </>
        ) : (
          // Screens for unauthenticated users
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
