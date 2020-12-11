import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotesScreen({ route, navigation }) {

  const [notes, setNotes] = useState([
    { title: "Feed the elephant", done: false, id: "0" },
    { title: "Feed the monkey", done: false, id: "1" },
    { title: "Do the laundry", done: false, id: "2" },
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

  // Monitor route.params for changes
  useEffect(() => {
    if (route.params?.text) {
{/*
      db.transaction((tx) => {
        tx.executeSql("INSERT INTO notes (done, value) VALUES (0, ?)", [
          route.params.text,
        ]);
      });
*/} 
      const newNote = {
        title: route.params.text,
        done: false,
        id: notes.length.toString(),
      };
      setNotes([...notes, newNote]);
    }
  }, [route.params?.text]);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
});
   