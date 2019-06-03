import React, { Component } from "react";
import { View, Text, StyleSheet} from "react-native";
import { connect } from "react-redux";
import { blue, darkBlue } from "../utils/colors";
import SubmitBtn from "../components/Button";

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

  addCorrectAnwser = () => {
    this.setState(currState => ({
      correct: currState.correct + 1
    }));

    this.goToNext();
  };
  addIncorrectAnswer = () => {
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
        showAnswer
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
                  style={{ marginVertical: 10 }}
                  onPress={this.showAnswer}
                  btnText="Show Answer"
                />
              </View>
            </View>
          )}
          {showAnswer === true && (
            <View>
              <Text style={styles.miniHeader}>Answer</Text>
              <Text style={styles.QnAText}>{currentQuestion.answer}</Text>
              <SubmitBtn
                style={{ marginVertical: 20 }}
                btnText="Correct"
                onPress={this.addCorrectAnwser}
              />
              <SubmitBtn
                btnText="Incorrect"
                onPress={this.addIncorrectAnswer}
              />
            </View>
          )}
        </View>
      );
    }

    if (isComplete === true) {
      const { questionLength, correct } = this.state;
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
            style={{ marginVertical: 20 }}
            btnText="Try Again"
            onPress={this.tryAgain}
          />
          <SubmitBtn btnText="Exit Quiz" onPress={this.exit} />
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
