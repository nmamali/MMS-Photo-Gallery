import * as WebBrowser from "expo-web-browser";
import React from "react";
import {StyleSheet, TextInput, TouchableOpacity} from "react-native";


import { Text, View } from "./Themed";
import theme from "../assets/theme";

interface inputProps{
  icon: any,
  onTextChange: (text: string)=> void,
  placeholder: string
}
export default function DDTextInput({ icon, onTextChange, placeholder }: inputProps) {
  return (
      <View style={styles.inputView}>
        {icon}
        <TextInput
            style={styles.inputText}
            placeholderTextColor={theme.darkestGrey}
            placeholder={placeholder}
            autoCapitalize="none"
            onChangeText={(text) => onTextChange(text)}
        />
      </View>
  );
}

const styles = StyleSheet.create({
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
});
