import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { blue, white, darkBlue } from "../utils/colors";
import SubmitBtn from "../components/Button";
import { addQuestionToDeck } from "../actions";
import { connect } from "react-redux";
import { addCardToDeck } from "../utils/api";
import { NavigationActions } from "react-navigation";

class AddQuestion extends Component {
  state = {
    question: "",
    answer: "",
    isQBlank: "",
    isABlank: "",
    isSubmit: ""
  };

  handleQuestionChange = text => {
    this.setState({
      question: text.nativeEvent.text
    });
  };

  handleAnswerChange = text => {
    this.setState({
      answer: text.nativeEvent.text
    });
  };

  submitDeck = () => {
    const { question, answer } = this.state;

    question && answer
      ? this.setState({ isSubmit: true })
      : this.setState({ isSubmit: false });

    !question
      ? this.setState({ isQBlank: true })
      : this.setState({ isQBlank: false });

    !answer
      ? this.setState({ isABlank: true })
      : this.setState({ isABlank: false });

    const { stateDeck, stateQuestionLength } = this.props;
    if (question && answer) {
      this.props.dispatch(addQuestionToDeck(stateDeck.id, question, answer));
      addCardToDeck(stateDeck, question, answer);

      this.toHome(stateDeck);
    }
  };

  toHome = deck => {
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
    const { stateDeck, stateQuestionLength } = this.props;
    const { isSubmit, isABlank, isQBlank } = this.state;
    if (stateDeck) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={styles.titleText}>
            Add a new question to your {stateDeck.title} deck:
          </Text>

          <TextInput
            maxLength={75}
            onChange={text => this.handleQuestionChange(text)}
            style={styles.input}
            placeholder="Question"
          />

          <Text style={styles.error}>
            {isQBlank === true ? "This field is required" : ""}
          </Text>

          <TextInput
            maxLength={75}
            onChange={text => this.handleAnswerChange(text)}
            style={styles.input}
            placeholder="Answer"
          />

          <Text style={styles.error}>
            {isABlank === true ? "This field is required" : ""}
          </Text>

          <SubmitBtn btnText="Submit" onPress={this.submitDeck} />
        </KeyboardAvoidingView>
      );
    }
    return (
      <View>
        <Text>
          There was an error loading this page. Please try again later.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8
  },
  titleText: {
    fontSize: 20,
    width: 300,
    marginBottom: 10,
    marginTop: 100,
    textAlign: "center"
  },
  error: {
    color: "red"
  }
});

function mapStateToProps(state, { navigation }) {
  const { stateDeck, stateQuestionLength } = navigation.state.params;
  return {
    stateDeck,
    stateQuestionLength
  };
}

export default connect(mapStateToProps)(AddQuestion);
