import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";


export default function RequestScreen() {
  // Keep the user's answers for each question in state.
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
  });

  // Track whether the dropdown for question one is open.
  const [questionOneOpen, setQuestionOneOpen] = useState(false);
  const [questionTwoOpen, setQuestionTwoOpen] = useState(false);

  // The list of questions shown on the page.
  const questions = [
    "What is your healthcare provider?",
    "What services do you need?",
    "What is the distance your willing to travel (miles)?",
  ];

  // Options shown in the dropdown for question one.
  const question1Options = ["Anthem", "Kaiser Permanente", "Molina Healthcare"];

  const question2Options = ["Hospital", "Urgent Care", "Emergency Room", "Psychiatrist", "Dentalogist"];

  // Update the answers object for a given question key.
  const handleChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Submit the form and show a confirmation alert.
  const handleSubmit = () => {
    if (!answers.question1.trim()) { return alert("Please answer all questions before submitting."); }
    if (!answers.question2.trim()) { return alert("Please answer all questions before submitting."); }
    if (!answers.question3.trim() || isNaN(Number(answers.question3))) { return alert("Please answer all questions before submitting."); }
    alert("Thank you for your responses!");
      const data = {
        healthcareProvider: answers.question1,
        servicesNeeded: answers.question2,
        distanceWillingToTravel: Number(answers.question3),
    };

    const json = JSON.stringify(data, null, 2);
    console.log(json);

    // send the data to the backend
  };

  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Please Answer These Questions</Text>

      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>

          {index === 0 ? (
            // For the first question, render a dropdown selector.
            <>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setQuestionOneOpen(!questionOneOpen)}
              >
                <Text style={styles.dropdownText}>
                  {answers.question1 || "Select an option"}
                </Text>
              </TouchableOpacity>

              {questionOneOpen && (
                // Show the dropdown menu only when open.
                <View style={styles.dropdownMenu}>
                  {question1Options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => {
                        handleChange("question1", option);
                        setQuestionOneOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          ) : 
            index === 1 ? (
            // For the second question, render a dropdown selector.
            <>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setQuestionTwoOpen(!questionTwoOpen)}
              >
                <Text style={styles.dropdownText}>
                  {answers.question2 || "Select an option"}
                </Text>
              </TouchableOpacity>

              {questionTwoOpen && (
                // Show the dropdown menu only when open.
                <View style={styles.dropdownMenu}>
                  {question2Options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownItem}
                      onPress={() => {
                        handleChange("question2", option);
                        setQuestionTwoOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )
          
          
          : (
            // For other questions, render a normal text input.
            <TextInput
              style={styles.textInput}
              placeholder="Enter your answer here..."
              placeholderTextColor="#999"
              value={answers[`question${index + 1}` as keyof typeof answers]}
              onChangeText={(value) =>
                handleChange(`question${index + 1}`, value)
              }
              multiline
            />
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 14,
    color: "#111",
  },
  dropdownMenu: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dropdownItem: {
    padding: 14,
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#111",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
    minHeight: 50,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
