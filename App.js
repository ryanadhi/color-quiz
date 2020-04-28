import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Constants from "expo-constants";

const colorList = ["#ff0000", "#1100ff", "#00ff00"];

export default function App() {
  const [question, setQuestion] = useState(getQuestion());
  const [wrongAnswer, setWrongAnswer] = useState(getWrongAnswer(question));
  const [correctAnswer, setCorrectAnswer] = useState(getCorrectAnswer());
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setWrongAnswer(getWrongAnswer(question));
    setCorrectAnswer(getCorrectAnswer());
  }, [refresh]);

  function onPress(answer) {
    if (answer === correctAnswer) {
      Alert.alert("Correct");
      setQuestion(getQuestion());
      setRefresh(!refresh);
    } else {
      Alert.alert("Wrong");
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
        style={{ flex: 1, width: "100%", backgroundColor: colorList[question] }}
      ></View>
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
            borderWidth: 1,
            borderRadius: 50,
            width: 100,
            height: 150,
            marginLeft: 20,
            marginRight: 20,
          }}
          onPress={() => onPress(0)}
        >
          <Text>My button</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              correctAnswer === 1
                ? colorList[question]
                : colorList[wrongAnswer],
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 50,
            width: 100,
            height: 150,
            marginLeft: 20,
            marginRight: 20,
          }}
          onPress={() => onPress(1)}
        >
          <Text>My button</Text>
        </TouchableOpacity>
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
  // questionContainer: {
  //   flex: 1,
  //   width: "100%",
  //   backgroundColor: colorList[question],
  // },
  optionsContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // optionOne: {
  //   backgroundColor:
  //     correctAnswer === 0 ? colorList[question] : colorList[wrongAnswer],
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderWidth: 1,
  //   borderRadius: 50,
  //   width: 100,
  //   height: 150,
  //   marginLeft: 20,
  //   marginRight: 20,
  // },
  // optionTwo: {
  //   backgroundColor:
  //     correctAnswer === 1 ? colorList[question] : colorList[wrongAnswer],
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderWidth: 1,
  //   borderRadius: 50,
  //   width: 100,
  //   height: 150,
  //   marginLeft: 20,
  //   marginRight: 20,
  // },
});
