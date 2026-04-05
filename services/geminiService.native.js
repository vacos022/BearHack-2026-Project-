// Native shim for Gemini service — avoids importing Node-only SDK in the app bundle.
// Behavior:
// - If `EXPO_PUBLIC_GEMINI_ENDPOINT` is set, `sendMessage` will POST to that endpoint
//   and return the `reply` field from the JSON response.
// - Otherwise this file provides a small local stub response so the chat UI works
//   without a backend during development.

const ENDPOINT = typeof process !== "undefined" ? process.env.EXPO_PUBLIC_GEMINI_ENDPOINT : undefined;

export const startChat = () => {
  if (ENDPOINT) {
    return {
      sendMessage: async (message) => {
        try {
          const res = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: message }),
          });
          const json = await res.json();
          const text = json?.reply ?? json?.response ?? "(no reply)";
          return { response: { text: () => text } };
        } catch (err) {
          return { response: { text: () => "Error contacting AI service." } };
        }
      },
    };
  }

  // Fallback stub for local/dev builds (no server).
  return {
    sendMessage: async (message) => {
      // Basic canned behavior for a slightly friendlier demo experience.
      const lower = (message || "").toLowerCase();
      let reply = "Sorry, the AI assistant is not available in this build.";
      if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
        reply = "Hi — I'm Wall-E (demo). I can help explain coverage and find next steps.";
      } else if (lower.includes("insurance") || lower.includes("coverage")) {
        reply = "Tell me which question you have about coverage and I'll try to help (demo).";
      } else if (lower.includes("nearby") || lower.includes("hospital") || lower.includes("doctor")) {
        reply = "To find nearby providers, please allow location access and provide your insurance plan in the app settings (demo).";
      } else {
        reply = `Demo response: I received your message — \"${message}\"`;
      }

      return { response: { text: () => reply } };
    },
  };
};

export default startChat;
