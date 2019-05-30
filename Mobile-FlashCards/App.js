import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewDeckView from './screens/NewDeckView';
import StackNav from './router/StackNav';

export default class App extends React.Component {
  render() {
    return (
      // <View style={{flex:1, justifyContent: 'center'}} >
        <View style={{flex: 1}}>
          <StackNav/>
     {/* <NewDeckView/> */}
        </View>

      // </View>
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
