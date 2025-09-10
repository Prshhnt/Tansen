import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Text, Button, Card, TextInput, HelperText} from 'react-native-paper';
import {signIn, signUp, signInAsGuest, onAuthStateChanged} from '../services/auth';

const AuthScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        console.log('User is logged in:', user.uid);
        navigation.replace('Home');
      }
    });

    return unsubscribe; // Cleanup listener on unmount
  }, [navigation]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (result.success) {
        // Navigation will be handled by auth state listener
        console.log('Authentication successful');
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const result = await signInAsGuest();
      if (result.success) {
        console.log('Guest login successful');
        // Navigation will be handled by auth state listener
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in as guest');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome to Tansen
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {isSignUp ? 'Create an account to get started' : 'Sign in to access your mini-apps'}
          </Text>
          
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            error={!!errors.email}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            error={!!errors.password}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>
        </Card.Content>
        
        <Card.Actions style={styles.actions}>
          <Button 
            mode="contained" 
            onPress={handleAuth}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </Card.Actions>
        
        <Card.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => setIsSignUp(!isSignUp)}
            disabled={loading}
            style={styles.button}
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </Button>
        </Card.Actions>
        
        <Card.Actions style={styles.actions}>
          <Button
            mode="text"
            onPress={handleGuestLogin}
            disabled={loading}
            style={styles.button}
          >
            Continue as Guest
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 8,
  },
  actions: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    flex: 1,
  },
});

export default AuthScreen;
