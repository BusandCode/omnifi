// AIPayScreen.tsx — safe-area bottom padding now wraps the banner instead of the input bar
import { SecureSmartBanner } from "@/src/components/ai-pay/SecureSmartBanner";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AIPayHeader } from "../src/components/ai-pay/AIPayHeader";
import { ChatBubble, ChatMessage } from "../src/components/ai-pay/ChatBubble";
import { CommandInputBar } from "../src/components/ai-pay/CommandInputBar";
import { colors } from "../src/theme/colors";
import { clamp } from "../src/theme/scale";
import { ScaleProvider } from "../src/theme/ScaleContext";

const BODY_ITEM_KEYS = ["messages", "input"] as const;
type BodyItemKey = (typeof BODY_ITEM_KEYS)[number];

const MIN_GAP = 2;
const MAX_GAP = 8;
const BOTTOM_GAP = 4;

const MIN_FACTOR = 0.65;
const MAX_FACTOR = 1.15;

const CONVERGENCE_EPSILON = 0.02;

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
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [topHeight, setTopHeight] = useState(0);
  const [bodyContainerHeight, setBodyContainerHeight] = useState(0);
  const [itemHeights, setItemHeights] = useState<Record<BodyItemKey, number>>({
    messages: 0,
    input: 0,
  });
  const [factor, setFactor] = useState(1);
  const scrollRef = useRef<ScrollView>(null);

  const onTopLayout = useCallback((e: LayoutChangeEvent) => {
    setTopHeight(e.nativeEvent.layout.height);
  }, []);

  const onBodyContainerLayout = useCallback((e: LayoutChangeEvent) => {
    setBodyContainerHeight(e.nativeEvent.layout.height);
  }, []);

  const makeItemLayoutHandler = useCallback(
    (key: BodyItemKey) => (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      setItemHeights((prev) => (prev[key] === h ? prev : { ...prev, [key]: h }));
    },
    [],
  );

  useEffect(() => {
    const allMeasured =
      bodyContainerHeight > 0 &&
      topHeight > 0 &&
      BODY_ITEM_KEYS.every((k) => itemHeights[k] > 0);
    if (!allMeasured) return;

    const totalItemHeight = BODY_ITEM_KEYS.reduce(
      (sum, k) => sum + itemHeights[k],
      0,
    );

    const totalGaps = MIN_GAP * (BODY_ITEM_KEYS.length - 1);
    const availableForItems = bodyContainerHeight - BOTTOM_GAP - totalGaps;

    const idealFactor = factor * (availableForItems / totalItemHeight);
    const nextFactor = clamp(idealFactor, MIN_FACTOR, MAX_FACTOR);

    if (Math.abs(nextFactor - factor) > CONVERGENCE_EPSILON) {
      setFactor(nextFactor);
    }
  }, [bodyContainerHeight, topHeight, itemHeights]);

  const totalItemHeight = BODY_ITEM_KEYS.reduce(
    (sum, k) => sum + itemHeights[k],
    0,
  );

  let gap = MIN_GAP;
  if (bodyContainerHeight > 0) {
    const leftover = bodyContainerHeight - BOTTOM_GAP - totalItemHeight;
    if (leftover > 0) {
      const calculatedGap = leftover / (BODY_ITEM_KEYS.length - 1);
      gap = clamp(calculatedGap, MIN_GAP, MAX_GAP);
    }
  }

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
    <View style={styles.container}>
      <View
        style={{ paddingTop: insets.top + 4 }}
        onLayout={onTopLayout}
      >
        <AIPayHeader />
      </View>

      <ScaleProvider factor={factor}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0}
        >
          <View
            style={[
              styles.content,
              {
                rowGap: gap,
                paddingBottom: BOTTOM_GAP,
              },
            ]}
            onLayout={onBodyContainerLayout}
          >
            <View style={{ flex: 1 }} onLayout={makeItemLayoutHandler("messages")}>
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
            </View>

            <View onLayout={makeItemLayoutHandler("input")}>
              <CommandInputBar
                value={command}
                onChangeText={setCommand}
                onSend={handleSend}
                onPickImage={() => {}}
                onPickCamera={() => {}}
                onPickDocument={() => {}}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScaleProvider>

      <View style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
        <SecureSmartBanner />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messages: {
    paddingTop: 8,
    paddingBottom: 20,
    gap: 14,
  },
});