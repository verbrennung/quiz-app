import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Option from "../../components/Option";
import Questions from "../../utils/questions.json";

export default function QuestionScreen({ route, navigation }: any) {
  const { index, itemId = 0 } = route.params;
  return (
    <View>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={styles.questionNo}>
          {index + 1}/{Questions[itemId].questions.length}
        </Text>
      </View>
      <Text style={styles.Question}>
        {Questions[itemId].questions[index].question}
      </Text>
      {Questions[itemId].questions[index].answers.map(
        (option: any, i: React.Key | null | undefined) => (
          <Option
            itemId={itemId}
            value={option}
            navigation={navigation}
            optionIdx={i}
            qnIndex={index}
            key={i}
          />
        )
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  questionNo: {
    color: "red",
    fontSize: 25,
    margin: 20,
  },
  Question: {
    fontSize: 20,
    margin: 25,
  },
  nextButton: {
    height: 50,
    width: "20%",
    backgroundColor: "#3700B3",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    margin: 20,
    borderRadius: 15,
  },
  nextText: {
    color: "white",
    fontWeight: "900",
  },
});
