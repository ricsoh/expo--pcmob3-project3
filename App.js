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
    navigation.navigate("Add Note");
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

const InnerStack = createStackNavigator();

function NotesStack() {
 return (
   <InnerStack.Navigator>
     <InnerStack.Screen
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
   </InnerStack.Navigator>
 );
}

function AddScreen({ navigation }) {
 return (
   <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
     <Text>This is the add screen</Text>
     <TouchableOpacity
       onPress={() => navigation.goBack()}
       style={{ padding: 10 }}
     >
       <Text style={{ color: "orange" }}>Dismiss</Text>
     </TouchableOpacity>
   </View>
 );
}

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator mode="modal" headerMode="none">
       <Stack.Screen
         name="Notes Stack"
         component={NotesStack}
         options={{ headerShown: false }}
       />
       <Stack.Screen name="Add Note" component={AddScreen} />
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



