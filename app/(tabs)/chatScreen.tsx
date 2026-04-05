import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { startChat } from "../../services/geminiService";

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
};


export default function ChatScreen() {
  const chatRef = useRef(startChat());
  const [messages, setMessages] = useState<Message[]>([
   {     
    id: "intro",
    role: "ai",
    text: "Hey! I'm Wall-E, your personal health assistant. How can I help you today? 🩺",
   }, 
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const result = await chatRef.current.sendMessage(userMessage);
      const reply = result.response.text();
      setMessages(prev => [...prev, { id: Date.now().toString() + "_ai", role: "ai", text: reply }]);
    } catch {
        setMessages(prev => [...prev, { id: Date.now().toString() + "_err", role: "ai", text: "Something went wrong. Try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Message List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        //onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.role === "user" ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Start a conversation with Gemini!</Text>
        }
      />

      {/* Typing indicator */}
      {loading && <ActivityIndicator style={styles.loader} />}

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          multiline
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!input.trim() || loading) && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!input.trim() || loading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },
  messageList: {
    padding: 16,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  userBubble: {
    backgroundColor: "#2563eb",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#1e1e1e",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 15,
    color: "#f0f0f0",
  },
  emptyText: {
    textAlign: "center",
    color: "#555",
    marginTop: 40,
    fontSize: 14,
  },
  loader: {
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#141414",
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#1a1a1a",
    marginRight: 10,
    color: "#f0f0f0",
  },
  sendButton: {
    backgroundColor: "#2563eb",
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sendButtonDisabled: {
    backgroundColor: "#1a3a7a",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});