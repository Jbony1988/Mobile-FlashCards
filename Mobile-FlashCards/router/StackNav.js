import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import TabNav from "./TabNav";
import AddDeck from "../screens/AddDeck";
import QuizView from "../screens/QuizView";
import NewQuestionView from "../screens/NewQuestionView";
import { white, blue } from "../utils/colors";
import AddQuestion from '../screens/AddQuestion';
import DeckListView from "../screens/DeckListView";

const StackNav = createStackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: {
      header: null
    }
  },
  AddDeck: {
    screen: DeckListView,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    })
  },
  NewQuestionView: {
    screen: NewQuestionView,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    })
  },

  Quiz: {
    screen: QuizView,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    })
  },

  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue
      }
    })
  }
});

export default createAppContainer(StackNav);
