import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SubmitBtn from "../components/Button";
import { blue, white, darkBlue } from "../utils/colors";
import { connect } from "react-redux";
// import { clearLocalNotifications, setLocalNotification } from "../utils/api";

class NewQuestionView extends Component {
  state = {
    canStart: ""
  };

  startQuiz = () => {
    const { stateDeck, stateQuestionLength } = this.props;
    if (stateQuestionLength === 0) {
      this.setState({ canStart: false });
    } else {
      this.setState({ canStart: true });
      this.props.navigation.navigate("Quiz", { stateDeck });
      clearLocalNotifications().then(setLocalNotification);
    }
  };
  render() {
    const { stateDeck, stateQuestionLength } = this.props;
    const { canStart } = this.state;
    if (stateDeck) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{stateDeck.title}</Text>
          <Text style={styles.subTitle}>
            {stateQuestionLength} {stateQuestionLength === 1 ? "Card" : "Cards"}
          </Text>

          <SubmitBtn
          style={{marginVertical: 10}}
          btnText='Add question'
            onPress={() =>
              this.props.navigation.navigate("AddQuestion", {
                stateDeck,
                stateQuestionLength
              })
            }
            
          />
     
          <SubmitBtn 
          btnText='Start Quiz'
          onPress={this.startQuiz}/>
          {/* <Buttons onPress={this.startQuiz}>Start Quiz/></Buttons> */}

          <Text style={styles.error}>
            {canStart === false
              ? "Cannot start quiz. Please add questions first"
              : ""}
          </Text>
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
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 42,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center"
  },
  subTitle: {
    fontSize: 20
  },
  error: {
    color: "red"
  }
});

function mapStateToProps(state, { navigation }) {
  const { deck, questionLength } = navigation.state.params;
  const stateDeck = state[deck.id];
  const questions = stateDeck.questions;
  const stateQuestionLength = questions ? stateDeck.questions.length : 0;
  return {
    stateDeck,
    stateQuestionLength
  };
}
export default connect(mapStateToProps)(NewQuestionView);
