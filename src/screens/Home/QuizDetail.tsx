import { Text, View } from "react-native";

function QuizDetail({ route }: any) {
  const { itemId } = route.params;
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

export default QuizDetail;
