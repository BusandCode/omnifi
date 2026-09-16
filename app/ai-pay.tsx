import { SecureSmartBanner } from "@/src/components/ai-pay/SecureSmartBanner";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AIPayHeader } from "../src/components/ai-pay/AIPayHeader";
import { ChatBubble, ChatMessage } from "../src/components/ai-pay/ChatBubble";
import { CommandInputBar } from "../src/components/ai-pay/CommandInputBar";
import { useTheme } from "../src/theme/ThemeContext";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "example",
    sender: "ai",
    kind: "command",
    lead: "You can type commands like:",
    text: "Send 50000 to 7266828721 kuda bank",
    time: "09:41 AM",
  },
];

export default function AIPayScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    const text = command.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      kind: "plain",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setCommand("");

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: "ai",
        kind: "plain",
        text: "Got it — I'm working on that transaction now.",
      };
      setMessages((prev) => [...prev, aiMsg]);
      requestAnimationFrame(() =>
        scrollRef.current?.scrollToEnd({ animated: true }),
      );
    }, 500);

    requestAnimationFrame(() =>
      scrollRef.current?.scrollToEnd({ animated: true }),
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={{ paddingTop: insets.top + 4 }}>
        <AIPayHeader />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.content}>
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messages}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: false })
            }
          >
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
          </ScrollView>

          <CommandInputBar
            value={command}
            onChangeText={setCommand}
            onSend={handleSend}
            onPickImage={() => {}}
            onPickCamera={() => {}}
            onPickDocument={() => {}}
          />
        </View>
      </KeyboardAvoidingView>

      <View style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        <SecureSmartBanner />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 4,
  },
  messages: {
    paddingTop: 8,
    paddingBottom: 20,
    gap: 14,
  },
});