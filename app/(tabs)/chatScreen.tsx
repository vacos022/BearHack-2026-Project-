import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { startChat } from "../../services/geminiService";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/constants/theme';

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
};


export default function ChatScreen() {
  const chatRef = useRef(startChat());
  // theme tokens
  const accent1 = useThemeColor({}, 'accent1');
  const surface = useThemeColor({}, 'surface');
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const icon = useThemeColor({}, 'icon');
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
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.container, { flex: 1 }]}
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
                item.role === "user"
                  ? [styles.userBubble, { backgroundColor: accent1 }]
                  : [styles.aiBubble, { backgroundColor: surface }],
              ]}
            >
              <ThemedText style={[styles.bubbleText, item.role === 'user' && { color: background }]}>{item.text}</ThemedText>
            </View>
          )}
          ListEmptyComponent={
            <ThemedText style={styles.emptyText}>Start a conversation with Wall‑E!</ThemedText>
          }
        />

        {/* Typing indicator */}
        {loading && <ActivityIndicator style={styles.loader} color={accent1} />}

        {/* Input Row */}
        <View style={[styles.inputRow, { backgroundColor: surface, borderTopColor: icon }]}> 
          <TextInput
            style={[styles.input, { backgroundColor: surface, borderColor: icon, color: text }]}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor={icon}
            multiline
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[styles.sendButton, (!input.trim() || loading) && styles.sendButtonDisabled, { backgroundColor: accent1 }]}
            onPress={sendMessage}
            disabled={!input.trim() || loading}
          >
            <ThemedText style={[styles.sendButtonText, { color: background }]}>Send</ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
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