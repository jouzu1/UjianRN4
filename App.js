import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './Store'
import Home from './Home';
import Registrasi from './Registrasi';
import Login from './Login'
import MainMenu from './MainMenu';
import Laporan from './Laporan';
import History from './History';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          {/* <Stack.Screen name="Home" component={Home} options={{ headerShown:false }}/> */}
          {/* <Stack.Screen name="Registrasi" component={Registrasi}/> */}
          {/* <Stack.Screen name="Login" component={Login}/> */}
          <Stack.Screen name="MainMenu" component={MainMenu} options={{ headerShown:false }}/>
          <Stack.Screen name="Laporan" component={Laporan} options={{ headerShown:false }}/>
          <Stack.Screen name="History" component={History}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
