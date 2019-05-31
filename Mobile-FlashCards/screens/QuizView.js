import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { blue, white, darkBlue } from "../utils/colors";
import SubmitBtn from '../components/Button';


class QuizView extends Component {
  state = {
    isReady: false,
    isComplete: false
  };

  componentDidMount() {
    const { stateDeck } = this.props;
    const questions = stateDeck.questions;
    let currentQuestionIndex = 0;
    this.setState({
      isReady: true,
      questionLength: questions ? stateDeck.questions.length : 0,
      currentQuestionIndex: currentQuestionIndex,
      currentQuestion: questions[currentQuestionIndex],
      showAnswer: false,
      correct: 0,
      incorrect: 0
    });
  }
  showAnswer = () => {
    this.setState({
      showAnswer: true
    });
  };

  goToNext = () => {
    const { stateDeck } = this.props;
    const questions = stateDeck.questions;
    const { questionLength, currentQuestionIndex } = this.state;

    if (questionLength === currentQuestionIndex + 1) {
      this.setState({
        isComplete: true
      });
    } else {
      this.setState(currState => {
        const newCurrentQuestionIndex = currState.currentQuestionIndex + 1;
        return {
          currentQuestionIndex: newCurrentQuestionIndex,
          currentQuestion: questions[newCurrentQuestionIndex],
          showAnswer: false
        };
      });
    }
  };

  addCorrect = () => {
    this.setState(currState => ({
      correct: currState.correct + 1
    }));

    this.goToNext();
  };
  addIncorrect = () => {
    this.setState(currState => ({
      incorrect: currState.incorrect + 1
    }));
    this.goToNext();
  };

  tryAgain = () => {
    const { stateDeck } = this.props;
    const questions = stateDeck.questions;

    this.setState({
      currentQuestionIndex: 0,
      currentQuestion: questions[0],
      showAnswer: false,
      correct: 0,
      incorrect: 0,
      isComplete: false
    });
  };

  exit = () => {
    this.props.navigation.navigate("DeckList");
  };
  render() {
    const { stateDeck } = this.props;
    const { isReady, isComplete } = this.state;

    if (stateDeck && isReady && isComplete === false) {
      const {
        questionLength,
        currentQuestionIndex,
        currentQuestion,
        showAnswer,
        correct,
        incorrect
      } = this.state;
      return (
        <View style={styles.container}>
          <Text style={styles.questionHeading}>
            Question {currentQuestionIndex + 1} of {questionLength}
          </Text>

          {showAnswer === false && (
            <View>
              <Text style={styles.miniHeader}>Question</Text>
              <Text style={styles.QnAText}>{currentQuestion.question}</Text>
              <View style={styles.buttonContainer}>
                <SubmitBtn 
                onPress={this.showAnswer}
                btnText='Show Answer'
                />
              </View>
            </View>
          )}
          {showAnswer === true && (
            <View>
              <Text style={styles.miniHeader}>Answer</Text>
              <Text style={styles.QnAText}>{currentQuestion.answer}</Text>
              <SubmitBtn 
              btnText='Correct'
              onPress={this.addCorrect}/>
              <SubmitBtn 
              btnText='Incorrect'
              onPress={this.addIncorrect}/>
  
            </View>
          )}
        </View>
      );
    }

    if (isComplete === true) {
      const { questionLength, correct, incorrect } = this.state;
      return (
        <View style={styles.container}>
          <Text style={styles.questionHeading}>Quiz Complete</Text>
          <Text style={styles.miniHeader}> Your Score </Text>
          <Text style={styles.QnAText}>
            {" "}
            {correct} / {questionLength}{" "}
          </Text>
          <Text style={styles.QnAText}>
            {" "}
            {Math.round((correct / questionLength) * 100)}%{" "}
          </Text>
          <SubmitBtn 
          btnText='Try Again'
          onPress={this.tryAgain}/>
          <SubmitBtn 
          btnText='Try Again'
          onPress={this.exit}/>
          {/* <Buttons onPress={this.tryAgain}>Try again</Buttons>
          <Buttons onPress={this.exit}>Exit Quiz</Buttons> */}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          There was an error loading this deck. Please try again later.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  questionHeading: {
    fontSize: 20
  },
  miniHeader: {
    fontSize: 16,
    color: blue,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 15
  },
  QnAText: {
    fontSize: 42,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center"
  }
});
function mapStateToProps(state, { navigation }) {
  const { stateDeck } = navigation.state.params;
  return {
    stateDeck
  };
}

export default connect(mapStateToProps)(QuizView);
