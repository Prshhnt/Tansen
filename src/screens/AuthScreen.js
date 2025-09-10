import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Card} from 'react-native-paper';

const AuthScreen = ({navigation}) => {
  const handleLogin = () => {
    // TODO: Implement Firebase Auth in Step 3
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome to Tansen
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Your gateway to amazing mini-apps
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Get Started
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
  button: {
    flex: 1,
  },
});

export default AuthScreen;
