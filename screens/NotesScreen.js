import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";

// Open database if exists else create
const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ route, navigation }) {

  const [notes, setNotes] = useState([
{/*    
    { title: "Feed the elephant", done: false, id: "0" },
    { title: "Feed the monkey", done: false, id: "1" },
    { title: "Do the laundry", done: false, id: "2" },
*/}
]);

// Helper function to access the database and refresh the screen
function refreshNotes() {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM notes",
      null,
      (txObj, { rows: { _array } }) => setNotes(_array),
      // alternative
      // (txObj, resultSet) => setNotes(resultSet.rows._array),
      (txObj, error) => alert("Error ", error)
//      (txObj, error) => console.log("Error ", error)
    );
  });
}

 // This is to set up the database on first run
 useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        done INT)
      `
    );
  },
  null,
  refreshNotes
  );
}, []);

  // This is to set up the top right button
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

  // Monitor route.params for changes, and notes
  useEffect(() => {
    if (route.params?.text) {
      db.transaction(
        (tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
          route.params.text,
        ]);
      },
      null,
      refreshNotes
      );
{/*
        const newNote = {
        title: route.params.text,
        done: false,
        id: notes.length.toString(),
      };
      setNotes([...notes, newNote]);
*/}
    }
  }, [route.params?.text]);

  function addNote() {
    navigation.navigate("Add Note");
  }

  function deleteNote(recItem) {
    db.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM notes WHERE id = ?", [recItem.id,]);
    },
    null,
    refreshNotes
    );
    alert(recItem.title + " Deleted!");
  }

  function renderItem({ item }) {
    return (
      <View
        style={styles.renderView}
      >
        <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
        <TouchableOpacity onPress={() => deleteNote(item)}>
          <MaterialCommunityIcons name="delete-forever-outline" size={38} color="red" />  
        </TouchableOpacity>
      </View>
      );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes}
        renderItem={renderItem}
//        keyExtractor={(item) => item.id.toString()} // To fix the warning
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  renderView: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
   