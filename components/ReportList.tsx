import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import API from "../api/api";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

const ReportList: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get("/reports");
        const data = res.data;
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.warn("Fetched reports is not an array");
        }
      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };

    fetchReports();
  }, []);

  const renderIcon = (type: string) => {
    const iconStyle = {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
      borderWidth: 2,
      borderColor: 'white',
    };

    switch (type) {
      case "phishing":
        return (
          <View style={[iconStyle, { backgroundColor: '#EF4444' }]}>
            <MaterialIcons name="email" size={24} color="white" />
          </View>
        );
      case "card-fraud":
        return (
          <View style={[iconStyle, { backgroundColor: '#3B82F6' }]}>
            <FontAwesome5 name="credit-card" size={22} color="white" />
          </View>
        );
      case "ponzi":
        return (
          <View style={[iconStyle, { backgroundColor: '#F59E0B' }]}>
            <FontAwesome5 name="coins" size={22} color="white" />
          </View>
        );
      case "romance":
        return (
          <View style={[iconStyle, { backgroundColor: '#EC4899' }]}>
            <Ionicons name="heart" size={24} color="white" />
          </View>
        );
      case "tax-fraud":
        return (
          <View style={[iconStyle, { backgroundColor: '#8B5CF6' }]}>
            <FontAwesome5 name="file-invoice-dollar" size={22} color="white" />
          </View>
        );
      case "student-loan":
        return (
          <View style={[iconStyle, { backgroundColor: '#10B981' }]}>
            <Ionicons name="school" size={24} color="white" />
          </View>
        );
      default:
        return (
          <View style={[iconStyle, { backgroundColor: '#6B7280' }]}>
            <Ionicons name="alert-circle" size={24} color="white" />
          </View>
        );
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.icon}>{renderIcon(item.type)}</View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.type}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.contact}>📞 {item.contactInfo}</Text>
        <Text style={styles.location}>
          {/* 📍 {item.address} {item.city ? , ${item.city} : ""} */}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Submitted Scam Reports</Text>
      <FlatList
        data={reports}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#f8fafc" 
  },
  heading: { 
    fontSize: 22, 
    fontWeight: "700", 
    marginBottom: 20, 
    textAlign: "center",
    color: "#1f2937",
    letterSpacing: 0.3,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 14,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.05)",
    borderLeftWidth: 3,
    borderLeftColor: "#3B82F6",
  },
  icon: { 
    marginRight: 12, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  info: { 
    flex: 1, 
    justifyContent: "center" 
  },
  title: { 
    fontSize: 16, 
    fontWeight: "700", 
    marginBottom: 4,
    color: "#1f2937",
    textTransform: "capitalize",
  },
  desc: { 
    fontSize: 14, 
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 4,
    fontWeight: "500",
  },
  contact: { 
    fontSize: 13, 
    color: "#2563eb", 
    marginTop: 4,
    fontWeight: "600",
  },
  location: { 
    fontSize: 12, 
    color: "#9ca3af", 
    marginTop: 2,
    fontWeight: "500",
  },
});

export default ReportList;

