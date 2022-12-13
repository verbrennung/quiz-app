import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import FlashMessage from "react-native-flash-message";
import { auth } from "./firebase";
import { StateProvider } from "./src/context/StateProvider";
import AuthenticationNavigator from "./src/screens/Authentication";
import HomeNavigator from "./src/screens/Home";
import CongratScreen from "./src/screens/Home/CongratScreen";
import QuestionScreen from "./src/screens/Home/QuestionScreen";
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
    <StateProvider>
      <NavigationContainer>
        <FlashMessage position="top" />
        <Stack.Navigator>
          {!isUser && (
            <Stack.Screen
              name="Auth"
              options={{
                headerShown: false,
              }}
              component={AuthenticationNavigator}
            />
          )}
          {isUser && (
            <>
              <Stack.Screen
                name="Home"
                options={{
                  headerShown: false,
                }}
                component={HomeNavigator}
              />

              <Stack.Screen
                name="QuestionScreen"
                component={QuestionScreen}
                initialParams={{ index: 0 }}
                options={{
                  title: "Асуултууд",
                }}
              />
              <Stack.Screen
                name="CongratsScreen"
                component={CongratScreen}
                initialParams={{ index: 0 }}
                options={{
                  title: "Үр дүн",
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}
