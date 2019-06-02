import React from "react";
import { lightPurple, blue } from '../utils/colors'
import { Text, TouchableOpacity, Platform, StyleSheet } from "react-native";

export default function SubmitBtn({ onPress, style, btnText }) {
  return (
    <TouchableOpacity
      style={[
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
        style
      ]}
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>{btnText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  submitBtnText: {
    color: "white",
    fontSize: 22,
    textAlign: "center"
  }
});
