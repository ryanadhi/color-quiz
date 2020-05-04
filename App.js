import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Constants from "expo-constants";
import { Audio } from "expo-av";

const colorList = [
  "#ff0000",
  "#1100ff",
  "#00ff00",
  "#8800ff",
  "#ffea00",
  "#fc8ab9",
  "#000000",
  "#FFA500",
];

export default function App() {
  const [question, setQuestion] = useState(getQuestion());
  const [wrongAnswer, setWrongAnswer] = useState(getWrongAnswer(question));
  const [correctAnswer, setCorrectAnswer] = useState(getCorrectAnswer());
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setWrongAnswer(getWrongAnswer(question));
    setCorrectAnswer(getCorrectAnswer());
  }, [refresh]);

  async function onPress(answer) {
    if (answer === correctAnswer) {
      // Alert.alert("Correct");
      const correctSound = new Audio.Sound();
      try {
        await correctSound.loadAsync(require("./assets/correct.wav"));
        await correctSound.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
      setQuestion(getQuestion());
      setRefresh(!refresh);
    } else {
      // Alert.alert("Wrong");
      const wrongSound = new Audio.Sound();
      try {
        await wrongSound.loadAsync(require("./assets/wrong.wav"));
        await wrongSound.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    }
  }

  function getQuestion() {
    return Math.floor(Math.random() * colorList.length);
  }

  function getCorrectAnswer() {
    return Math.round(Math.random());
  }
  function getWrongAnswer(n) {
    let m = Math.floor(Math.random() * colorList.length);
    if (n === m) {
      if (n === 0) {
        return n + 1;
      } else {
        return n - 1;
      }
    } else {
      return m;
    }
  }
  return (
    <View style={styles.container}>
      <View
        style={{ flex: 2, width: "100%", backgroundColor: colorList[question] }}
      ></View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Which one has the same color as above?
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={{
            backgroundColor:
              correctAnswer === 0
                ? colorList[question]
                : colorList[wrongAnswer],
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            width: 100,
            height: 150,
            marginLeft: 20,
            marginRight: 20,
          }}
          onPress={() => onPress(0)}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              correctAnswer === 1
                ? colorList[question]
                : colorList[wrongAnswer],
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            width: 100,
            height: 150,
            marginLeft: 20,
            marginRight: 20,
          }}
          onPress={() => onPress(1)}
        ></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
