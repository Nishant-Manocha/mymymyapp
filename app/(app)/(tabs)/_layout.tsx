import { Tabs } from "expo-router";
import { Home, Brain, BookOpen, User, Wrench } from "lucide-react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { PSBColors } from "../../../utils/PSBColors";

export default function TabLayout() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background[0],
          borderTopColor: theme.colors.border,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: PSBColors.primary.green,
        tabBarInactiveTintColor: PSBColors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="tools"
        options={{
          title: "Tools",
          tabBarIcon: ({ size, color }) => <Wrench size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="simulator"
        options={{
          title: "Simulators",
          tabBarIcon: ({ size, color }) => <Brain size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: "Learn",
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
