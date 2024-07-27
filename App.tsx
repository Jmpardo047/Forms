import React from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import { styles } from './app.theme';
import { MyForm } from './MyForm';





function App(){

  return (
    <View style={styles.background}>
      <StatusBar
        barStyle={'light-content' }
        backgroundColor={'black'}
      />
      <MyForm></MyForm>
    </View>
  );
}



export default App;
