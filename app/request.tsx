import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/constants/theme';


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
    "What is healthcare provider?",
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
    console.log("Submitted answers:", answers);
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

  
  // theme tokens (call hooks once)
  const accent1 = useThemeColor({}, 'accent1');
  const surface = useThemeColor({}, 'surface');
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const icon = useThemeColor({}, 'icon');

  return (
      <ThemedView style={{ flex: 1 }}>
        <ScrollView style={[styles.container]} contentContainerStyle={{ paddingBottom: 40 }}>
          <ThemedView style={styles.pageHeader} lightColor={Colors.light.surface} darkColor={'#5B21B6'}>
            <ThemedText type="title" style={styles.requestTitle}>Request Help</ThemedText>
            <ThemedText style={styles.requestSubtitle}>Answer a few questions so we can find care near you</ThemedText>
          </ThemedView>

          {questions.map((question, index) => {

            return (
              <ThemedView
                key={index}
                style={styles.questionContainer}
                lightColor={Colors.light.surface}
                darkColor={Colors.dark.surface}
              >
                <ThemedText type="defaultSemiBold" style={styles.question}>
                  {question}
                </ThemedText>

                {index === 0 ? (
                  <>
                    <TouchableOpacity
                      style={[styles.dropdown, { backgroundColor: surface, borderColor: icon }]}
                      onPress={() => setQuestionOneOpen(!questionOneOpen)}
                    >
                      <ThemedText style={[styles.dropdownText, { color: answers.question1 ? text : icon }]}>
                        {answers.question1 || "Select an option"}
                      </ThemedText>
                    </TouchableOpacity>

                    {questionOneOpen && (
                      <ThemedView style={[styles.dropdownMenu, { borderColor: icon }]} lightColor={Colors.light.surface} darkColor={Colors.dark.surface}>
                        {question1Options.map((option) => (
                          <TouchableOpacity
                            key={option}
                            style={styles.dropdownItem}
                            onPress={() => {
                              handleChange("question1", option);
                              setQuestionOneOpen(false);
                            }}
                          >
                            <ThemedText style={styles.dropdownItemText}>{option}</ThemedText>
                          </TouchableOpacity>
                        ))}
                      </ThemedView>
                    )}
                  </>
                ) : index === 1 ? (
                  <>
                    <TouchableOpacity
                      style={[styles.dropdown, { backgroundColor: surface, borderColor: icon }]}
                      onPress={() => setQuestionTwoOpen(!questionTwoOpen)}
                    >
                      <ThemedText style={[styles.dropdownText, { color: answers.question2 ? text : icon }]}>
                        {answers.question2 || "Select an option"}
                      </ThemedText>
                    </TouchableOpacity>

                    {questionTwoOpen && (
                      <ThemedView style={[styles.dropdownMenu, { borderColor: icon }]} lightColor={Colors.light.surface} darkColor={Colors.dark.surface}>
                        {question2Options.map((option) => (
                          <TouchableOpacity
                            key={option}
                            style={styles.dropdownItem}
                            onPress={() => {
                              handleChange("question2", option);
                              setQuestionTwoOpen(false);
                            }}
                          >
                            <ThemedText style={styles.dropdownItemText}>{option}</ThemedText>
                          </TouchableOpacity>
                        ))}
                      </ThemedView>
                    )}
                  </>
                ) : (
                  <TextInput
                    style={[styles.textInput, { backgroundColor: surface, color: text, borderColor: icon }]}
                    placeholder="Enter your answer here..."
                    placeholderTextColor={icon}
                    value={answers[`question${index + 1}` as keyof typeof answers]}
                    onChangeText={(value) => handleChange(`question${index + 1}`, value)}
                    multiline
                  />
                )}
              </ThemedView>
            );
          })}

          <TouchableOpacity style={[styles.button, { backgroundColor: accent1, shadowColor: accent1 }]} onPress={handleSubmit}>
            <ThemedText style={[styles.buttonText, { color: background }]}>Submit</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
    borderRadius: 16,
    padding: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  dropdownText: {
    fontSize: 14,
  },
  dropdownMenu: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 14,
  },
  dropdownItemText: {
    fontSize: 14,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 50,
    textAlignVertical: "top",
  },
  pageHeader: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    justifyContent: 'center',
  },
  requestTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  requestSubtitle: {
    marginTop: 6,
    fontSize: 14,
    opacity: 0.9,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
