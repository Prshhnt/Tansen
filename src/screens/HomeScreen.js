import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Card, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fetchMiniApps, checkMiniAppSupport} from '../services/miniAppManager';
import {fetchMiniApps} from '../services/miniAppManager';

const HomeScreen = ({navigation}) => {
  const [miniApps, setMiniApps] = useState([]);

  useEffect(() => {
    const loadMiniApps = async () => {
      try {
        const apps = await fetchMiniApps();
        setMiniApps(apps);
      } catch (error) {
        console.error('Error loading mini-apps:', error);
        // Fallback to empty array if fetch fails
        setMiniApps([]);
      }
    };

    loadMiniApps();
  }, []);

  const handleMiniAppPress = (miniApp) => {
    if (miniApp.status === 'available' && miniApp.route) {
      navigation.navigate(miniApp.route);
    }
  };

  const renderMiniApp = ({item}) => (
    <Card
      style={[
        styles.card,
        item.status === 'coming-soon' && styles.disabledCard,
      ]}
      onPress={() => handleMiniAppPress(item)}
      disabled={item.status === 'coming-soon'}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Icon
            name={item.icon}
            size={40}
            color={item.status === 'available' ? '#6750a4' : '#9e9e9e'}
          />
          {item.status === 'coming-soon' && (
            <Chip mode="outlined" compact style={styles.chip}>
              Coming Soon
            </Chip>
          )}
        </View>
        <Text variant="titleMedium" style={styles.cardTitle}>
          {item.name}
        </Text>
        <Text variant="bodySmall" style={styles.cardDescription}>
          {item.description}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.welcomeText}>
        Welcome to Tansen
      </Text>
      <Text variant="bodyMedium" style={styles.subtitleText}>
        Choose a mini-app to get started
      </Text>
      <FlatList
        data={miniApps}
        renderItem={renderMiniApp}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#1d1b20',
  },
  subtitleText: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#49454f',
  },
  gridContainer: {
    paddingBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    elevation: 2,
  },
  disabledCard: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#f3f2f7',
  },
  cardTitle: {
    marginBottom: 8,
    color: '#1d1b20',
  },
  cardDescription: {
    color: '#49454f',
  },
});

export default HomeScreen;
