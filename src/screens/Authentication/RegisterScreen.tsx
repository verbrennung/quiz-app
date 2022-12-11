import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUser } from "../../api/auth";
import { showMessage } from "react-native-flash-message";

export const errorLog = (code?: string) => {
  switch (code) {
    case "auth/user-not-found":
      return "Бүртгэлгүй хэрэглэгч";
    case "auth/invalid-email":
      return "Заавал и-мэйл оруулах";
    default:
      return "Алдаа гарлаа";
  }
};

function RegisterScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errMessage, setErrMessage] = useState("");
  const handleSignUp = async () => {
    await createUser(user)
      .then(() => {
        showMessage({
          message: "Бүртгэл амжилттай!",
          type: "success",
        });
        navigation.navigate("Login");
      })

      .catch((err) => {
        console.log(err.code);
        setErrMessage(errorLog(err.code));
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Image
        source={require("../../assets/authHeader.png")}
        style={{ marginTop: -116, marginLeft: -50 }}
      ></Image>
      <Image
        source={require("../../assets/authFooter.png")}
        style={{ position: "absolute", bottom: -325, right: -225 }}
      ></Image>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="ios-arrow-back" size={16} color="#FFF"></Ionicons>
      </TouchableOpacity>
      <Image
        source={require("../../assets/loginLogo.png")}
        style={{ marginTop: -200, alignSelf: "center" }}
      ></Image>
      {/* <View
        style={{
          position: "absolute",
          top: 64,
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={styles.avatarPlaceholder}
          onPress={handlePickAvatar}
        >
          {user?.avatar && (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          )}
          <Ionicons
            name="ios-add"
            size={40}
            color="#FFF"
            style={{ marginTop: 6, marginLeft: 2 }}
          ></Ionicons>
        </TouchableOpacity>
      </View> */}
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>хэрэглэгчийн нэр</Text>
          <TextInput
            style={styles.input}
            onChangeText={(name) =>
              setUser({
                ...user,
                name,
              })
            }
            value={user.name}
          ></TextInput>
        </View>

        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>И-мэйл</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(email) =>
              setUser({
                ...user,
                email,
              })
            }
            value={user.email}
          ></TextInput>
        </View>

        <View style={{ marginTop: 32 }}>
          <Text style={styles.inputTitle}>Нууц үг</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) =>
              setUser({
                ...user,
                password,
              })
            }
            value={user.password}
          ></TextInput>
        </View>
      </View>
      {!!errMessage && (
        <View style={styles.errorMessage}>
          <Text style={styles.error}>{errMessage}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={{ color: "#FFF", fontWeight: "500" }}>Бүртгүүлэх</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 32 }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "#414959", fontSize: 13 }}>
          Та өмнө бүртгүүлж байсан уу?{" "}
          <Text style={{ fontWeight: "500", color: "#E9446A" }}>Нэвтрэх</Text>
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
    marginTop: -10,
    marginHorizontal: 30,
    marginBottom: 48,
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
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
