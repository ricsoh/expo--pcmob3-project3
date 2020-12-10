import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";

function NotesScreen({ navigation }) {
 return <View style={styles.container}></View>;
}

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
         name="Notes"
         component={NotesScreen}
         options={{
           headerTitle: "Notes, Todo App",
           headerTitleStyle: {
             fontWeight: "bold",
             fontSize: 30,
           },
           headerStyle: {
             height: 120,
             backgroundColor: "gray",
             borderBottomColor: "#ccc",
             borderBottomWidth: 1,
           },
           headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
           },
         }}
       />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "lightgray",
   alignItems: "center",
   justifyContent: "center",
 },
});



