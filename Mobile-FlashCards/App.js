import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import NewDeckView from './screens/NewDeckView';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/";
import middleware from './middleware'
import StackNav from './router/StackNav';
import { Constants} from 'expo'
import {setLocalNotification } from './utils/helpers'

function UdaciStausBar ({backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

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
