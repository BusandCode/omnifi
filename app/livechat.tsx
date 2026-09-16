import { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LiveChatHeader } from '../src/components/livechat/LiveChatHeader';
import { AgentCard } from '../src/components/livechat/AgentCard';
import { ChatMessageList } from '../src/components/livechat/ChatMessageList';
import { ChatResolvedBanner } from '../src/components/livechat/ChatResolvedBanner';
import { ChatInputBar } from '../src/components/livechat/ChatInputBar';
import { useTheme } from '../src/theme/ThemeContext';

export default function LiveChatScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: themeColors.background },
        fixedHeader: {
          paddingHorizontal: 20,
          paddingBottom: 12,
          backgroundColor: themeColors.background,
        },
        scroll: { flex: 1 },
        content: {
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: 20,
          gap: 16,
        },
        fixedFooter: {
          paddingHorizontal: 16,
          paddingTop: 8,
          backgroundColor: themeColors.background,
        },
      }),
    [themeColors]
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <LiveChatHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AgentCard />
        <ChatMessageList />
        <ChatResolvedBanner time="9:46 AM" />
      </ScrollView>

      <View style={[styles.fixedFooter, { paddingBottom: insets.bottom + 8 }]}>
        <ChatInputBar />
      </View>
    </KeyboardAvoidingView>
  );
}