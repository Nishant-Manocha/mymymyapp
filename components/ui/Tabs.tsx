import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  style?: any;
}

interface TabsListProps {
  children: React.ReactNode;
  style?: any;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  style?: any;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  style?: any;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: "",
  onValueChange: () => {},
});

export function Tabs({ value, onValueChange, children, style }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <View style={[styles.tabs, style]}>{children}</View>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, style }: TabsListProps) {
  return <View style={[styles.tabsList, style]}>{children}</View>;
}

export function TabsTrigger({
  value: triggerValue,
  children,
  style,
}: TabsTriggerProps) {
  const { value, onValueChange } = React.useContext(TabsContext);
  const isActive = value === triggerValue;

  return (
    <TouchableOpacity
      onPress={() => onValueChange(triggerValue)}
      style={[
        styles.tabsTrigger,
        isActive ? styles.tabsTriggerActive : styles.tabsTriggerInactive,
        style,
      ]}
    >
      <Text
        style={[
          styles.tabsTriggerText,
          isActive
            ? styles.tabsTriggerTextActive
            : styles.tabsTriggerTextInactive,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export function TabsContent({
  value: contentValue,
  children,
  style,
}: TabsContentProps) {
  const { value } = React.useContext(TabsContext);

  if (value !== contentValue) {
    return null;
  }

  return <View style={[styles.tabsContent, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  tabs: {
    width: "100%",
  },
  tabsList: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#334155",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tabsTrigger: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabsTriggerActive: {
    backgroundColor: "#0f172a",
  },
  tabsTriggerInactive: {
    backgroundColor: "transparent",
  },
  tabsTriggerText: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabsTriggerTextActive: {
    color: "#f1f5f9",
  },
  tabsTriggerTextInactive: {
    color: "#94a3b8",
  },
  tabsContent: {
    marginTop: 8,
  },
});
