import { View, StyleSheet } from "react-native";
import { WaveIndicator } from "react-native-indicators";
function SplashScreen() {
  return (
    <View style={styles.container}>
      <WaveIndicator size={60} animationDuration={2000} color="#E9446A" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
