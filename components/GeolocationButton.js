import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ExpoLocation from 'expo-location';
import Icon from 'react-native-vector-icons/Feather';

const GeolocationButton = ({ onLocationFound, disabled = false }) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);

    try {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Enable location services.');
        return;
      }

      const location = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.High,
      });

      onLocationFound({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      Alert.alert('Success', 'Location detected.');
    } catch (error) {
      Alert.alert('Error', 'Unable to get your location.');
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, (disabled || isGettingLocation) && styles.buttonDisabled]}
      onPress={getCurrentLocation}
      disabled={disabled || isGettingLocation}
    >
      {isGettingLocation ? (
        <ActivityIndicator size="small" color="#0070BA" />
      ) : (
        <Icon name="map-pin" size={16} color="#0070BA" />
      )}
      <Text style={styles.buttonText}>
        {isGettingLocation ? 'Getting...' : 'Use My Location'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0070BA33',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#0070BA', fontWeight: '600', marginLeft: 8, fontSize: 14 },
});

export default GeolocationButton;
