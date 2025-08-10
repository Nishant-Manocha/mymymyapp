import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { formatDistance, calculateDistance } from '../utils/distance';

const MapContainer = ({ userLocation, center, nearbyCells }) => {
  const [selectedCell, setSelectedCell] = useState(null);

  const handleNavigate = (cell) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${cell.lat},${cell.lng}&travelmode=driving`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Map Heading */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Cyber Cell Finder</Text>
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: userLocation ? 0.1 : 0.5,
          longitudeDelta: userLocation ? 0.1 : 0.5,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {/* User Marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}

        {/* Cyber Cell Markers */}
        {nearbyCells.map((cell) => (
          <Marker
            key={cell.id}
            coordinate={{ latitude: cell.lat, longitude: cell.lng }}
            pinColor="red"
            onPress={() => setSelectedCell(cell)}
          />
        ))}
      </MapView>

      {/* Bottom Sheet (Modal) for details */}
      <Modal
        visible={!!selectedCell}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedCell(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCell && (
              <>
                <Text style={styles.modalTitle}>{selectedCell.name}</Text>
                <Text style={styles.modalAddress}>{selectedCell.address}</Text>
                {userLocation && (
                  <Text style={styles.modalDistance}>
                    📍{' '}
                    {formatDistance(
                      calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        selectedCell.lat,
                        selectedCell.lng
                      )
                    )}{' '}
                    away
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.navigateButton}
                  onPress={() => handleNavigate(selectedCell)}
                >
                  <Text style={styles.navigateButtonText}>Navigate</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedCell(null)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 112, 186, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  headerTitle: { color: 'white', fontSize: 16, fontWeight: '700' },
  map: { flex: 1 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  modalAddress: { fontSize: 14, color: '#666', marginBottom: 8 },
  modalDistance: { fontSize: 14, color: '#0070BA', marginBottom: 12 },
  navigateButton: {
    backgroundColor: '#0070BA',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  navigateButtonText: { color: 'white', fontWeight: '600', fontSize: 14 },
  closeButton: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  closeButtonText: { color: '#333', fontWeight: '600', fontSize: 14 },
});

export default MapContainer;
