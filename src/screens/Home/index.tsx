import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import ProfileScreen from "./ProfileScreen";
import QuizScreen from "./QuizScreen";

const Tab = createBottomTabNavigator();
function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Quiz"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: {
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          headerTitle: "Асуулт",
          tabBarLabel: "Асуулт",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="alarm-snooze"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Хэрэглэгч",
          tabBarLabel: "Хэрэглэгч",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeNavigator;
