import React, { useState } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import MapContainer from "../../../components/MapContainer";
import SearchBox from "../../../components/SearchBox";
import CyberCellList from "../../../components/CyberCellList";
import GeolocationButton from "../../../components/GeolocationButton";
import { calculateDistance } from "../../../utils/distance";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../../../api/api"; // adjust the path if needed

export default function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    latitude: 28.6139,
    longitude: 77.209,
  });
  const [nearbyCells, setNearbyCells] = useState([]);
  const [currentAddress, setCurrentAddress] = useState("");

  // ✅ Fetch cyber cells from backend
  const fetchCyberCells = async (lat: number, lng: number) => {
    try {
      const res = await API.get("/nearby-cybercells", {
        params: { lat, lng, radius: 10000 },
      });

      const data = res.data || [];

      const updatedCells = data.map((cell: any) => ({
        ...cell,
        distance: calculateDistance(lat, lng, cell.lat, cell.lng),
      }));

      setNearbyCells(updatedCells);
    } catch (error: any) {
      console.error("❌ Failed to fetch cyber cells:", error?.message || error);
    }
  };

  const handleLocationSelect = (location) => {
    setUserLocation(location);
    setMapCenter(location);
    fetchCyberCells(location.latitude, location.longitude);
  };

  const handleSearchComplete = (address) => {
    setCurrentAddress(address);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <SearchBox
            onLocationSelect={handleLocationSelect}
            onSearchComplete={handleSearchComplete}
          />
          <GeolocationButton
            onLocationFound={handleLocationSelect}
            disabled={false}
          />
          {currentAddress ? (
            <Text style={styles.addressText}>📍 Current: {currentAddress}</Text>
          ) : null}
        </View>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          <MapContainer
            userLocation={userLocation}
            nearbyCells={nearbyCells}
            center={mapCenter}
          />
        </View>

        {/* Cyber Cell List Section */}
        <View style={styles.sidebar}>
          <CyberCellList
            nearbyCells={nearbyCells}
            userLocation={userLocation}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f1f5f9", // soft light background
  },
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  addressText: {
    marginTop: 10,
    color: "#10b981", // green accent
    fontWeight: "600",
    fontSize: 14,
  },
  mapContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  sidebar: {
    maxHeight: 260,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
});
