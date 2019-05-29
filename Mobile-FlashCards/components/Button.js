import React from 'react';
import { Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';


export default function SubmitBtn({ onPress }) {
    return (
      <TouchableOpacity
        style={
          Platform.OS === "ios" ? style.iosSubmitBtn : style.AndroidSubmitBtn
        }
        onPress={onPress}
      >
        <Text style={style.submitBtnText}>SUBMIT</Text>
      </TouchableOpacity>
    );
  }



  const style = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
      },
      AndroidSubmitBtn: {
        backgroundColor: 'blue',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center"
      },
      submitBtnText: {
        color: 'white',
        fontSize: 22,
        textAlign: "center"
      },
  })