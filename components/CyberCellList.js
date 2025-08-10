import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';

const CyberCellList = ({ nearbyCells, userLocation }) => {
  if (!nearbyCells || nearbyCells.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No nearby cyber cells found.</Text>
      </View>
    );
  }

  const handleNavigate = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open maps app.');
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>
      {userLocation && item.distance !== undefined && (
        <Text style={styles.distance}>
          Distance: {item.distance.toFixed(2)} km
        </Text>
      )}
      <Text style={styles.info}>📞 {item.phone || 'N/A'}</Text>
      <Text style={styles.info}>📧 {item.email || 'N/A'}</Text>

      <TouchableOpacity
        style={styles.navigateButton}
        onPress={() => handleNavigate(item.lat, item.lng)}
      >
        <Text style={styles.navigateButtonText}>Navigate</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={nearbyCells}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      style={styles.list}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
    paddingHorizontal: 2,
  },
  itemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 186, 0.08)',
    borderLeftWidth: 4,
    borderLeftColor: '#0070BA',
  },
  name: {
    fontWeight: '800',
    fontSize: 16,
    color: '#0070BA',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  address: {
    color: '#6b7280',
    marginTop: 3,
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  distance: {
    marginTop: 8,
    fontWeight: '700',
    color: '#059669',
    fontSize: 13,
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    letterSpacing: 0.3,
  },
  info: {
    marginTop: 6,
    color: '#4b5563',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  navigateButton: {
    marginTop: 12,
    backgroundColor: '#0070BA',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 186, 0.2)',
  },
  navigateButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 112, 186, 0.05)',
    borderRadius: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 186, 0.1)',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});

export default CyberCellList;