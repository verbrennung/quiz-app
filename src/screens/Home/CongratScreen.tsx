import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import { Button } from "react-native-elements";
import { auth } from "../../../firebase";
import { updateUserPoint } from "../../api/auth";
import { useStateData } from "../../context/StateProvider";

const CongratScreen = ({ navigation }: any) => {
  const { score, changeScore } = useStateData();
  const user = auth.currentUser;

  // save data
  // storeData(user, score);
  const storeData = async (uid: string) => {
    await updateUserPoint(uid, score);
  };
  useEffect(() => {
    if (user) {
      storeData(user?.uid);
    }
  }, [user]);

  return (
    <View style={styles.cogratsScreen}>
      <Text style={styles.congratsText}>
         Амжилттай,{`\n`} Та {score} оноо авлаа.
      </Text>
      <Divider width={100} />
      <Button
        title="Хэрэглэгчийн хуудас"
        type="solid"
        onPress={() => {
          changeScore(-1);
          navigation.navigate("Profile");
        }}
      />
    </View>
  );
};

export default CongratScreen;

const styles = StyleSheet.create({
  cogratsScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  congratsText: {
    fontSize: 26,
    textAlign: "center",
    marginVertical: 20,
  },
  scoreStyle: {
    position: "relative",
    bottom: 105,
    fontSize: 45,
    fontWeight: "800",
  },
});
