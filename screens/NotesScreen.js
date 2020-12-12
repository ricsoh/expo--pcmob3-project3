import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

// Open database if exists else create
const db = SQLite.openDatabase("notes.db");
var doneTextColor = "black";
var doneTextThru = "none";

export default function NotesScreen({ route, navigation }) {

  const [notes, setNotes] = useState([]);

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

// Helper function to access the database and refresh the screen
function refreshNotes() {
  db.transaction((tx) => {
    tx.executeSql(
      // Display descending order based on done item
      "SELECT * FROM notes ORDER BY done DESC",
      null,
      (txObj, { rows: { _array } }) => setNotes(_array),
      // alternative
      // (txObj, resultSet) => setNotes(resultSet.rows._array),
      (txObj, error) => alert("Error ", error)
//      (txObj, error) => console.log("Error ", error)
    );
  });
}

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
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [route.params.text,]);
      },
      null,
      refreshNotes
      );
    }
  }, [route.params?.text]);

  // Monitor route.params.action for changes
  useEffect(() => {
    if (route.params?.action) {
      refreshNotes();
    }
  }, [route.params?.action]);

  function addNote() {
    navigation.navigate("Add Note");
  }
  
  function EditNote(recItem) {
    navigation.navigate("Edit Note", { ...recItem, });
  }

  function renderItem({ item }) {
    if (item.done == "done") {
      doneTextColor = "gray";
      doneTextThru = "line-through";
    }else {
      doneTextColor = "black";
      doneTextThru = "none";
    }
    return (
      <View style={styles.renderView}>
        <Text style={{ textAlign: "left", fontSize: 16, color: doneTextColor, textDecorationLine: doneTextThru, marginRight: 180 }}>{item.title}</Text>
        <TouchableOpacity onPress={() => EditNote(item)}>
          <Ionicons name= "ios-create-outline" size= {38} color= "green" />
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
        keyExtractor={item => item.id.toString()} // To fix the warning
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
   