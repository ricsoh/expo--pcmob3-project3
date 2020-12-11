import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";

// Open database if exists else create
const db = SQLite.openDatabase("notes.db");
var actionText = "TRUE";
var doneText = "";

export default function EditScreen({ route, navigation }) {
  
  const [text, setText] = useState(route.params.title);
  
  function deleteItem(recItem) {

    if (actionText == "TRUE") {
      actionText = "FALSE";
    }else{actionText = "TRUE"}

    db.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM notes WHERE id = ?", [recItem,]);
    },
    );
    alert("Deleted!");
    navigation.navigate("Notes", { action: actionText });
  }
  
  function editItem(recItem) {

    if (actionText == "TRUE") {
      actionText = "FALSE";
    }else{actionText = "TRUE"}

    db.transaction(
      (tx) => {
        tx.executeSql("UPDATE notes SET title = ? WHERE id = ?", [text, recItem,]);
    },
    );
    alert("Edited!");
    navigation.navigate("Notes", { action: actionText });
  }
  
  function doneItem(recItem) {
    
    if (actionText == "TRUE") {
      actionText = "FALSE";
    }else{actionText = "TRUE"}

    // Toggle between done and undone when done pressed
    if (route.params.done == "done") {
      doneText = "un-do";
    }else {
      doneText = "done";
    }

    db.transaction(
      (tx) => {
        tx.executeSql("UPDATE notes SET done = ? WHERE id = ?", [ doneText, recItem,]);
    },
    );
    alert(doneText + "!");
    navigation.navigate("Notes", { action: actionText });
  }

  return (
    <View style={{ paddingTop: 23, flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Edit your todo</Text>
      <TextInput
        placeholder= {text}
        style={styles.textInput}
        value={text}
        onChangeText={(newText) => setText(newText)}
      ></TextInput>
      <View style={styles.buttons}>
        
        <TouchableOpacity
          onPress={() => editItem(route.params.id)}
          style={[styles.button, styles.editButton]}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => doneItem(route.params.id)}
          style={[styles.button, styles.doneButton]}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteItem(route.params.id)}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 24,
  },
  textInput: {
    margin: 20,
    borderWidth: 1,
    width: "85%",
    padding: 10,
    borderColor: "#ccc",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    width: 80,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: "orange",
  },
  doneButton: {
    backgroundColor: "blue",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  cancelButton: {
    backgroundColor: "green",
  },
});
