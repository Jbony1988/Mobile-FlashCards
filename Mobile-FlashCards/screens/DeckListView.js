import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { connect} from 'react-redux'
import {getDecks } from '../utils/api'
import Deck from '../components/decks';
import { receiveDecks } from "../actions";
import {blue, purple, lightBlue} from '../utils/colors'

class DeckListView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks().then(decks => dispatch(receiveDecks(decks)));
  }

  render() {

    const decks = this.props.decks || {};
    console.log('this is the decks', decks)
    if (Object.keys(decks).length === 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.titleText}>  You have not created any decks, yet!</Text>
          <View style={styles.cardDash}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("AddDeck")
          }
          style={styles.availableDecks}
        >
         <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>Click here to start</Text>
        </TouchableOpacity>
      </View>
        </View>
      );
    }
    else 
    return (
      <ScrollView>
          <View style={styles.cardContainer}>
            <Text style={styles.titleText}>
              Select a deck to start studying
            </Text>

            {Object.keys(decks).map(deck => {
              const currDeck = decks[deck];
              const questions = currDeck.questions;
              const questionLength = questions ? currDeck.questions.length : 0;

              return (
                <Deck
                  key={currDeck.id}
                  title={currDeck.title}
                  questions={questions}
                  questionLength={questionLength}
                  deck={currDeck}
                  {...this.props}
                />
              );
            })}
          </View>
        </ScrollView>
    )
    
  }
}




const styles = StyleSheet.create({
  center: {
    textAlign: "center"
  },
  add: {
    width: 250,
    height: 150,
    backgroundColor: blue,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10
  },
  container: {
    flex: 1,
    alignSelf: "center"
  },
  titleText: {
    fontSize: 28,
    width: 375,
    // flexGrow: 1,
    marginBottom: 50,
    marginTop: 100,
    textAlign: "center",
    color: purple,
  },
  cardContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center"
  },
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
})


const mapStateToProps = state => {
  console.log(state)

  return {
    decks: state
  }

}

export default connect(mapStateToProps)(DeckListView);
