import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { blue, lightBlue } from "../utils/colors";
import { connect } from "react-redux";

class Deck extends Component {
  render() {
    const { title, questionLength, deck, isDecks } = this.props;

    return (
      <View style={styles.cardDash}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("NewQuestionView", {
              deck,
              questionLength
            })
          }
          style={styles.availableDecks}
        >
          <Text style={styles.topText}>{title}</Text>
          <Text style={styles.cardText}>
            {questionLength} {questionLength === 1 ? "Card" : "Cards"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  availableDecks: {
    width: 250,
    height: 150,
    backgroundColor: blue,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10
  },
  cardDash: {
    marginBottom: 30
  },
  cardText: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  },
  topText: {
    textAlign: "center",
    fontSize: 32,
    color: lightBlue,
    paddingBottom: 20,
    fontWeight: "bold",
    color: "white"
  }
});

export default connect()(Deck);
