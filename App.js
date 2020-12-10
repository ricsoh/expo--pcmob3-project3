import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

function NotesScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={addNote}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "black",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
   });

 return (
  <View style={styles.container}>
    <Text>Home Screen</Text>
  </View>
 );
}

function addNote() {
  alert("Icon Pressed");
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
 button: {
  width: 56,
  padding: 8,
  borderRadius: 10,
  marginRight: 15,
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});



