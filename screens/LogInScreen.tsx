import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import * as firebase from "firebase";

import { RootStackParamList } from "../types";
import {Fontisto} from "@expo/vector-icons";

import { Button, Spinner } from "native-base";
import theme from "../assets/theme";
import DDTextInput from "../components/DDTextInput";
import DDButton from "../components/DDButton";
export default function LogInScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) {
  const [email, setEmail] = useState("dev@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const navigateApp = async () => {

    try {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((r) => {
          navigation.replace("Root");
        })
        .catch((e) => {
          alert(JSON.stringify(e.message));
          setLoading(false);
        });
    } catch (e) {
      alert(JSON.stringify(e.message));
      setLoading(false);
    }
  };

  const EmailIcon = () => (
    <Fontisto
      style={{ marginLeft: 10 }}
      color={theme.orange}
      name={"email"}
      size={18}
    />
  );
  const PasswordIcon = () => (
    <Fontisto
      style={{ marginLeft: 10 }}
      color={theme.orange}
      name={"locked"}
      size={18}
    />
  );

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 400 , height: 100}}
        resizeMode={"contain"}
        source={require("../assets/images/mainLogo.png")}
      />

      <DDTextInput icon={ <EmailIcon/>} onTextChange={setEmail} placeholder={"Email"}/>
      <DDTextInput icon={  <PasswordIcon />} onTextChange={setPassword} placeholder={"Password"}/>
      <View/>
      {!loading && (
        <>
          <DDButton onSubmit={navigateApp} text={"Login"}/>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.SignUpText}>Create New Account</Text>
          </TouchableOpacity>
        </>
      )}
      {loading && <Spinner color={theme.orange} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    flex: 1,
  },
  topNav: {
    marginTop: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "normal",
    fontSize: 50,
    color: "#fff",
    marginBottom: 70,
  },
  inputView: {
    width: "82%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 50,
    margin: 10,
    marginLeft: 10,
    borderColor: theme.orange,
    borderWidth: 0.6
  },
  inputText: {
    flex: 1,
    height: 50,
    padding: 10,
    color: theme.darkestGrey,
  },
  forgot: {
    color: "#B32120",
    fontSize: 15,
    marginTop: 18,
  },
  loginBtn: {
    width: "82%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: theme.white,
    marginHorizontal: 30,
    borderWidth: 0.6,
    borderColor: theme.orange
  },
  SignUpText: {
    color: theme.orange,
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
