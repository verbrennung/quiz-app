import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import FlashMessage from "react-native-flash-message";
import { auth } from "./firebase";
import AuthenticationNavigator from "./src/screens/Authentication";
import HomeNavigator from "./src/screens/Home";
import SplashScreen from "./src/screens/SplashScreen";
export default function App() {
  const [loading, setLoading] = useState(true);
  const [isUser, isSetUser] = useState(false);

  onAuthStateChanged(auth, (user) => {
    isSetUser(!!user);
    setLoading(false);
  });

  const Stack = createNativeStackNavigator();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <FlashMessage position="top" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isUser && (
          <Stack.Screen name="Auth" component={AuthenticationNavigator} />
        )}
        {isUser && <Stack.Screen name="Home" component={HomeNavigator} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
