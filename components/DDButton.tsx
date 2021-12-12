import * as WebBrowser from "expo-web-browser";
import React from "react";
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";


import { Text, View } from "./Themed";
import theme from "../assets/theme";
import {Button} from "native-base";

interface btnProps{
  text: string,
  onSubmit: ()=>void
}
export default function DDButton({ text,onSubmit }: btnProps) {
  return (
       <Button style={styles.btn} onPress={() => onSubmit()}>
         <Text style={{ color: theme.white, fontSize: 17 }}>{text}</Text>
       </Button>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "82%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: theme.orange,
    marginHorizontal: 30,
    borderWidth: 0.6,
    borderColor: theme.orange
  },
});
