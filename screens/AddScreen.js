import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

export default function AddScreen({ navigation }) {
  
  const [text, setText] = useState("");

  return (
    <View style={{ paddingTop: 23, flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Add your todo</Text>
      <TextInput
        placeholder="what do you need to do?"
        style={styles.textInput}
        value={text}
        onChangeText={(newText) => setText(newText)}
      ></TextInput>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notes", { text })}
          //onPress={() => navigation.goBack()}
          style={[styles.button, styles.submitButton]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 40, color: "grey" }}>
        This is what you typed:
      </Text>
      <Text style={{ color: "#333", marginTop: 10 }}>{text}</Text>
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
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    width: 100,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: "orange",
  },
  cancelButton: {
    backgroundColor: "red",
  },
});
