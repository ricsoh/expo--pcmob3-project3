import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

// Open database if exists else create
const db = SQLite.openDatabase("notes.db");

function NotesScreen({ navigation }) {

  const [notes, setNotes] = useState([
    { title: "Walk the cat", done: false, id: "0" },
    { title: "Feed the elephant", done: false, id: "1" },
  ]);
 
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name= "ios-create-outline"
            size= {40}
            color= "black"
            style= {{
              color: "black",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
   });

   function addNote() {
    let newNote = {
      title: "Sample new note",
      done: false,
      id: notes.length.toString(),
    };
    setNotes([...notes,]);
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
      </View>
    );
  }

 return (
  <View style={styles.container}>
     <FlatList
       style={{ width: "100%" }}
       data={notes}
       renderItem={renderItem}
     />
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
           headerTitleAlign: "center",
           headerTitleStyle: {
             fontWeight: "bold",
             fontSize: 24,
           },
           headerStyle: {
             height: 120,
             backgroundColor: "gray",
             borderBottomColor: "#ccc",
             borderBottomWidth: 1,
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



