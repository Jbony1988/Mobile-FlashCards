import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewDeckView from './screens/NewDeckView';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/";
import middleware from './middleware'
import StackNav from './router/StackNav';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
       <View style={{flex: 1}}>
          <StackNav/>
        </View>

      </Provider>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
  },
});
