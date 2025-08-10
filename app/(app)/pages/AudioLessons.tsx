import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

import LanguageScreen from "./LanguageScreen";
import LessonScreen from "./LessonScreen";
import QuizScreen from "./QuizScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack.Navigator
        id={undefined}
        initialRouteName="Language"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
