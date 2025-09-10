import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';

const FaceDetectorHome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Face Detector
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        This mini-app will detect personalities from faces.
        Implementation will be completed in Steps 5-6.
      </Text>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Enrollment')}
        style={styles.button}>
        Go to Enrollment (Placeholder)
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default FaceDetectorHome;
