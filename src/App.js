import React from 'react';
import {Text, View} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import AppStore from './redux/AppStore';

const App = () => {
  return (
    <Provider store={AppStore}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
