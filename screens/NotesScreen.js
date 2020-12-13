import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";

// Open database if exists else create
const db = SQLite.openDatabase("notes.db");
var doneTextColor = "black";
var doneTextThru = "none";

export default function NotesScreen({ route, navigation }) {

  const [notes, setNotes] = useState([]);
  const [notesDone, setNotesDone] = useState([]);

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
      // Display ascending order based on done = 0 items only
      "SELECT * FROM notes WHERE done = 0 ORDER BY done ASC",
      null,
      (txObj, { rows: { _array } }) => setNotes(_array),
      (txObj, error) => alert("Error ", error)
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      // Display ascending order based on done = 1 item only
      "SELECT * FROM notes WHERE done = 1 ORDER BY done ASC",
      null,
      (txObj, { rows: { _array } }) => setNotesDone(_array),
      (txObj, error) => alert("Error ", error)
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
    if (item.done == 1) {
      doneTextColor = "gray";
      doneTextThru = "line-through";
    }else {
      doneTextColor = "black";
      doneTextThru = "none";
    }
    return (
      <TouchableOpacity onPress={() => EditNote(item)}>
        <View style={styles.renderView}>
          <Text style={{
            textAlign: "left",
            fontSize: 16,
            width: "80%",
            marginRight: 20,
            color: doneTextColor,
            textDecorationLine: doneTextThru,
            }}
            >{item.title}</Text>
            <MaterialIcons name= "arrow-forward-ios" size= {24} color= "gray" />
        </View>
      </TouchableOpacity>
      );
  }
  
  return (
    <View style={styles.container}>
      <View style={{ height: "50%" }}>
        <Text style={styles.textList}>To Do List</Text>
        <FlatList
          style={{ width: "100%" }}
          data={notes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()  // To fix the warning
          }
        />
      </View>
      <View style={{ height: "50%" }}>
        <Text style={styles.textList}>Done List</Text>
        <FlatList
          style={{ width: "100%" }}
          data={notesDone}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()  // To fix the warning
          }
        />
      </View>
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
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: "#B2BABB",
//    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textList: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: 'center',
    textDecorationLine: "underline",
    paddingTop: 15,
    paddingBottom: 15,
  }
});
   