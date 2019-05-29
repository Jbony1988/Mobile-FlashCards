import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {timeToString } from '../utils/helpers';
import SubmitBtn from  '../components/Button';




class NewDeckView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }


  addDeck = () => {

  }



  render() {
    const {text } = this.state;
    console.log(text)
    return (
      <View>
        <TextInput 
        placeholder='Enter title of new deck'
        value={text}
        onChangeText={(text) =>  this.setState({text})} />
        <SubmitBtn onPress={() => alert('test')} />
      </View>
    );
  }
}

export default NewDeckView;
