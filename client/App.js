import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home  from './src/screens/Home/Home';
import AppLoading from "expo-app-loading";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from "expo-font";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  const fetchFonts = async() => {
    console.log('fetching fonts');
    await Font.loadAsync({
      "roboto": require("./src/assets/fonts/Roboto-Regular.ttf"),
      "roboto-bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
      
    });
    
  };
   if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={()=>fetchFonts()}
        onFinish={() => {
          console.log("fonts are loaded");
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
            
        }}
          >
            <Stack.Screen name="Home" component={Home} />        
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}

