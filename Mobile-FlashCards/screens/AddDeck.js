import React, { Component } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import SubmitBtn from "../components/Button";
import { connect } from "react-redux"
import { saveDeck, generateID } from "../utils/api";
import { addDeck } from "../actions";
import { NavigationActions } from "react-navigation";

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isSubmit: "",
      deck: {}
    };
  }


  submitDeck = () => {
    const { text } = this.state;

    if (!text) {
      this.setState({ isSubmit: false });
    } else {
      this.setState({ isSubmit: true });
      const id = generateID();
      const newDeck = { id, title: this.state.text, questions: [] };

      this.setState({ deck: newDeck }, this.toHome(newDeck));

      this.props.dispatch(addDeck(newDeck));

      saveDeck(newDeck);
    }
  }

goToHome = () => {
this.props.navigation.navigate('Home')
}

toHome = deck => {
  const { text } = this.state;
  const questions = deck.questions;
  const questionLength = questions ? deck.questions.length : 0;

  this.props.navigation.dispatch(
    NavigationActions.navigate({
      routeName: "NewQuestionView",
      params: { deck, questionLength }
    })
  );
};
  render() {
    const { text, isSubmit } = this.state;
    console.log(text);
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 34, marginBottom: 20 }}>
          What is the title of your new deck?
        </Text>
        <View style={{ marginHorizontal: 10 }}>
          <TextInput
            style={{
              borderColor: "#000000",
              borderWidth: 1,
              borderRadius: 8,
              padding: 10
            }}
            placeholder="Deck title"
            onChangeText={text => this.setState({ text: text })}
          />
           <Text style={styles.error}>
          {isSubmit === false ? "This field is required" : ""}
        </Text>
        </View>
        <SubmitBtn 
        btnText='Submit'
        style={styles.btnStyle} onPress={this.submitDeck} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 20
  },
  error: {
    color: "red"
  }
});

export default connect()(AddDeck);
