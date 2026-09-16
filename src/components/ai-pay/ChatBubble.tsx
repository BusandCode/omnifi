import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export type ChatMessage =
  | { id: string; sender: 'ai'; kind: 'intro'; title: string; text: string }
  | { id: string; sender: 'ai'; kind: 'command'; lead: string; text: string; time: string }
  | { id: string; sender: 'ai' | 'user'; kind: 'plain'; text: string };

export function ChatBubble({ message }: { message: ChatMessage }) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  rowReverse: { flexDirection: 'row-reverse' },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: themeColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColors.primaryTint,
  },
  bubble: { borderRadius: 16, padding: 8, maxWidth: '80%' },
  aiBubble: { backgroundColor: themeColors.surface, borderTopLeftRadius: 4 },
  userBubble: { backgroundColor: themeColors.primary, borderTopRightRadius: 4 },
  introTitle: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '700', marginBottom: 4 },
  aiText: { color: themeColors.textPrimary, fontSize: 10.5, lineHeight: 18 },
  userText: { color: '#fff', fontSize: 10.5, lineHeight: 18 },
  commandText: { color: themeColors.primaryLight, fontSize: 10.5, fontWeight: '700', marginTop: 6 },
  time: { color: themeColors.textSecondary, fontSize: 9.5, marginTop: 8 },
}),
    [themeColors]
  );

  const isUser = message.sender === 'user';

  return (
    <View style={[styles.row, isUser && styles.rowReverse]}>
      {!isUser && (
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="robot-outline" size={15} color={themeColors.primaryLight} />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        {message.kind === 'intro' && (
          <>
            <Text style={styles.introTitle}>{message.title}</Text>
            <Text style={styles.aiText}>{message.text}</Text>
          </>
        )}

        {message.kind === 'command' && (
          <>
            <Text style={styles.aiText}>{message.lead}</Text>
            <Text style={styles.commandText}>{message.text}</Text>
            <Text style={styles.time}>{message.time}</Text>
          </>
        )}

        {message.kind === 'plain' && (
          <Text style={isUser ? styles.userText : styles.aiText}>{message.text}</Text>
        )}
      </View>
    </View>
  );
}