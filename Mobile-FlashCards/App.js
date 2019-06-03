import React from "react";
import { View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/";
import middleware from "./middleware";
import StackNav from "./router/StackNav";
import { setLocalNotification } from "./utils/helpers";

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1 }}>
          <StackNav />
        </View>
      </Provider>
    );
  }
}
