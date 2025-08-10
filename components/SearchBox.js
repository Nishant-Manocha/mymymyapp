import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Search, X } from "lucide-react-native";

const GOMAPS_API_KEY = "AlzaSy6c_lnJIj7yBHJNgP8HlJ-l_oUdKTIJ7mw"; // Replace with your actual GoMaps key

const SearchBox = ({ onLocationSelect, onSearchComplete }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch autocomplete suggestions
  const fetchSuggestions = async (text) => {
    setQuery(text);
    if (text.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          text
        )}&key=${GOMAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    }
  };

  // Handle user selecting a suggestion
  const handleSelect = async (placeId, description) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${GOMAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.result.geometry.location;
        onLocationSelect({ latitude: location.lat, longitude: location.lng });
        onSearchComplete(description);
        setQuery(description);
        setSuggestions([]);
      } else {
        Alert.alert("Error", "Failed to fetch place details.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch place details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Manual search button action (select first suggestion)
  const handleSearch = () => {
    if (suggestions.length > 0) {
      const first = suggestions[0];
      handleSelect(first.place_id, first.description);
    } else {
      Alert.alert("No suggestions", "Please enter a valid location.");
    }
  };

  // Reset the search field
  const handleReset = () => {
    setQuery("");
    setSuggestions([]);
    onSearchComplete("");
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search for city or address"
          value={query}
          onChangeText={fetchSuggestions}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <X size={18} color="#666" />
          </TouchableOpacity>
        )}
        {isLoading && <Text style={styles.loadingText}>...</Text>}
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Autocomplete Suggestions */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSelect(item.place_id, item.description)}
            >
              <Text style={styles.suggestionText}>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    margin: 16,
    shadowColor: "#0070BA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  resetButton: {
    marginLeft: 8,
  },
  loadingText: {
    marginLeft: 8,
    color: "#0070BA",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  searchButton: {
    backgroundColor: "#0070BA",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  resetBtn: {
    backgroundColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
  },
  resetBtnText: {
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  suggestionsList: {
    marginTop: 4,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 12,
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
    color: "#333",
  },
});

export default SearchBox;
