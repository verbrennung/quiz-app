import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import { auth } from "../../../firebase";
import { getMe } from "../../api/auth";

function ProfileScreen() {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState({});
  const user = auth.currentUser;

  const handleSignOut = () => {
    signOut(auth).then(() => {
      showMessage({
        message: "Системээс гарлаа!!",
        type: "warning",
      });

      return navigation.navigate("Auth");
    });
  };

  const fetch = async (uid: string) => {
    await getMe(uid).then((res) => setCurrentUser(res || {}));
  };
  useEffect(() => {
    if (user) {
      fetch(user?.uid);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text>{currentUser?.name}</Text>
      <Text>Хэрэглэгчийн оноо: {currentUser?.point}</Text>
      <Button onPress={handleSignOut} title="Гарах" />
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

export default ProfileScreen;
