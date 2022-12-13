import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import questions from "../../utils/questions.json";

const imageSrc =
  "https://media.istockphoto.com/id/1268465415/photo/quiz-time-concept-speech-bubble-with-pencil-on-yellow-background.jpg?s=612x612&w=0&k=20&c=ZowfYpCJeyknpWhnfyWqV1_If6aJmFUiSqqqEUBhvAg=";

function QuizScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
        {questions.map((question, index) => (
          <View style={styles.cardContainer}>
            <Image
              source={{ uri: imageSrc }}
              style={{
                width: 350,
                height: 140,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            />
            <Text style={{ margin: 16 }}>{question.title}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("QuestionScreen", { itemId: index })
              }
              style={{
                marginLeft: 16,
                marginTop: 8,
                marginRight: 16,
                marginBottom: 16,
                width: 160,
                backgroundColor: "#F2918F",
                padding: 10,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text style={{}}>Эхлүүлэх</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 20,
  },
});

export default QuizScreen;
