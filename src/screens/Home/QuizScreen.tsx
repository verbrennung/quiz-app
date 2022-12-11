import { Text, StyleSheet, View } from "react-native";

function QuizScreen() {
  return (
    <View style={styles.container}>
      <Text>Асуултууд</Text>
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

export default QuizScreen;
