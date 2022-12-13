import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useStateData } from "../context/StateProvider";
import Questions from "../utils/questions.json";

const Option = (props: any) => {
  const { itemId = 0 } = props;
  const { changeScore } = useStateData();
  const updateScore = (s: number) => {
    changeScore(s);
  };

  let correctAnswerIdx =
    Questions[itemId].questions[props.qnIndex].correctIndex;
  return (
    <TouchableOpacity
      onPress={() => {
        props.optionIdx === correctAnswerIdx ? updateScore(1) : updateScore(0);
        if (props.qnIndex + 1 >= Questions[itemId].questions.length) {
          props.navigation.navigate("CongratsScreen");
        } else {
          props.navigation.navigate("QuestionScreen", {
            index: props.qnIndex + 1,
          });
        }
      }}
    >
      <View style={[styles.Option]}>
        <Text style={styles.OptionText}>{props.value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Option;

const styles = StyleSheet.create({
  Option: {
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    marginBottom: 3,
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDECEC",
  },
  OptionText: {
    fontSize: 20,
  },
});
