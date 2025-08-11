import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";
import API from "../api/api";
import { apiCall } from "../utils/api";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import axios from "axios";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useReports } from "../contexts/ReportContext";
import { useNavigation } from "@react-navigation/native";
// import SecureTextInput from "./SecureTextInput";

const SCAM_TYPES = [
  { label: "Phishing Attack", value: "phishing" },
  { label: "Credit Card Fraud", value: "card-fraud" },
  { label: "Ponzi Scheme", value: "ponzi" },
  { label: "Romance Scam", value: "romance" },
  { label: "Tax Fraud", value: "tax-fraud" },
  { label: "Student Loan Scam", value: "student-loan" },
];

const AnimatedTouchable = ({ onPress, style, children }) => {
  const scale = useState(new Animated.Value(1))[0];

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        style={style}
        activeOpacity={0.85}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const ReportForm: React.FC = () => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [predictions, setPredictions] = useState<any[]>([]);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const apiKey = process.env.GOOGLE_MAPS_KEY;

  const { addReport } = useReports();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to report a scam."
        );
      }
    })();
  }, []);

  const fetchPredictions = async (text: string) => {
    setAddress(text);
    if (text.length < 3) {
      setPredictions([]);
      return;
    }
    try {
      const res = await axios.get(
       ` https://maps.gomaps.pro/maps/api/place/autocomplete/json`,
        { params: { input: text, key: apiKey } }
      );
      if (res.data.predictions) setPredictions(res.data.predictions);
    } catch (error) {
      console.error("Autocomplete Error:", error);
    }
  };

  const selectPrediction = async (placeId: string, description: string) => {
    setAddress(description);
    setPredictions([]);
    try {
      const res = await axios.get(
        `https://maps.gomaps.pro/maps/api/place/details/json`,
        { params: { place_id: placeId, key: apiKey } }
      );
      const loc = res.data.result.geometry.location;
      setLocation({ latitude: loc.lat, longitude: loc.lng });

      const cityComp = res.data.result.address_components.find((c: any) =>
        c.types.includes("locality")
      );
      setCity(cityComp ? cityComp.long_name : "");
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location details");
    }
  };

  const useCurrentLocation = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      const res = await axios.get(
        `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${loc.coords.latitude},${loc.coords.longitude}&key=${apiKey}`
      );

      if (res.data.results.length > 0) {
        const addressData = res.data.results[0];
        setAddress(addressData.formatted_address);
        const cityComp = addressData.address_components.find((c: any) =>
          c.types.includes("locality")
        );
        setCity(cityComp ? cityComp.long_name : "");
      } else {
        setAddress("Detected but address not found");
      }

      setPredictions([]);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch current location");
    }
  };

  const handleReset = () => {
    setAddress("");
    setCity("");
    setPredictions([]);
    setLocation({ latitude: 0, longitude: 0 });
  };

  const handleSubmit = async () => {
    if (!type || !description || !contactInfo || !address) {
      Alert.alert("Error", "All fields including address are required");
      return;
    }

    try {
      const SERVER_URL = process.env.SERVER_URL;
      const { success, data, error } = await apiCall('/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          description,
          contactInfo,
          address,
          city,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });

      if (!success) {
        throw new Error(error || 'Failed to submit report');
      }

      addReport(data);

      Alert.alert("Success", "Scam report submitted!");
      setType("");
      setDescription("");
      setContactInfo("");
      handleReset();
      navigation.navigate("Map" as never);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit report");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Report a Scam</Text>
      </View>

      <Text style={styles.label}>Scam Type</Text>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Scam Type" value="" />
        {SCAM_TYPES.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Describe the scam..."
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Your Contact Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone or Email"
        value={contactInfo}
        onChangeText={setContactInfo}
      />

      <Text style={styles.label}>Address</Text>
      <View style={styles.addressContainer}>
        <TextInput
          style={styles.inputAddress}
          placeholder="Search or enter address..."
          value={address}
          onChangeText={fetchPredictions}
        />
        {address.length > 0 && (
          <TouchableOpacity style={styles.crossBtn} onPress={handleReset}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.predictionItem}
              onPress={() => selectPrediction(item.place_id, item.description)}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <AnimatedTouchable style={styles.detectBtn} onPress={useCurrentLocation}>
        <Ionicons name="locate" size={20} color="white" />
        <Text style={styles.detectBtnText}> Detect My Location</Text>
      </AnimatedTouchable>

      <AnimatedTouchable style={styles.submitBtn} onPress={handleSubmit}>
        <FontAwesome5 name="paper-plane" size={18} color="white" />
        <Text style={styles.submitText}> Submit Report</Text>
      </AnimatedTouchable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  headingWrapper: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  label: { fontSize: 16, marginTop: 10 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  inputAddress: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  crossBtn: {
    backgroundColor: "#dc3545",
    padding: 10,
    marginLeft: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  predictionItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detectBtn: {
    flexDirection: "row",
    backgroundColor: "#17a2b8",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    shadowColor: "#17a2b8",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  detectBtnText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 16,
  },
  submitBtn: {
    flexDirection: "row",
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#28a745",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default ReportForm;