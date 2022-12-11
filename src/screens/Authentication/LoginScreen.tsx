import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { auth } from "../../../firebase";

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  }, []);

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showMessage({
          message: "Амжилттай нэвтрлээ!!",
          type: "success",
        });
        navigation.navigate("Home");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          setErrorMessage("Бүртгэлгүй хэрэглэгч!");
          return;
        }
        if (
          err.code === "auth/wrong-password" ||
          err.code === "auth/too-many-requests"
        ) {
          return setErrorMessage("И-мэйл эсвэл нууц үг буруу!");
        }
        return setErrorMessage("Буруу утга оруулсан байна!");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Image
        source={require("../../assets/authHeader.png")}
        style={{ marginTop: -176, marginLeft: -50 }}
      ></Image>
      <Image
        source={require("../../assets/authFooter.png")}
        style={{ position: "absolute", bottom: -325, right: -225 }}
      ></Image>
      <Image
        source={require("../../assets/loginLogo.png")}
        style={{ marginTop: -110, alignSelf: "center" }}
      ></Image>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>И-мэйл</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            value={email}
          ></TextInput>
        </View>

        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>Нууц үг</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
          ></TextInput>
        </View>
      </View>
      {!!errorMessage && (
        <View style={styles.errorMessage}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "#FFF", fontWeight: "500" }}>Нэвтрэх</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 32 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: "#414959", fontSize: 13 }}>
          Шинэ хэрэглэгч үү?{" "}
          <Text style={{ fontWeight: "500", color: "#E9446A" }}>
            Бүртгүүлэх
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessage: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default LoginScreen;
